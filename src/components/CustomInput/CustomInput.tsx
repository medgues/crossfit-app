import React, { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Flex,
  TextInputProps,
  PasswordInputProps,
  Loader,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
// import { Icon } from 'iconsax-react';
import * as Icon from "iconsax-react";
import Iconsax from "../Iconsax";
import classes from "./CustomInput.module.css";

export interface CustomInputProps extends Omit<TextInputProps, "onChange"> {
  type?: "text" | "password" | "search";
  onType?: (value: string) => void;
  onStopTyping: (value: string) => void;
  debounceTime?: number;
  buttonLabel?: string;
  icon?: keyof typeof Icon;
  buttonOnClick?: (value: string) => void;
  showLoaderOnType?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    type = "text",
    placeholder = "Enter text...",
    onType,
    onStopTyping,
    debounceTime = 1000,
    icon,
    buttonLabel,
    buttonOnClick,
    showLoaderOnType = true,
  } = props;

  const [value, setValue] = useState<string>("");
  const [debouncedValue] = useDebouncedValue(value, debounceTime);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (onType) {
      onType(value);
    }
    setIsTyping(true);
  }, [value, onType]);

  useEffect(() => {
    if (onStopTyping) {
      onStopTyping(debouncedValue);
    }
    setIsTyping(false);
  }, [debouncedValue, onStopTyping]);

  const handleChange: TextInputProps["onChange"] = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleButtonClick = () => {
    if (buttonOnClick) {
      buttonOnClick(value);
    }
  };

  const renderInput = () => {
    if (type === "password") {
      return (
        <PasswordInput
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          leftSection={icon}
          {...(props as PasswordInputProps)}
          classNames={{
            input: classes.input,
            error: classes.error,
            section: classes.section,
          }}
        />
      );
    }
    return (
      <TextInput
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        leftSection={icon ? <Iconsax name={icon} size={16} /> : null}
        rightSection={isTyping ? <Loader size={20} color="blue" /> : null}
        {...props}
        classNames={{
          input: classes.input,
          error: classes.error,
          section: classes.section,
        }}
      />
    );
  };

  return (
    <Flex align="center">
      {renderInput()}
      {/* {showLoaderOnType && isTyping && (
                <Box ml={8}>
                    <h1>Loading ... </h1>
                </Box>
            )} */}

      {buttonLabel && (
        <Button
          variant="light"
          onClick={handleButtonClick}
          style={{
            marginLeft: "8px",
          }}
        >
          {showLoaderOnType && isTyping ? (
            <Loader size={20} color="blue" />
          ) : (
            buttonLabel
          )}
        </Button>
      )}
    </Flex>
  );
};

export default CustomInput;
