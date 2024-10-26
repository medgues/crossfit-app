import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import classes from "./CustomTextInput.module.css";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  description?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { label, value, description } = props;
  return (
    <TextInput
      {...props}
      leftSectionPointerEvents="none"
      classNames={{
        input: classes.input,
        error: classes.error,
        section: classes.section,
      }}
      label={label?.toUpperCase()}
      description={description}
      value={value}
    />
  );
};

export default CustomTextInput;
