import React, { useState } from "react";
import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { register } from "../features/formSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  email: string;
  password: string;
};

const LoginUser: React.FC = () => {
  const [error, setError] = useState("");
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { register: registerForm, handleSubmit } = useForm<Props>();

  const onSubmitForm = async (data: Props) => {
    try {
      await axios
        .post("http://localhost:5000/login", {
          email: data.email,
          password: data.password,
        })
        .then(() => push("/dahsboard"));
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl gap="0.8rem" display="flex" flexDir="column" mt="1.3rem">
        <Input
          placeholder="Email"
          type="email"
          {...registerForm("email", { required: true })}
        />
        <Input
          placeholder="Password"
          type="password"
          {...registerForm("password", { required: true })}
        />
        <Button bg="tea" type="submit" _hover={{ bg: "green.400" }}>
          Login
        </Button>
        <Text
          color="gray.300"
          cursor="pointer"
          onClick={() => dispatch(register())}
        >
          belum punya akun?
        </Text>
        <Text color="red.500">{error}</Text>
      </FormControl>
    </form>
  );
};

export default LoginUser;
