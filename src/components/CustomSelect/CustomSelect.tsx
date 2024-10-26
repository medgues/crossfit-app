import React from "react";
import {
  Group,
  Image,
  Select,
  Text,
  SelectProps,
  ComboboxData,
} from "@mantine/core";
import classes from "./CustomSelect.module.css";
import colors from "../config/colors";

export type Transformedselectdata = {
  id?: string;
  value?: string;
  label: string;
  img?: string;
};

export type CustomSelectProps = SelectProps & {
  label?: string;
  description?: string;
  selectdata?: Transformedselectdata[];
  imageHeight?: number;
};

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const { label, description, selectdata, imageHeight } = props;
  const renderMultiSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }: {
    option: Transformedselectdata;
    checked?: boolean;
  }) => (
    <Group
      gap="sm"
      bg={checked ? colors.blue_b50 : ""}
      w="100%"
      py={12}
      px={16}
      style={{
        borderRadius: "8px",
      }}
    >
      {option.img && <Image src={option.img} radius="xl" h={imageHeight} />}
      <div>
        <Text size="md" c={checked ? colors.blue_b400 : ""} className="h500">
          {option.label}
        </Text>
        {/* secondary text under the select label */}
        {/* <Text size="xs" opacity={0.5}>
    {option.email}
  </Text> */}
      </div>
    </Group>
  );
  // important to be finished
  return (
    <Select
      {...props}
      data={selectdata as ComboboxData}
      renderOption={renderMultiSelectOption}
      variant="unstyled"
      leftSectionPointerEvents="none"
      classNames={{
        input: classes.input,
        error: classes.error,
        section: classes.section,
        root: classes.root,
      }}
      label={label?.toUpperCase()}
      description={description}
    />
  );
};

export default CustomSelect;
