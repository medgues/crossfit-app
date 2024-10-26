import { useEffect } from "react";
import { useTimerStore } from "@/stores/useTimerStore";

const NewTapPage = () => {
  const state = useTimerStore();

  useEffect(() => {
    console.log("timerStatus from page", state);
  }, [state]);
  return (
    <>
      <div>DisplayPage</div>
    </>
  );
};

export default NewTapPage;
