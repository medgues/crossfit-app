/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { NumberInput, NumberInputProps } from '@mantine/core'
import classes from './CustomNumberInput.module.css'

export type CustomNumberInputProps = NumberInputProps

const CustomNumberInput = React.forwardRef<
  HTMLInputElement,
  CustomNumberInputProps
>((props, ref) => (
  <NumberInput
    {...props}
    classNames={{
      input: classes.input,
      error: classes.error,
      section: classes.section,
      label: classes.label,
    }}
    ref={ref}
    hideControls
  />
))

export default CustomNumberInput
