/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { RootState } from "../store";

const createTimerThunk = (
  action: (dispatch: AppDispatch, getState: () => RootState) => void
) => {
  return () => (dispatch: AppDispatch, getState: () => RootState) => {
    action(dispatch, getState);
  };
};
export type initialStateType = typeof initialState;
const initialSegments: segments = [
  { duration: 600, color: "bg-blue-500", label: "10 min" },
  { duration: 180, color: "bg-gray-800", label: "3 min" },
  { duration: 600, color: "bg-blue-500", label: "10 min" },
  { duration: 180, color: "bg-gray-800", label: "3 min" },
  { duration: 600, color: "bg-blue-500", label: "10 min" },
  { duration: 180, color: "bg-gray-800", label: "3 min" },
];

const initialTotalTime = initialSegments.reduce(
  (acc: number, segment: segment) => acc + segment.duration,
  0
);

const initialCurrentSegment = initialSegments.length - 1;

const initialSegmentTime = initialSegments[initialSegments.length - 1].duration;
// eslint-disable-next-line no-shadow
type segment = { duration: number; color: string; label: string };
type segments = segment[];
export const initialState = {
  segments: initialSegments,
  totalTime: initialTotalTime,
  remainingTime: initialTotalTime,
  timerStatus: "pause",
  currentSegment: initialCurrentSegment,
  segmentTime: initialSegmentTime,
};
const TimerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setRemainingTime: (state, action) => {
      console.log("rmainingTime payloyad", action.payload);
      state.remainingTime = action.payload;
    },
    setTimerStatus: (state, action) => {
      console.log("timerStatus payloyad", action.payload);
      state.timerStatus = action.payload;
    },
    setCurrentSegment: (state, action) => {
      console.log("currentSegment payloyad", action.payload);
      state.currentSegment = action.payload;
    },
    setSegmentTime: (state, action) => {
      console.log("segmentTime payloyad", action.payload);
      state.segmentTime = action.payload;
    },

    ResetTimer: () => initialState,
  },
});

export const {
  setRemainingTime,
  setTimerStatus,
  setCurrentSegment,
  setSegmentTime,
  ResetTimer,
} = TimerSlice.actions;

export const startTimer = createTimerThunk((dispatch) => {
  dispatch(setTimerStatus("running"));
});

export const pauseTimer = createTimerThunk((dispatch) => {
  console.log("pauseTimer");
  dispatch(setTimerStatus("pause"));
});

export const resetCurrentTimer = createTimerThunk((dispatch, getState) => {
  const state = getState();
  const currentSegment = state.timer.currentSegment;
  dispatch(setTimerStatus("pause"));

  const timeMap = {
    0: 10 * 60,
    1: 13 * 60,
    2: 23 * 60,
    3: 26 * 60,
    4: 36 * 60,
    5: state.timer.totalTime,
  };

  const newTime = timeMap[currentSegment as keyof typeof timeMap];
  if (newTime !== undefined) {
    dispatch(setRemainingTime(newTime));
  }
});

export const resetTotalTimer = createTimerThunk((dispatch, getState) => {
  const state = getState();
  const segmentsLength = state.timer.segments.length;
  dispatch(setCurrentSegment(segmentsLength - 1));
  dispatch(setSegmentTime(state.timer.segments[segmentsLength - 1].duration));
  dispatch(setRemainingTime(state.timer.totalTime));
  dispatch(setTimerStatus("pause"));
});

export const previousTimer = createTimerThunk((dispatch, getState) => {
  const state = getState();
  if (state.timer.currentSegment === 5) return;

  const newSegment = state.timer.currentSegment + 1;
  dispatch(setCurrentSegment(newSegment));
  dispatch(setSegmentTime(state.timer.segments[newSegment].duration));
  dispatch(resetCurrentTimer()); // This will call the thunk
  dispatch(setTimerStatus("pause"));
});

export const nextTimer = createTimerThunk((dispatch, getState) => {
  const state = getState();
  if (state.timer.currentSegment === 0) return;

  const newSegment = state.timer.currentSegment - 1;
  dispatch(setCurrentSegment(newSegment));
  dispatch(setSegmentTime(state.timer.segments[newSegment].duration));
  dispatch(resetCurrentTimer()); // This will call the thunk
  dispatch(setTimerStatus("pause"));
});

export default TimerSlice.reducer;
