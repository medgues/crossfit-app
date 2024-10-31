import { Button, Flex, Image } from "@mantine/core";
import { FC, useState } from "react";
import Iconsax from "../Iconsax";
import logo from "../../assets/logo.png";
import {
  ROUTE_CHALLENGERS,
  ROUTE_SCOREBOARD,
  ROUTE_TEAMS,
} from "../config/constants";
import classes from "./navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TimerControle from "../ui/timerUi/TimerControle";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../../state/redux-hooks'

const AppBar: FC = () => {
  const data = [
    {
      id: 1,
      label: "CHALLENGERS",
      link: ROUTE_CHALLENGERS,
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
      label: "TEAMS",
      link: ROUTE_TEAMS,
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

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);

  const links = data.map((item) => (
    <a
      className={item.label ? classes.linkOpen : classes.linkClose}
      data-active={item.label === active || item.link === pathname || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Flex
      justify="space-between"
      align="center"
      gap="md"
      w="100%"
      h="3.5rem"
      px={24}
      mt={16}
    >
      <Flex
        justify="space-between"
        align="center"
        gap="md"
        w="100%"
        h="3.5rem"
        px={24}
        mt={16}
      >
        <Image src={logo} alt="Digipay" w={100} />
        <Flex
          justify="left"
          align="center"
          gap="md"
          w="100%"
          h="3.5rem"
          px={24}
          mt={16}
          className={classes.navbarMain}
        >
          {links}
        </Flex>
      </Flex>
      <TimerControle />
      <Button
        variant="primary"
        component="a"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link to={ROUTE_SCOREBOARD} target="_blank" rel="noopener noreferrer">
          Open scoreboard
        </Link>
      </Button>
    </Flex>
  );
};

export default AppBar;
