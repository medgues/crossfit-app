import { Button, Flex, Image, Modal, Text } from "@mantine/core";
import deleteLogo from "../../assets/delete.png";

const DeleteForm = () => {
  return (
    <Modal.Content className="left-0 bottom-0">
      <Modal.Header>
        <Modal.Title>Delete challenger</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        {/* <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}> */}
        <Flex
          justify="center"
          align="center"
          gap="md"
          w="100%"
          px={24}
          mt={16}
          direction="column"
        >
          <div className="w-[250px]">
            <Image src={deleteLogo} alt="image" width="250px" height="250px" />
          </div>
          <Text size="xl" fw={700} w="350px">
            Are you sure that you want to delete this challenger ?
          </Text>
          <Flex
            justify="center"
            align="center"
            gap="md"
            w="100%"
            px={24}
            mt={16}
          >
            <Button
              w="50%"
              color="gray"
              variant="filled"
              className="self-end"
              type="submit"
            >
              No, keep it
            </Button>
            <Button
              w="50%"
              color="red"
              variant="filled"
              className="self-end"
              type="submit"
            >
              Yes, delete
            </Button>
          </Flex>
        </Flex>
        {/* </form> */}
      </Modal.Body>
    </Modal.Content>
  );
};

export default DeleteForm;
