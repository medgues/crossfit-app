import { Flex, Image } from "@mantine/core";
import background from "@/assets/background.svg";
import whiteLogo from "@/assets/white-logo.svg";
import leaderBoard from "@/assets/Leaderboard.svg";
import { useAppSelector } from "@/state/redux-hooks";
import audio from "../assets/ready.mp3";
import TimerBar from "@/components/ui/timerUi/TimerBar";
const TimerDisplay = () => {
  const { segmentTime } = useAppSelector((state) => state.timer);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const alertSound = new Audio(audio); // Replace with your sound file path or URL
  if (segmentTime === 7) {
    alertSound.play();
  }
  return (
    <div
      className="flex flex-col items-center justify-center h-[100vh] w-[100vw] gap-[8rem]
 bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <Flex
        direction="column"
        align="center"
        justify="space-around"
        h="100%"
        w="100%"
        p="xl"
        className=""
      > */}
      <Flex w="100%" justify="center" gap="md" className="">
        <Image src={whiteLogo} alt="whiteLogo" />
        <Image src={leaderBoard} alt="leaderBoard" className="object-contain	" />
      </Flex>
      <Flex
        w="90%"
        justify="center"
        className="text-white text-[200px] font-bold"
      >
        <TimerBar className="hidden" />
        {formatTime(segmentTime)}
      </Flex>
      {/* </Flex> */}
    </div>
  );
};

export default TimerDisplay;
