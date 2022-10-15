import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Navbar from "../components/Navbar";
import ProductInput from "../components/ProductInput";
import { useQuery } from "react-query";
import { queryClient } from "./_app";

type DecodedProps = {
  userId: string;
  name: string;
  email: string;
};

type ProductProps = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const Home: NextPage = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    userid: "",
    name: "",
    email: "",
  });

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/token");
      setToken(res.data.accessToken);
      const decoded = jwtDecode<DecodedProps>(res.data.accessToken);
      setUser({
        userid: decoded.userId,
        name: decoded.name,
        email: decoded.email,
      });
    } catch (error: any) {}
  };
  useEffect(() => {
    refreshToken();
  });

  const fetchDataProduct = async () => {
    const { data } = await axios.get("http://localhost:5000/product");
    return data;
  };

  const { data, isLoading, isFetching } = useQuery<ProductProps[]>(
    "product",
    fetchDataProduct
  );

  const handlerDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      await queryClient.prefetchQuery(["product"]);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.lg">
        <ProductInput />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} mt="3rem" spacing={10}>
          {isLoading || (isFetching && <Spinner />)}
          {data?.map((items) => (
            <Box
              key={items._id}
              p="0.5rem"
              textAlign="center"
              border="1px solid rgba(0,0,0,0.3)"
              shadow="2px 2px 3px rgba(0,0,0,0.4)"
              bg="teal.600"
              borderRadius="3xl"
            >
              <Image
                src={items.image}
                alt="image"
                w="full"
                borderRadius="3xl"
              />
              <Heading fontSize="1.3rem" fontWeight="semibold" mt="1rem">
                {items.title}
              </Heading>
              <Text color="gray.300" mt="0.5rem" fontSize="0.7rem">
                {items.description}
              </Text>
              <Flex
                justify="space-between"
                alignItems="center"
                gap="2rem"
                mt="1rem"
              >
                <Button w="full" colorScheme="orange">
                  Edit
                </Button>
                <Button
                  w="full"
                  onClick={() => handlerDelete(items._id)}
                  colorScheme="purple"
                >
                  Hapus
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Home;
