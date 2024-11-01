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
        variant="outline"
        onClick={() => dispatch(previousTimer() as any)}
      >
        {" "}
        <Iconsax name="Previous" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(startTimer() as any)}>
        <Iconsax name="Play" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(pauseTimer() as any)}>
        {" "}
        <Iconsax name="Pause" size={20} color="#228be6" />
      </Button>
      <Button
        variant="outline"
        onClick={() => dispatch(resetTotalTimer() as any)}
      >
        {" "}
        <Iconsax name="Stop" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(nextTimer() as any)}>
        {" "}
        <Iconsax name="Next" size={20} color="#228be6" />
      </Button>
    </div>
  );
};

export default TimerControle;
