import { Button, FormControl, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../features/formSlice";
import { FormDataProps } from "../type/reactHookForm";

const RegisterUser: React.FC = () => {
  const { register, handleSubmit } = useForm<FormDataProps>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { push } = useRouter();

  const onFormSubmit = async (data: FormDataProps) => {
    try {
      await axios
        .post("http://localhost:5000/users", {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm_password,
          jenisKelamin: data.gender,
        })
        .then(() => push("/dahsboard"));
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl gap="0.8rem" display="flex" flexDir="column" mt="1.3rem">
        <Input
          placeholder="Name"
          type="text"
          {...register("name", { required: true })}
        />
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <Select {...register("gender", { required: true })}>
          <option>laki-laki</option>
          <option>perempuan</option>
        </Select>
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          {...register("confirm_password", { required: true })}
        />
        <Button bg="tea" type="submit" _hover={{ bg: "green.400" }}>
          Daftar Sekarang
        </Button>
        <Text
          color="gray.300"
          cursor="pointer"
          onClick={() => dispatch(login())}
        >
          sudah punya akun?
        </Text>
        <Text color="red.400">{error}</Text>
      </FormControl>
    </form>
  );
};

export default RegisterUser;
