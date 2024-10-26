import "@mantine/core/styles.css";
import { Flex, Grid, Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

import classes from "./Layout.module.css";
import AppBar from "../../Navigation/AppBar";

const MainLayout = () => {
  return (
    <Container fluid my="md" className={classes.container}>
      <Grid className={classes.container}>
        <Grid.Col span="auto">
          <Flex
            w="auto"
            className={classes.flexContent}
            gap="sm"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="nowrap"
          >
            <AppBar />
            <Outlet />
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default MainLayout;
