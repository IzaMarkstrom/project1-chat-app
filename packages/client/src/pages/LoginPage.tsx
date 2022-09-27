import React, { useEffect, useState } from "react";
import User from "@project1-chat-app/shared";
import axios from "axios";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";


export default function LoginPage() {
  const [username, setUsername] = useState<User | undefined>()
  const [password, setPassword] = useState<User | undefined>()
  const [errorText, setErrorText] = useState<User | undefined>()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  

  return (
    <Flex bg="gray.300" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} pr={12} pl={12} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
            <FormLabel htmlFor="text">Username</FormLabel>
              <Input
                id="user"
                name="user"
                type="text"
                variant="filled"
                // onChange={e => setUsername (e.target.value)}
                value={formik.values.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              Remember me?
            </Checkbox>
            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
