/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomTable, { Column } from "@/components/CustomTable/CustomTable";
import Iconsax from "@/components/Iconsax";
import SecondaryAppBar from "@/components/Navigation/SecondaryAppBar";
import { Flex, Modal } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDisclosure } from "@mantine/hooks";
import ChallengersForm from "@/components/ChallengersForm/ChallengersForm";
import { useAppDispatch, useAppSelector } from "@/state/redux-hooks";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import {
  ReqChallengerLastPatch,
  ReqChallengersNextPatch,
  ReqFetchChallengerFirstPatch,
  ReqFetchSearchChallengers,
} from "@/state/reducers/challengers";
import TimerBar from "@/components/ui/timerUi/TimerBar";

type Challenger = {
  name: string;
  avatar: string;
  nationality: string;
  category: string;
  division: string;
  heatNo: string;
  E1?: string;
  E2?: string;
  E3?: string;
  E4?: string;
  E5?: string;
  E6?: string;
};

const Challengers = () => {
  const dispatch = useAppDispatch();

  const [formToShow, setFormToShow] = useState(String);
  const [selectedChallenger, setSelectedChallenger] = useState<Challenger>();

  const [opened, { open, close }] = useDisclosure(false);
  // const dispatch = useAppDispatch();
  const { challengersList, total, page, nextPageCursor, lastPageCursor } =
    useAppSelector((state) => state.challengers || []);
  //   const total = useAppSelector((state) => state.account?.total) || 0;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      setLoading(true);
      try {
        dispatch(ReqFetchSearchChallengers(searchTerm));
      } finally {
        setLoading(false);
      }

      console.log("searchitem", searchTerm);
    } else {
      setLoading(true);
      try {
        dispatch(ReqFetchChallengerFirstPatch(itemsPerPage));
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
    const chalengerToBeDeleted = challengersList.find(
      (challenger) => challenger.id === id
    );
    console.log("chalengerToBeDeleted", chalengerToBeDeleted);
    setSelectedChallenger(chalengerToBeDeleted);
    setFormToShow("delete");
    open();
  };

  const handelUpdateCLick = (id: string) => {
    console.log("update clicked", id);
    const chalengerToBeUpdated = challengersList.find(
      (challenger) => challenger.id === id
    );
    console.log("chalengerToBeUpdated", chalengerToBeUpdated);
    setSelectedChallenger(chalengerToBeUpdated);
    setFormToShow("update");
    open();
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await dispatch(ReqFetchChallengerFirstPatch(itemsPerPage));
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
          ReqChallengersNextPatch(nextPageCursor, itemsPerPage, currentPage)
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
          ReqChallengerLastPatch(lastPageCursor, itemsPerPage, currentPage)
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
      Header: "full name",
      accessor: "name",
    },
    {
      Header: "Nationality",
      accessor: "nationality",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Division",
      accessor: "division",
    },
    {
      Header: "Heat No",
      accessor: "heatNo",
      // render: (role: string) => <p>badge</p>,
    },
    {
      Header: "Stats",
      accessor: "states",
      // render: (role: string) => <p>badge</p>,
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
            onClick={() => handleDelete(row)}
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
        buttonVariant="primary"
        buttonLablel={"Add Challenger"}
        placeholder={"Search"}
        type="search"
        inputIcon="SearchNormal1"
        onStopTyping={debouncedSearch}
        width="2.5rem"
      />
      <Flex justify="space-evenly" align="center" gap="md" className="w-full">
        <CustomTable
          columns={columns}
          data={challengersList}
          loading={loading}
          total={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          selection={selection}
          setSelection={setSelection}
        />
        <TimerBar />
      </Flex>

      <Modal.Root
        opened={opened}
        onClose={close}
        size={formToShow === "delete" ? "md" : "xl"}
        // title={formToShow === "add" ? "Add Challenger" : "Update Challenger"}
      >
        <Modal.Overlay />
        {formToShow === "add" && (
          <ChallengersForm
            close={close}
            formToShow={formToShow}
            setCurrentPage={setCurrentPage}
          />
        )}
        {formToShow === "update" && (
          <ChallengersForm
            close={close}
            formToShow={formToShow}
            selectedChallenger={selectedChallenger}
          />
        )}
        {formToShow === "delete" && (
          <DeleteForm selectedChallenger={selectedChallenger} close={close} />
        )}
      </Modal.Root>
    </main>
  );
};

export default Challengers;
