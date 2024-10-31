import { Flex, Grid } from "@mantine/core";
import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";

const Displaylayout = () => {
  return (
    <Container fluid className={classes.container}>
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
            <Outlet />
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Displaylayout;
