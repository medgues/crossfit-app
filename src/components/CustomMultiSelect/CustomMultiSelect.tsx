import React from "react";
// import "@mantine/dates/styles.css";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import classes from "./CustomMultiSelect.module.css";

const CustomMultiSelect: React.FC<MultiSelectProps> = (
  props: MultiSelectProps
) => (
  <MultiSelect
    {...props}
    classNames={{
      input: classes.input,
      error: classes.error,
      section: classes.section,
      root: classes.root,
    }}
    maxDropdownHeight={300}
  />
);
export default CustomMultiSelect;
