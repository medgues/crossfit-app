/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Flex, Modal } from "@mantine/core";
import Iconsax from "../Iconsax";
import colors from "../config/colors";
import CustomSelect from "../CustomSelect";
import {
  ChallengersType,
  // ChallengersType,
  ReqAddChallenger,
  ReqUpdateChallenger,
} from "@/state/reducers/challengers";
import { useForm, UseFormReturnType } from "@mantine/form";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useAppDispatch } from "@/state/redux-hooks";
import { useEffect, useState } from "react";
import CustomNumberInput from "../CustomNumberInput";

export type newChallengerType = {
  id?: string;
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

export type ChallengersFromType = {
  close: () => void;
  formToShow: string;
  selectedChallenger?: ChallengersType;
  setCurrentPage?: (page: number) => void;
};
const nationalities = [
  { code: "DZ", label: "Algerian", value: "Algerian" },
  { code: "EGY", label: "Egyptian", value: "Egyptian" },
  { code: "LY", label: "Lybian", value: "Lybian" },
  { code: "PS", label: "Plestinian", value: "Plestinian" },
  { code: "KW", label: "Kuwaiti", value: "Kuwaiti" },
  { code: "FR", label: "French", value: "French" },
  { code: "CZ", label: "Czech", value: "Czech" },
  { code: "PT", label: "Portuguese", value: "Portuguese" },
];

const ChallengersForm = ({
  close,
  formToShow,
  selectedChallenger,
}: ChallengersFromType) => {
  const dispatch = useAppDispatch();

  const form: UseFormReturnType<newChallengerType> = useForm<newChallengerType>(
    {
      initialValues: {
        name: selectedChallenger?.name || "",
        avatar: selectedChallenger?.avatar || "",
        nationality: selectedChallenger?.nationality.name || "",
        category: selectedChallenger?.category || "",
        division: selectedChallenger?.division || "",
        heatNo: selectedChallenger?.heatNo || "-",
        E1: selectedChallenger?.E1 || "-",
        E2: selectedChallenger?.E2 || "-",
        E3: selectedChallenger?.E3 || "-",
        E4: selectedChallenger?.E4 || "-",
        E5: selectedChallenger?.E5 || "-",
        E6: selectedChallenger?.E6 || "-",
      },
    }
  );

  const [loading, setLoading] = useState(false);

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
  const addChallenger = async (values: newChallengerType) => {
    const newValues = {
      ...values,
      nationality: {
        code: nationalities.filter((na) => na.value === values.nationality)[0]
          .code,
        name: nationalities.filter((na) => na.value === values.nationality)[0]
          .value,
      },
    };
    setLoading(true);
    try {
      await dispatch(ReqAddChallenger(newValues) as any);
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };

  const updateChallenger = async (values: ChallengersType) => {
    const newValues = {
      ...values,
      nationality: {
        code: nationalities.filter(
          (na) => na.value === values.nationality.name
        )[0].code,
        name: nationalities.filter(
          (na) => na.value === values.nationality.name
        )[0].value,
      },
    };
    console.log("pdate values", newValues);
    setLoading(true);
    try {
      if (!selectedChallenger?.id) {
        throw new Error("No challenger ID found");
      }
      await dispatch(
        ReqUpdateChallenger(selectedChallenger.id, newValues) as any
      );
      console.log("values", newValues);
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(form.values);
  }, [form.values]);

  const handleFormSubmit = (values: newChallengerType | ChallengersType) => {
    if (formToShow === "add") {
      addChallenger(values as newChallengerType);
    } else {
      updateChallenger(values as ChallengersType);
    }
  };

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
                />
                <CustomSelect
                  size="lg"
                  w="100%"
                  disabled={loading}
                  placeholder="Name"
                  label="Nationality"
                  selectdata={nationalities}
                  {...form.getInputProps("nationality")}
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
                />
                <CustomSelect
                  placeholder="Select devision"
                  w="50%"
                  mb={16}
                  label="Devision"
                  selectdata={devisionsList}
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("division")}
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
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("teamName")}
                />
                <CustomSelect
                  placeholder="Select Heat No"
                  w="50%"
                  mb={16}
                  label="Heat No"
                  rightSection={
                    <Iconsax
                      name="ArrowDown2"
                      size={16}
                      variant="Bold"
                      color={colors.neutral_N600}
                    />
                  }
                  {...form.getInputProps("heatNo")}
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
