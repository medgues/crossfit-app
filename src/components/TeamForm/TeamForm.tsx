/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Modal } from "@mantine/core";
import Iconsax from "../Iconsax";
import colors from "../config/colors";

import { useForm, UseFormReturnType } from "@mantine/form";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useAppDispatch } from "@/state/redux-hooks";
import { useCallback, useEffect, useState } from "react";
import CustomNumberInput from "../CustomNumberInput";
import {
  ReqAddTeam,
  ReqFetchSearchChallengersForTeams,
  ReqUpdateTeam,
  TeamType,
  Member,
} from "@/state/reducers/teams";
import { debounce } from "lodash";
import CustomMultiSelect from "../CustomMultiSelect";

export type ChallengersFromType = {
  close: () => void;
  formToShow: string;
  selectedTeam?: TeamType;
  setCurrentPage?: (page: number) => void;
};

const TeamForm = ({ close, formToShow, selectedTeam }: ChallengersFromType) => {
  const dispatch = useAppDispatch();

  console.log("selectedTeam", selectedTeam);

  const form: UseFormReturnType<TeamType> = useForm<TeamType>({
    initialValues: {
      name: selectedTeam?.name || "",
      members: selectedTeam?.members || [],
      E1: selectedTeam?.E1 || "-",
      E2: selectedTeam?.E2 || "-",
    },
  });

  const [loading, setLoading] = useState(false);
  const [searchedMembers, setSearchedMembers] = useState<Member[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm) {
      setLoading(true);
      try {
        const data = await dispatch(
          ReqFetchSearchChallengersForTeams(searchTerm) as any
        );
        console.log("search", data);
        const serializedData = data.map((item: any) => ({
          id: item.id,
          value: item.id,
          label: item.name,
        }));
        setSearchedMembers(serializedData);
      } finally {
        setLoading(false);
      }

      console.log("searchitem", searchTerm);
    } else {
      setSearchedMembers([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const addTeam = async (values: TeamType) => {
    setLoading(true);
    try {
      await dispatch(ReqAddTeam(values) as any);
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (values: TeamType) => {
    console.log("pdate values", values);
    setLoading(true);
    try {
      if (!selectedTeam?.id) {
        throw new Error("No team ID found");
      }
      await dispatch(ReqUpdateTeam(selectedTeam.id, values) as any);
      console.log("values", values);
      form.reset();
      close();
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = formToShow === "add" ? addTeam : updateTeam;

  useEffect(() => {
    if (selectedTeam) {
      setSelectedValues(selectedTeam.members.map((member) => member.id));
    }
  }, [selectedTeam]);

  const handleOnChangeTeamsMembers = (value: string) => {
    const selectedMember = searchedMembers.filter(
      (member) => member.id === value
    );
    form.setFieldValue("members", (current) => {
      return [...current, ...selectedMember];
    });
    setSelectedValues((current) => [...current, value]); // Add this

    setSearchedMembers([]);
  };

  const handleRemoveTeamMember = (value: string) => {
    form.setFieldValue("members", (current) => {
      return current.filter((member) => member.id !== value);
    });
    setSelectedValues((current) => current.filter((v) => v !== value));
  };

  useEffect(() => {
    console.log("form.values", form.values);
  }, [form.values]);

  return (
    <Modal.Content className="left-0 bottom-0">
      <Modal.Header>
        <Modal.Title className="text-lg font-medium	">
          {formToShow} team
        </Modal.Title>
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
            {" "}
            <CustomTextInput
              size="lg"
              w="100%"
              disabled={loading}
              placeholder="Team name"
              label="Team name"
              {...form.getInputProps("name")}
              value={form.values?.name}
            />
            <CustomMultiSelect
              maxValues={3}
              searchable
              // searchValue={searchValue}
              onSearchChange={debouncedSearch}
              placeholder="Team members"
              w="100%"
              mb={16}
              label="Team members"
              data={searchedMembers}
              // value={challenger?.devision}
              rightSection={
                <Iconsax
                  name="ArrowDown2"
                  size={16}
                  variant="Bold"
                  color={colors.neutral_N600}
                />
              }
              value={selectedValues} // Add this
              onOptionSubmit={(value) => handleOnChangeTeamsMembers(value)}
              onRemove={(value) => handleRemoveTeamMember(value)}
              // {...form.getInputProps("members")}
              // value={selectedTeam?.members}

              // error={form.errors.role ? localize("Must chose a role") : ""}
            />
            <Flex
              justify="center"
              align="start"
              gap="md"
              w="100%"
              direction="column"
              px={24}
            >
              <label htmlFor="members">Team members</label>
              {form.values.members.length > 0 ? (
                form.values.members.map((member) => (
                  <Flex
                    justify="between"
                    align="center"
                    gap="md"
                    className="bg-slate-200 rounded-md px-3"
                    key={member.id}
                  >
                    <div>{member.label}</div>
                    <Iconsax
                      name="CloseSquare"
                      size={16}
                      color={colors.neutral_N900}
                      className="align-end cursor-pointer "
                      onClick={() => handleRemoveTeamMember(member.id)}
                    />
                  </Flex>
                ))
              ) : (
                <div>No members Selected</div>
              )}
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
              <Flex justify="center" align="center" gap="md" w="100%">
                <CustomNumberInput
                  size="lg"
                  label="Event#1"
                  w="50%"
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
                  w="50%"
                  placeholder={"-"}
                  {...form.getInputProps("E2")}
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

export default TeamForm;
