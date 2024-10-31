import { Checkbox, CheckboxProps } from "@mantine/core";

export type CustomCheckBoxProps = CheckboxProps;
const CustomCheckBox = (props: CustomCheckBoxProps) => <Checkbox {...props} />;

export default CustomCheckBox;
