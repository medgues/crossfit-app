/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomTable, { Column } from "@/components/CustomTable/CustomTable";
import Iconsax from "@/components/Iconsax";
import SecondaryAppBar from "@/components/Navigation/SecondaryAppBar";
import { Flex, Modal } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@/state/redux-hooks";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import {
  ReqFetchChallengerFirstPatch,
  ReqFetchSearchChallengers,
} from "@/state/reducers/challengers";
import TimerBar from "@/components/ui/timerUi/TimerBar";
import {
  Member,
  TeamType,
  ReqFetchTeamFirstPatch,
  ReqTeamsLastPatch,
  ReqTeamsNextPatch,
  ReqDeleteTeam,
} from "@/state/reducers/teams";
import TeamForm from "@/components/TeamForm/TeamForm";

const Teams = () => {
  const dispatch = useAppDispatch();

  const [formToShow, setFormToShow] = useState(String);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();

  const [opened, { open, close }] = useDisclosure(false);
  // const dispatch = useAppDispatch();
  const { teamsList, total, page, nextPageCursor, lastPageCursor } =
    useAppSelector((state) => state.teams || []);
  //   const total = useAppSelector((state) => state.account?.total) || 0;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      setLoading(true);
      try {
        dispatch(ReqFetchSearchChallengers(searchTerm) as any);
      } finally {
        setLoading(false);
      }

      console.log("searchitem", searchTerm);
    } else {
      setLoading(true);
      try {
        dispatch(ReqFetchChallengerFirstPatch(itemsPerPage) as any);
      } finally {
        setLoading(false);
      }
      //   dispatch(ReqFetchAccounts(currentPage, itemsPerPage));
      console.log("no searchitem");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleDelete = async (id: string) => {
    console.log("update clicked", id);
    setLoading(true);
    try {
      if (selectedTeam?.id) {
        dispatch(ReqDeleteTeam(selectedTeam?.id) as any);
      }
    } finally {
      close();
      setLoading(false);
    }
  };

  const handelUpdateCLick = (id: string) => {
    console.log("update clicked", id);
    const teamToBeUpdated = teamsList.find((team) => team.id === id);
    console.log("teamToBeUpdated", teamToBeUpdated);
    setSelectedTeam(teamToBeUpdated);
    setFormToShow("update");
    open();
  };

  const handelOpenDeleteDrawer = (id: string) => {
    const teamToBeDeleted = teamsList.find((team) => team.id === id);
    console.log("teamToBeDeleted", teamToBeDeleted);
    setSelectedTeam(teamToBeDeleted);
    setFormToShow("delete");
    open();
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await dispatch(ReqFetchTeamFirstPatch(itemsPerPage) as any);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchNextPage() {
      console.log("fetching next page");
      setLoading(true);
      try {
        await dispatch(
          ReqTeamsNextPatch(nextPageCursor, itemsPerPage, currentPage) as any
        );
      } finally {
        setLoading(false);
      }
    }
    async function fetchLastPage() {
      console.log("fetching last page");
      setLoading(true);
      try {
        await dispatch(
          ReqTeamsLastPatch(lastPageCursor, itemsPerPage, currentPage) as any
        );
      } finally {
        setLoading(false);
      }
    }
    console.log("page with current page", page, currentPage);
    if (page < currentPage) {
      fetchNextPage();
    } else if (page > currentPage) {
      fetchLastPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: Column<any>[] = [
    {
      Header: "Team name",
      accessor: "name",
    },
    {
      Header: "Members",
      accessor: "members",
      render: (members: Member[]) => {
        if (members.length > 0) {
          return members.map((member) => member.label).join(", ");
        }
        return "Team has no members";
      },
    },
    {
      Header: "Stats",
      accessor: "states",
      render: (_data, row) => {
        return (
          <div className="text-sm text-gray-600">
            E1: {row.E1}kg · E2: {row.E2}kg
          </div>
        );
      },
    },

    {
      Header: "Actions",
      accessor: "id",
      render: (row) => (
        <Flex justify="center" align="center" gap="md" w="100%" h="2.5rem">
          <Iconsax
            name="Edit"
            onClick={() => handelUpdateCLick(row)}
            size={24}
            color="#707579"
          />
          <Iconsax
            name="Trash"
            onClick={() => handelOpenDeleteDrawer(row)}
            size={24}
            color="#707579"
          />
        </Flex>
      ),
    },
  ];

  return (
    <main
      style={{
        borderTop: "1px solid #E6ECF0",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        padding: "18px",
      }}
    >
      <SecondaryAppBar
        loading={loading}
        open={() => {
          setFormToShow("add");
          open();
        }}
        title={"CHALLENGERS"}
        buttonLablel={"Add Team"}
        placeholder={"Search"}
        type="search"
        inputIcon="SearchNormal1"
        onStopTyping={debouncedSearch}
        width="2.5rem"
        buttonVariant="gradient"
        gradient={{ from: "#0083AA", to: "#5FA69B", deg: 90 }}
        buttonIcon={
          <Iconsax name="AddSquare" size={24} color="#fff" variant="Bold" />
        }
        number={total}
      />
      <Flex justify="space-evenly" align="center" gap="md" className="w-full">
        <CustomTable
          columns={columns}
          data={teamsList}
          loading={loading}
          total={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          selection={selection}
          setSelection={setSelection}
        />
        {/* <TimerBar /> */}
      </Flex>

      <Modal.Root
        opened={opened}
        onClose={close}
        size={formToShow === "delete" ? "md" : "xl"}
        // title={formToShow === "add" ? "Add Challenger" : "Update Challenger"}
      >
        <Modal.Overlay />
        {formToShow === "add" && (
          <TeamForm
            close={close}
            formToShow={formToShow}
            setCurrentPage={setCurrentPage}
          />
        )}
        {formToShow === "update" && (
          <TeamForm
            close={close}
            formToShow={formToShow}
            selectedTeam={selectedTeam}
          />
        )}
        {formToShow === "delete" && (
          <DeleteForm selectedItem={selectedTeam} handleDelete={handleDelete} />
        )}
      </Modal.Root>
    </main>
  );
};

export default Teams;
