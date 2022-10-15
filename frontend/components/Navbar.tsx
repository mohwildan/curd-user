import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <Flex
      w="full"
      justify="center"
      bg="rgba(32,127,193,0.2)"
      align="center"
      h="80px"
      css={{ backdropFilter: "blur(10px)" }}
    >
      <Flex maxW="container.lg" justify="space-between" p="1rem" mx="auto" w="full" align="center">
        <Heading as="h2">Product</Heading>
        <UnorderedList listStyleType="none" display="flex" gap="1rem">
          <ListItem cursor="pointer">Home</ListItem>
          <ListItem cursor="pointer">About</ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};

export default Navbar;
