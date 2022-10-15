import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

type ModalProps = {
  title: string;
  description: string;
  linkImage: string;
};

const ProductInput: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<ModalProps>();

  const onSubmitForm = async (data: ModalProps) => {
    try {
      await axios
        .post("http://localhost:5000/product", {
          title: data.title,
          description: data.description,
          image: data.linkImage,
        })
        .then(() => alert("berhasil terkirim"));
    } catch (error) {
      console.log(error);
    }
  };

  const initialRef = React.useRef(null);
  return (
    <Box display="flex" mt="1rem" justifyContent="center">
      <Button onClick={onOpen} colorScheme="yellow">
        tambahakan product
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Product Kamu</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title", { required: true })}
                  placeholder="title"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  {...register("description", { required: true })}
                  placeholder="description"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Link Image</FormLabel>
                <Input {...register("linkImage")} placeholder="link image" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                onClick={() => onclose}
                colorScheme="pink"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductInput;
