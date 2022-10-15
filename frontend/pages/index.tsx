import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import LoginUser from "../components/LoginUser";
import RegisterUser from "../components/RegisterUser";
import { RootState } from "../store";

const FormUser: NextPage = () => {
  const form = useSelector((state: RootState) => state.formReducer.value);
  return (
    <Flex h="100vh" w="full" align="center" justify="center">
      <Box mx="auto" maxW="container.md" textAlign="center" h="500px" p="1rem">
        <Heading fontWeight="normal" lineHeight="80px" as="h1" fontSize="64px">
          {form === "login" ? "Masuk" : "Daftar"}
        </Heading>
        <Text fontSize="1rem" mt="1.5rem" lineHeight="20px">
          {`${
            form === "login"
              ? "selamat kembali kawan kami rindu dengan mu"
              : "selamat bergabung dan dapatkan promo menarik"
          } `}
        </Text>
        {form === "register" && <RegisterUser />}
        {form === "login" && <LoginUser />}
      </Box>
    </Flex>
  );
};

export default FormUser;
