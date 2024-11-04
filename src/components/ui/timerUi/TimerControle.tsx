/* eslint-disable @typescript-eslint/no-explicit-any */
import Iconsax from "@/components/Iconsax";
import {
  resetTotalTimer,
  previousTimer,
  startTimer,
  pauseTimer,
  nextTimer,
} from "@/state/reducers/timer";
import { useAppDispatch } from "@/state/redux-hooks";
import { Button } from "@mantine/core";
const TimerControle = () => {
  //   const state = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-evenly items-center gap-2">
      <Button
        variant="gradient"
        gradient={{ from: "#D55564", to: "#F77664", deg: 90 }}
        onClick={() => dispatch(previousTimer() as any)}
      >
        {" "}
        <Iconsax name="Previous" size={20} color="#fff" variant="Bold" />
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: "#D55564", to: "#F77664", deg: 90 }}
        onClick={() => dispatch(startTimer() as any)}
      >
        <Iconsax name="Play" size={20} color="#fff" variant="Bold" />
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: "#D55564", to: "#F77664", deg: 90 }}
        onClick={() => dispatch(pauseTimer() as any)}
      >
        {" "}
        <Iconsax name="Pause" size={20} color="#fff" variant="Bold" />
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: "#D55564", to: "#F77664", deg: 90 }}
        onClick={() => dispatch(resetTotalTimer() as any)}
      >
        {" "}
        <Iconsax name="Stop" size={20} color="#fff" variant="Bold" />
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: "#D55564", to: "#F77664", deg: 90 }}
        onClick={() => dispatch(nextTimer() as any)}
      >
        {" "}
        <Iconsax name="Next" size={20} color="#fff" variant="Bold" />
      </Button>
    </div>
  );
};

export default TimerControle;
