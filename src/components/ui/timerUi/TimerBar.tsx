import { useTimerStore } from "@/stores/useTimerStore";
import { useEffect } from "react";

const TimerBar = ({ state }) => {
  //   const {
  //     totalTime,
  //     segments,
  //     remainingTime,
  //     currentSegment,
  //     segmentTime,
  //     setRemainingTime,
  //     setSegmentTime,
  //     setCurrentSegment,
  //     setTimerStatus
  //   } = useTimerStore();

  const getSegmentHeight = (segmentTime: number) => {
    return (segmentTime / state?.totalTime) * 100;
  };

  const getRemainingHeight = (segmentIndex: number) => {
    if (segmentIndex > state?.currentSegment) {
      return 0;
    } else if (segmentIndex < state?.currentSegment) {
      return 100;
    } else {
      return (
        (state?.segmentTime / state?.segments[state?.currentSegment].duration) *
        100
      );
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getArrowPosition = () => {
    const progress = 1 - state?.remainingTime / state?.totalTime;
    return `${progress * 100}%`;
  };

  useEffect(() => {
    console.log("timerStatus", state?.timerStatus);

    if (state?.timerStatus === "pause") return;
    else if (state?.timerStatus === "running") {
      const timer = setInterval(() => {
        state?.setRemainingTime((prevTime: number) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });

        state?.setSegmentTime((prevTime: number) => {
          if (prevTime <= 1) {
            const nextSegment =
              (state?.currentSegment - 1) % state?.segments.length;
            state?.setCurrentSegment(nextSegment);
            return state?.segments[nextSegment].duration;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state?.currentSegment, state?.timerStatus]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex items-center">
          <div className="w-12 h-96 bg-gray-200 rounded-lg overflow-hidden relative">
            {state?.segments.map((segment, index) => (
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
                  bottom: `${state?.segments
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
          <div className="w-16 h-96 relative">
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
          {formatTime(state?.segmentTime)}
        </div>
      </div>
    </div>
  );
};

export default TimerBar;
