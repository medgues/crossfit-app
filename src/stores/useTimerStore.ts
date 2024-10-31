// import { create } from "zustand";

// type segment = { duration: number; color: string; label: string };
// type segments = segment[];
// type state = {
//   segments: segments;
//   totalTime: number;
//   remainingTime: number;
//   setRemainingTime: (
//     newRemainingTime: number | ((prevTime: number) => number)
//   ) => void;
//   timerStatus: string;
//   setTimerStatus: (newTimerStatus: string) => void;
//   currentSegment: number;
//   setCurrentSegment: (newCUrrentSegment: number) => void;
//   segmentTime: number;
//   setSegmentTime: (
//     newSegmentTime: number | ((prevTime: number) => number)
//   ) => void;
// };

// export const useTimerStore = create<state>((set) => {
//   const initialSegments: segments = [
//     { duration: 600, color: "bg-blue-500", label: "10 min" },
//     { duration: 180, color: "bg-gray-800", label: "3 min" },
//     { duration: 600, color: "bg-blue-500", label: "10 min" },
//     { duration: 180, color: "bg-gray-800", label: "3 min" },
//     { duration: 600, color: "bg-blue-500", label: "10 min" },
//     { duration: 180, color: "bg-gray-800", label: "3 min" },
//   ];

//   const initialTotalTime = initialSegments.reduce(
//     (acc: number, segment: segment) => acc + segment.duration,
//     0
//   );

//   return {
//     segments: initialSegments,
//     totalTime: initialTotalTime,
//     remainingTime: initialTotalTime,
//     timerStatus: "pause",
//     currentSegment: initialSegments.length - 1,
//     segmentTime: initialSegments[initialSegments.length - 1].duration,

//     setTotalTime: (newTotalTime: number) => set({ totalTime: newTotalTime }),
//     setRemainingTime: (newRemainingTime) =>
//       set((state) => ({
//         remainingTime:
//           typeof newRemainingTime === "function"
//             ? newRemainingTime(state.remainingTime)
//             : newRemainingTime,
//       })),
//     setTimerStatus: (newTimerStatus) => {
//       console.log("New Timer Status:", newTimerStatus);
//       set((state) => ({ ...state, timerStatus: newTimerStatus }));
//     },
//     setCurrentSegment: (newCurrentSegment) =>
//       set({ currentSegment: newCurrentSegment }),
//     setSegmentTime: (newSegmentTime) =>
//       set((state) => ({
//         segmentTime:
//           typeof newSegmentTime === "function"
//             ? newSegmentTime(state.segmentTime)
//             : newSegmentTime,
//       })),
//   };
// });
