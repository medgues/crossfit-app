import { Button, Flex, Title } from "@mantine/core";
import React from "react";
import * as Icon from "iconsax-react";
import { DebouncedFunc } from "lodash";
import CustomInput from "../CustomInput";

export type SecondaryAppBarProps = {
  loading: boolean;
  title: string;
  open: () => void;
  buttonVariant: "error" | "primary" | "secondary" | "minimal" | undefined;
  buttonLablel?: string;
  buttonIcon?: keyof typeof Icon;
  classNames?: { section?: string };
  placeholder?: string;
  type?: "search" | "text" | "password" | undefined;
  inputIcon?: keyof typeof Icon;
  onStopTyping: DebouncedFunc<(searchTerm: string) => void>;
  width?: string;
  height?: string;
};
const SecondaryAppBar: React.FC<SecondaryAppBarProps> = (
  props: SecondaryAppBarProps
) => {
  const {
    loading,
    title,
    open,
    buttonVariant,
    buttonLablel,
    buttonIcon,
    classNames,
  } = props;
  const { placeholder, type, inputIcon, onStopTyping, width, height } = props;
  return (
    <Flex justify="space-between" mx={6} mt={8} mb="xl">
      <Title order={2}>{title}</Title>
      <Flex justify="space-between" gap="lg">
        <CustomInput
          type={type}
          icon={inputIcon}
          size="md"
          disabled={loading}
          placeholder={placeholder}
          onStopTyping={onStopTyping}
          width={width}
          height={height}
        />
        <Button
          classNames={classNames}
          size="md"
          variant={buttonVariant}
          onClick={open}
          loading={loading}
          leftSection={buttonIcon}
        >
          {buttonLablel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SecondaryAppBar;
