/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomTable, { Column } from "@/components/CustomTable/CustomTable";
import Iconsax from "@/components/Iconsax";
import SecondaryAppBar from "@/components/Navigation/SecondaryAppBar";
import { Flex, Modal } from "@mantine/core";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useDisclosure } from "@mantine/hooks";
import ChallengersForm from "@/components/ChallengersForm/ChallengersForm";
import { useAppSelector } from "@/state/redux-hooks";
import DeleteForm from "@/components/DeleteForm/DeleteForm";

type Challenger = {
  id: string;
  name: string;
  avatar: string;
  nationality: string;
  category: string;
  division: string;
  heatNo: number;
  stats: string;
};

const Challengers = () => {
  const [formToShow, setFormToShow] = useState(String);
  const [_selectedChallenger, setSelectedChallenger] = useState<
    Challenger | object | null
  >(null);

  const [opened, { open, close }] = useDisclosure(false);
  // const dispatch = useAppDispatch();
  const { challengers } = useAppSelector((state) => state.challengers || []);

  //   const total = useAppSelector((state) => state.account?.total) || 0;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      //   dispatch(ReqFetchSearchAccountResults(searchTerm));
      console.log("searchitem", searchTerm);
    } else {
      //   dispatch(ReqFetchAccounts(currentPage, itemsPerPage));
      console.log("no searchitem");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleDelete = async (data: string[]) => {
    console.log("delete data", data);
    setLoading(true);
    setFormToShow("delete");
    open();

    try {
      //   await dispatch(ReqDeleteAccount(data));
      console.log("delete clicked");
    } finally {
      setLoading(false);
    }
  };

  const handelUpdateCLick = (id: string) => {
    console.log("update clicked", id);
    setSelectedChallenger(challengers.find((a) => a.id === id) || null);
    setFormToShow("update");
    open();
  };
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
        <Flex
          justify="center"
          align="center"
          gap="md"
          w="100%"
          h="3.5rem"
          px={24}
          mt={16}
        >
          <Iconsax
            name="Edit"
            onClick={() => handelUpdateCLick(row)}
            size={24}
            color="#707579"
          />
          <Iconsax
            name="Trash"
            onClick={() => handleDelete([row])}
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
      <CustomTable
        columns={columns}
        data={challengers}
        loading={loading}
        total={challengers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        selection={selection}
        setSelection={setSelection}
      />
      <Modal.Root
        opened={opened}
        onClose={close}
        size={formToShow === "delete" ? "md" : "xl"}
        // title={formToShow === "add" ? "Add Challenger" : "Update Challenger"}
      >
        <Modal.Overlay />
        {formToShow === "add" && (
          <ChallengersForm close={close} formToShow={formToShow} />
        )}
        {formToShow === "update" && (
          <ChallengersForm
            close={close}
            formToShow={formToShow}
            // selectedChallenger={selectedChallenger}
          />
        )}
        {formToShow === "delete" && <DeleteForm />}
      </Modal.Root>
    </main>
  );
};

export default Challengers;
