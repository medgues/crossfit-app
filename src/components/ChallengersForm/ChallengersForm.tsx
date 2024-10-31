import { Avatar, Button, Flex, Modal } from "@mantine/core";
import Iconsax from "../Iconsax";
import colors from "../config/colors";
import CustomSelect from "../CustomSelect";
import {
  ChallengersType,
  ReqAddChallenger,
  ReqUpdateChallenger,
} from "@/state/reducers/challengers";
import { useForm, UseFormReturnType } from "@mantine/form";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useAppDispatch } from "@/state/redux-hooks";
import { useEffect, useState } from "react";
import CustomNumberInput from "../CustomNumberInput";

export type ChallengersFromType = {
  close: () => void;
  formToShow: string;
  selectedChallenger?: ChallengersType;
  setCurrentPage?: (page: number) => void;
};

const ChallengersForm = ({
  close,
  formToShow,
  selectedChallenger,
}: ChallengersFromType) => {
  const dispatch = useAppDispatch();

  console.log("selectedChallenger", selectedChallenger);

  const form: UseFormReturnType<ChallengersType> = useForm<ChallengersType>({
    initialValues: {
      name: "",
      avatar: "",
      nationality: "",
      category: "",
      division: "",
      heatNo: "-",
      E1: "-",
      E2: "-",
      E3: "-",
      E4: "-",
      E5: "-",
      E6: "-",
    },
    validate: {},
  });

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const devisionsList = [
    {
      id: "1",
      value: "scaled",
      label: "Scaled",
    },
    {
      id: "2",
      value: "intermediate",
      label: "intermediate",
    },
    {
      id: "3",
      value: "elite",
      label: "elite",
    },
    {
      id: "4",
      value: "master",
      label: "master",
    },
  ];

  const categoryList = [
    {
      id: "1",
      value: "male 18-34",
      label: "male 18-34",
    },
    {
      id: "2",
      value: "male 35-44",
      label: "male 35-44",
    },
    {
      id: "3",
      value: "female 18-34",
      label: "female 18-34",
    },
    {
      id: "4",
      value: "female 35-44",
      label: "female 35-44",
    },
    {
      id: "5",
      value: "male +45",
      label: "male +45",
    },
    {
      id: "6",
      value: "female +45",
      label: "female +45",
    },
  ];
  const addChallenger = async (values: ChallengersType) => {
    setLoading(true);
    try {
      await dispatch(ReqAddChallenger(values));
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };

  const updateChallenger = async (values: ChallengersType) => {
    console.log("pdate values", values);
    setLoading(true);
    try {
      if (!selectedChallenger?.id) {
        throw new Error("No challenger ID found");
      }
      await dispatch(ReqUpdateChallenger(selectedChallenger.id, values));
      console.log("values", values);
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit =
    formToShow === "add" ? addChallenger : updateChallenger;

  useEffect(() => {
    if (selectedChallenger) {
      form.setValues({
        name: selectedChallenger.name,
        avatar: selectedChallenger.avatar,
        nationality: selectedChallenger.nationality,
        category: selectedChallenger.category,
        division: selectedChallenger.division,
        heatNo: selectedChallenger.heatNo,
        E1: selectedChallenger.E1 || "-",
        E2: selectedChallenger.E2 || "-",
        E3: selectedChallenger.E3 || "-",
        E4: selectedChallenger.E4 || "-",
        E5: selectedChallenger.E5 || "-",
        E6: selectedChallenger.E6 || "-",
      });
    }
  }, [selectedChallenger]);

  return (
    <Modal.Content className="left-0 bottom-0">
      <Modal.Header>
        <Modal.Title>{formToShow} challenger</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <Flex
            justify="center"
            align="center"
            gap="md"
            w="100%"
            px={24}
            mt={16}
            direction="column"
          >
            <Flex
              justify="center"
              align="center"
              gap="xl"
              w="100%"
              px={24}
              mt={16}
            >
              <Flex
                justify="center"
                align="center"
                gap="md"
                direction="column"
                w="30%"
                // px={24}
                mt={16}
              >
                <Avatar src="avatar.png" alt="it's me" size="150px" />
                <Button
                  variant="outline"
                  leftSection={
                    <Iconsax name="Camera" size={20} color="#228be6" />
                  }
                >
                  {" "}
                  Upload Photo
                </Button>
              </Flex>
              <Flex justify="center" gap="md" direction="column" w="100%">
                {" "}
                <CustomTextInput
                  size="lg"
                  w="100%"
                  disabled={loading}
                  placeholder="Name"
                  label="Full name"
                  {...form.getInputProps("name")}
                  value={form.values?.name}
                />
                <CustomTextInput
                  size="lg"
                  w="100%"
                  disabled={loading}
                  placeholder="Name"
                  label="Nationality"
                  {...form.getInputProps("nationality")}
                  value={form.values?.nationality}
                />
              </Flex>
            </Flex>
            <Flex
              justify="center"
              align="center"
              gap="md"
              direction="column"
              w="100%"
            >
              <Flex
                justify="center"
                align="center"
                gap="md"
                w="100%"
                px={24}
                mt={16}
              >
                <CustomSelect
                  placeholder={"Select category"}
                  w="50%"
                  mb={16}
                  label={"Category"}
                  selectdata={categoryList}
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("category")}
                  value={selectedChallenger?.category}

                  // error={form.errors.role ? localize("Must chose a role") : ""}
                />
                <CustomSelect
                  placeholder="Select devision"
                  w="50%"
                  mb={16}
                  label="Devision"
                  selectdata={devisionsList}
                  // value={challenger?.devision}
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("division")}
                  value={selectedChallenger?.division}

                  // error={form.errors.role ? localize("Must chose a role") : ""}
                />
              </Flex>
              <Flex
                justify="center"
                align="center"
                gap="md"
                w="100%"
                px={24}
                mt={16}
              >
                <CustomSelect
                  placeholder={"Select team name"}
                  w="50%"
                  mb={16}
                  label={"Team name"}
                  // selectdata={transformedRoles(roles)}
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("teamName")}
                  // value={selectedChallenger?.teamName}

                  // error={form.errors.role ? localize("Must chose a role") : ""}
                />
                <CustomSelect
                  placeholder="Select Heat No"
                  w="50%"
                  mb={16}
                  label="Heat No"
                  // selectdata={transformedRoles(roles)}
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("heatNo")}
                  value={selectedChallenger?.heatNo}

                  // error={form.errors.role ? localize("Must chose a role") : ""}
                />
              </Flex>
            </Flex>
            <Flex
              justify="center"
              align="start"
              gap="md"
              direction="column"
              w="100%"
              px={24}
              mt={16}
            >
              <label className="text-left	">Events</label>
              <Flex
                justify="center"
                align="center"
                gap="md"
                w="100%"
                px={24}
                mt={16}
              >
                <CustomNumberInput
                  size="lg"
                  label="Event#1"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E1")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E1}
                />
                <CustomNumberInput
                  size="lg"
                  label="Event#2"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E2")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E2}
                />
                <CustomNumberInput
                  size="lg"
                  label="Event#3"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E3")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E3}
                />
                <CustomNumberInput
                  size="lg"
                  label="Event#4"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E4")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E4}
                />
                <CustomNumberInput
                  label="Event#5"
                  size="lg"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E5")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E5}
                />
                <CustomNumberInput
                  label="Event#6"
                  size="lg"
                  w="10%"
                  placeholder={"-"}
                  {...form.getInputProps("E6")}
                  styles={{
                    section: {
                      width: "50px",
                      color: "#8FA3B2",
                    },
                  }}
                  value={selectedChallenger?.E6}
                />
              </Flex>
            </Flex>
            <Button
              color="teal"
              variant="filled"
              className="self-end"
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Modal.Body>
    </Modal.Content>
  );
};

export default ChallengersForm;
