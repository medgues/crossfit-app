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
      <Button variant="outline" onClick={() => dispatch(previousTimer())}>
        {" "}
        <Iconsax name="Previous" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(startTimer())}>
        <Iconsax name="Play" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(pauseTimer())}>
        {" "}
        <Iconsax name="Pause" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(resetTotalTimer())}>
        {" "}
        <Iconsax name="Stop" size={20} color="#228be6" />
      </Button>
      <Button variant="outline" onClick={() => dispatch(nextTimer())}>
        {" "}
        <Iconsax name="Next" size={20} color="#228be6" />
      </Button>
    </div>
  );
};

export default TimerControle;
