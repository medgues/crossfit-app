import TimerBar from "@/components/ui/timerUi/TimerBar";
import background from "@/assets/background.svg";
import { Flex, Image, Text } from "@mantine/core";
import whiteLogo from "@/assets/white-logo.svg";
import leaderBoard from "@/assets/Leaderboard.svg";
import { useAppSelector } from "@/state/redux-hooks";

const NewTapPage = () => {
  const { challengersList } = useAppSelector(
    (state) => state.challengers || []
  );

  return (
    <div
      className="flex flex-col items-center justify-center h-[100vh] w-[100vw]
     bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Flex
        direction="column"
        align="center"
        justify="space-around"
        h="100%"
        w="100%"
        p="xl"
        className=""
      >
        <Flex w="100%" justify="flex-start" gap="md" className="">
          <Image src={whiteLogo} alt="whiteLogo" />
          <Image
            src={leaderBoard}
            alt="leaderBoard"
            className="object-contain	"
          />
        </Flex>
        <Flex w="90%" justify="evenly" gap="xl">
          <Flex w="90%" justify="evenly" gap="3px" direction="column">
            <span className="text-white bg-gradient-to-r from-[rgb(17,17,17)] bg-[#ff141477] font-normal w-1/5 rounded-md h-[40px] flex items-center justify-center text-2xl">
              intermediate male 18-34
            </span>
            <Flex w="90%" justify="evenly" gap="3px" direction="column">
              {challengersList.map((challenger) => (
                <div className="bg-[rgba(17,17,17,0.5)] w-full h-[60px] flex flex-row items-center justify-between px-10">
                  <span className="flex flex-row items-center justify-center text-white text-lg font-semibold">
                    <Text className="rounded-md text-2xl font-medium">
                      {challenger.name.substring(
                        0,
                        challenger.name.indexOf(" ")
                      )}
                    </Text>
                    <Text className="pl-2 rounded-md text-2xl font-bold">
                      {challenger.name.substring(
                        challenger.name.indexOf(" ") + 1
                      )}
                    </Text>
                  </span>
                  <span className="flex flex-row items-center justify-center bg-white px-2 py-1 rounded-md text-lg font-semibold">
                    <Text className="text-black bg-white px-2  rounded-md text-lg font-medium">
                      210Kg
                    </Text>
                    |
                    <Text className="text-black bg-white px-2 py-1 rounded-md text-lg font-bold">
                      10:33
                    </Text>
                  </span>
                </div>
              ))}
              {/* <CustomTable
            renderPage="scoreboard"
            columns={columns}
            data={challengersList}
            loading={loading}
            total={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            selection={selection}
            setSelection={setSelection}
          /> */}
            </Flex>
          </Flex>
          <TimerBar />
        </Flex>
      </Flex>
    </div>
  );
};

export default NewTapPage;
