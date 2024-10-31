import {
  setCurrentSegment,
  setRemainingTime,
  setSegmentTime,
} from "@/state/reducers/timer";
import { useAppSelector } from "@/state/redux-hooks";
import { useAppDispatch } from "@/state/redux-hooks";
import { useEffect } from "react";

const TimerBar = () => {
  const {
    currentSegment,
    segments,
    remainingTime,
    segmentTime,
    timerStatus,
    totalTime,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timerStatus === "pause") return;

    if (timerStatus === "running") {
      const timer = setInterval(() => {
        // Handle remaining time
        if (remainingTime <= 0) {
          clearInterval(timer);
          dispatch(setRemainingTime(0));
        } else {
          dispatch(setRemainingTime(remainingTime - 1));
        }

        // Handle segment time
        if (segmentTime <= 1) {
          const nextSegment = (currentSegment - 1) % segments.length;
          dispatch(setCurrentSegment(nextSegment));
          dispatch(setSegmentTime(segments[nextSegment].duration));
        } else {
          dispatch(setSegmentTime(segmentTime - 1));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    timerStatus,
    currentSegment,
    dispatch,
    remainingTime,
    segmentTime,
    segments,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSegmentHeight = (segmentTime: number) => {
    return (segmentTime / totalTime) * 100;
  };

  const getRemainingHeight = (segmentIndex: number) => {
    if (segmentIndex > currentSegment) {
      return 0;
    } else if (segmentIndex < currentSegment) {
      return 100;
    } else {
      console.log(
        "remaining height",
        segmentTime,
        segments[currentSegment].duration
      );
      console.log("currentSegment ", currentSegment);
      return (segmentTime / segments[currentSegment].duration) * 100;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getArrowPosition = () => {
    const progress = 1 - remainingTime / totalTime;
    return `${progress * 100}%`;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <div className="relative flex items-center">
          <div className="w-12 h-96 bg-gray-200 rounded-lg overflow-hidden relative">
            {segments.map((segment, index) => (
              <div
                key={index}
                id={`index-${index}`}
                className={`absolute left-0 right-0 ${
                  segment.color
                } flex items-center justify-center z-10  ${
                  index !== 0 ? "border-b" : ""
                }  border-slate-900`}
                style={{
                  height: `${getSegmentHeight(segment.duration)}%`,
                  bottom: `${segments
                    .slice(0, index)
                    .reduce(
                      (acc, seg) => acc + getSegmentHeight(seg.duration),
                      0
                    )}%`,
                }}
              >
                <span className="text-xs font-semibold text-white z-30">
                  {segment.label}
                </span>
                <div
                  className="absolute top-0 left-0 right-0 bg-gray-400 transition-all duration-1000 "
                  style={{ height: `${100 - getRemainingHeight(index)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="w-2 h-96 relative">
            <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-300" />
            <div
              className="absolute left-0 w-full h-16 flex items-center justify-start transition-all duration-1000"
              style={{ top: getArrowPosition(), transform: "translateY(-50%)" }}
            >
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[16px] border-r-red-500" />
            </div>
          </div>
        </div>
        <div className="mt-4 text-2xl font-semibold">
          {formatTime(segmentTime)}
        </div>
      </div>
    </div>
  );
};

export default TimerBar;
