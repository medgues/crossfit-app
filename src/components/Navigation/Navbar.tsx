import { FC, useState } from "react";
import { Paper } from "@mantine/core";

import { useLocation, useNavigate } from "react-router-dom";

import classes from "./navbar.module.css";
import { ROUTE_DAHBOARD, ROUTE_DISPLAY } from "../config/constants";
import Iconsax from "../Iconsax";

interface NavbarProps {
  opened: boolean;
}

const data = [
  {
    id: 1,
    label: "Dashboard",
    link: ROUTE_DAHBOARD,
    icon: (
      <Iconsax
        size={20}
        color="#697D8C"
        variant="Bold"
        name="Lock"
        className={classes.linkIcon}
      />
    ),
  },
  {
    id: 2,
    label: "DIsplay",
    link: ROUTE_DISPLAY,
    icon: (
      <Iconsax
        size={20}
        color="#697D8C"
        variant="Bold"
        name="Profile2User"
        className={classes.linkIcon}
      />
    ),
  },
];
// const secondData = [];

const Navbar: FC<NavbarProps> = ({ opened }) => {
  // const dispatch = useAppDispatch();
  // const matches = useMediaQuery("(max-width: 900px)");
  // useEffect(() => {
  //   if (matches) {
  //     close();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [matches]);

  // const logout = useCallback(() => {
  //   // dispatch(ResetAuthentication());
  // }, [dispatch]);

  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = data.map((item) => (
    <a
      className={opened ? classes.linkOpen : classes.linkClose}
      data-active={item.label === active || item.link === pathname || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      {item.icon}
      <span>{opened ? item.label : ""}</span>
    </a>
  ));

  return (
    <Paper
      className={opened ? classes.navbarOpen : classes.navbarClose}
      shadow="xl"
    >
      <div className={classes.navbarMain}>{links}</div>
    </Paper>
  );
};
export default Navbar;
