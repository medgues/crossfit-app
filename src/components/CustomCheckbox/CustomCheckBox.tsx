import { Checkbox, CheckboxProps } from '@mantine/core'

export type CustomCheckBoxProps = CheckboxProps
const CustomCheckBox = (props: CustomCheckBoxProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Checkbox {...props} />
)

export default CustomCheckBox
