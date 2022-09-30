import React, { useEffect, useState } from "react";
import User from "@project1-chat-app/shared";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link
} from "@chakra-ui/react";


export default function LoginPage() {
  const [username, setUsername] = useState<User | String>("")
  const [email, setEmail] = useState<User | String>("")
  const [password, setPassword] = useState<User | String>("")
  const [errorText, setErrorText] = useState<User | undefined>()

  const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const payload = {username, email, password}
    console.log(payload)
}
  

  return (
    <Flex bg="gray.300" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} pr={12} pl={12} rounded="md">
      <form onSubmit={handleOnSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
            <FormLabel htmlFor="text">Username</FormLabel>
              <Input
                id="user"
                name="user"
                type="text"
                variant="filled"
                onChange={(e) => setUsername(e.target.value)}
                // value={username}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                // value={email}
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
                // value={password}
              />
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
            <Text>
              Not a user? {' '}
              <Link color='teal.500' href='/register'>
                Click here to register.
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
