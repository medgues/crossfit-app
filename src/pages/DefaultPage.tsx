import { useEffect, useState } from "react";
import viteLogo from "/electron-vite.animate.svg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const DefaultPage = () => {
  const segments = [
    { duration: 600, color: "bg-blue-500", label: "10 min" },
    { duration: 180, color: "bg-gray-800", label: "3 min" },
    { duration: 600, color: "bg-blue-500", label: "10 min" },
    { duration: 180, color: "bg-gray-800", label: "3 min" },
    { duration: 600, color: "bg-blue-500", label: "10 min" },
    { duration: 180, color: "bg-gray-800", label: "3 min" },
  ];
  const totalTime = segments.reduce(
    (acc, segment) => acc + segment.duration,
    0
  );
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [timerStatus, setTimerStatus] = useState("pause");
  const [currentSegment, setCurrentSegment] = useState(segments.length - 1);
  const [segmentTime, setSegmentTime] = useState(
    segments[segments.length - 1].duration
  );

  useEffect(() => {
    if (timerStatus === "pause") return;
    else if (timerStatus === "running") {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });

        setSegmentTime((prevTime) => {
          if (prevTime <= 1) {
            const nextSegment = (currentSegment - 1) % segments.length;
            setCurrentSegment(nextSegment);
            return segments[nextSegment].duration;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentSegment, timerStatus]);

  const getSegmentHeight = (segmentTime: number) => {
    return (segmentTime / totalTime) * 100;
  };

  const getRemainingHeight = (segmentIndex: number) => {
    if (segmentIndex > currentSegment) {
      return 0;
    } else if (segmentIndex < currentSegment) {
      return 100;
    } else {
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
  const startTimer = () => {
    setTimerStatus("running");
  };
  const pauseTimer = () => {
    setTimerStatus("pause");
  };
  const resetCurentTimer = () => {
    setTimerStatus("paused");
    switch (currentSegment) {
      case 0:
        setRemainingTime(10 * 60);
        break;
      case 1:
        setRemainingTime(13 * 60);
        break;
      case 2:
        setRemainingTime(23 * 60);
        break;
      case 3:
        setRemainingTime(26 * 60);
        break;
      case 4:
        setRemainingTime(36 * 60);
        break;
      case 5:
        setRemainingTime(totalTime);
        break;
      default:
        break;
    }
    setSegmentTime(segments[currentSegment].duration);
    console.log(currentSegment);
  };
  const resetTotalTimer = () => {
    setSegmentTime(segments[segments.length - 1].duration);
    setCurrentSegment(segments.length - 1);
    setRemainingTime(totalTime);

    setTimerStatus("pause");
  };

  return (
    <>
      <div>
        <Link to="/about" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
      </div>
      <div className="card flex justify-evenly">
        <button onClick={startTimer}>start</button>
        <button onClick={pauseTimer}>pause</button>
        <button onClick={resetCurentTimer}>reset current Timer</button>
        <button onClick={resetTotalTimer}>reset total Timer</button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
          {formatTime(segmentTime)}
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
