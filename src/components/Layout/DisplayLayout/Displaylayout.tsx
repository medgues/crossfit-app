import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

const Displaylayout = () => {
  return (
    <Container
      fluid
      className="p-0 absolute top-0 left-0 bottom-0 w-[90vw] h-[90vh]"
    >
      <Outlet />
    </Container>
  );
};

export default Displaylayout;
