import { Button, Flex, Text, Title } from "@mantine/core";
import React from "react";
import * as Icon from "iconsax-react";
import { DebouncedFunc } from "lodash";
import CustomInput from "../CustomInput";
import Iconsax from "../Iconsax";

export type SecondaryAppBarProps = {
  loading: boolean;
  title: string;
  open: () => void;
  buttonVariant:
    | "error"
    | "primary"
    | "secondary"
    | "minimal"
    | "gradient"
    | undefined;
  buttonLablel?: string;
  buttonIcon?: React.ReactNode;
  classNames?: { section?: string };
  placeholder?: string;
  type?: "search" | "text" | "password" | undefined;
  inputIcon?: keyof typeof Icon;
  onStopTyping: DebouncedFunc<(searchTerm: string) => void>;
  width?: string;
  height?: string;
  gradient?: { from: string; to: string; deg: number };
  number?: number;
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
  const {
    placeholder,
    type,
    inputIcon,
    onStopTyping,
    width,
    height,
    gradient,
    number,
  } = props;
  return (
    <Flex justify="space-between" mx={6} mt={8} mb="xl">
      <Flex gap="lg">
        <Title order={2}>{title}</Title>
        <Flex
          align="center"
          justify="center"
          gap="xs"
          className="cursor-pointer bg-[rgba(247,118,100,0.12)] px-2 rounded-md"
        >
          <Iconsax name="Profile" size={20} color="#D55564" variant="Bold" />
          <Text className="text-[#D55564] text-xl font-bold"> {number}</Text>
        </Flex>
      </Flex>
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
          gradient={gradient}
        >
          {buttonLablel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SecondaryAppBar;
