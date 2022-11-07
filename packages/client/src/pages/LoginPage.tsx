import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@project1-chat-app/shared";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState<User | string>("");
  const [password, setPassword] = useState<User | string>("");
  const [errorText, setErrorText] = useState<string>("");

  const navigate = useNavigate();

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then((data: any) => {
        const token = data.data;
        localStorage.setItem("jwt", token);
        navigate("/home");
      })
      .catch((e: any) => {
        setErrorText(e.response.data);
      });
  };

  return (
    <Flex
      bg="gray.300"
      align="center"
      justify="center"
      h="100vh"
      flexDir="column"
    >
      <Text fontSize="3xl" mb={10}>
        Login to see your todos!
      </Text>
      <Box bg="white" p={6} pr={12} pl={12} rounded="md">
        <form onSubmit={handleOnSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="text">Username</FormLabel>
              <Input
                id="user"
                placeholder="Username"
                name="user"
                type="text"
                variant="filled"
                onChange={(e) => setUsername(e.target.value)}
                value={username as string}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                value={password as string}
              />
              {errorText && (
                <Text fontSize="15px" color="red">
                  {errorText}
                </Text>
              )}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
            <Text>
              Not a user?{" "}
              <Link color="teal.500" href="/register">
                Click here to register.
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
