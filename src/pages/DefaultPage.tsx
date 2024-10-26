import viteLogo from "/electron-vite.animate.svg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
// import TimerBar from "@/components/ui/timerUi/timerBar";
import { useTimerStore } from "@/stores/useTimerStore";
import { useEffect } from "react";
import TimerBar from "@/components/ui/timerUi/TimerBar";

dayjs.extend(duration);

const DefaultPage = () => {
  const state = useTimerStore();
  useEffect(() => {
    console.log("timerStatus App", state);
  }, [state]);
  const startTimer = () => {
    state?.setTimerStatus("running");
  };
  const pauseTimer = () => {
    state?.setTimerStatus("pause");
  };
  const resetCurentTimer = () => {
    state?.setTimerStatus("paused");
    switch (state?.currentSegment) {
      case 0:
        state?.setRemainingTime(10 * 60);
        break;
      case 1:
        state?.setRemainingTime(13 * 60);
        break;
      case 2:
        state?.setRemainingTime(23 * 60);
        break;
      case 3:
        state?.setRemainingTime(26 * 60);
        break;
      case 4:
        state?.setRemainingTime(36 * 60);
        break;
      case 5:
        state?.setRemainingTime(state?.totalTime);
        break;
      default:
        break;
    }
    state?.setSegmentTime(state?.segments[state?.currentSegment].duration);
    console.log(state?.currentSegment);
  };
  const resetTotalTimer = () => {
    state?.setCurrentSegment(state?.segments.length - 1);
    state?.setSegmentTime(state?.segments[state?.segments.length - 1].duration);
    state?.setRemainingTime(state?.totalTime);

    state?.setTimerStatus("pause");
  };
  return (
    <div className="flex w-full">
      <div>
        <Link to="/about" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
      </div>
      <div className="card flex justify-evenly">
        <button onClick={() => startTimer()}>start</button>
        <button onClick={() => pauseTimer()}>pause</button>
        <button onClick={() => resetCurentTimer()}>reset current Timer</button>
        <button onClick={() => resetTotalTimer()}>reset total Timer</button>
      </div>

      <TimerBar state={state} />
    </div>
  );
};

export default DefaultPage;
