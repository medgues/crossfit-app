import { FC } from "react";
import * as Icon from "iconsax-react";
import colors from "../config/colors";
// import colors from '../../config/colors'

export interface IconProps {
  name: keyof typeof Icon;
  size: number;
  color?: string;
  className?: string;
  variant?:
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | "TwoTone"
    | undefined;
  onClick?: () => void;
}

const Iconsax: FC<IconProps> = (props: IconProps) => {
  const {
    name,
    size,
    color = colors.blue_0,
    className,
    variant,
    onClick,
  } = props;
  const Name = Icon[name];

  return (
    <Name
      size={size}
      color={color}
      variant={variant}
      className={className}
      onClick={onClick}
    />
  );
};
export default Iconsax;
