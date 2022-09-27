import React, { useEffect, useState } from "react";
import Post from "@project1-chat-app/shared";
import axios from "axios";
import {
  Input,
  Container,
  Button,
  Box,
  Heading,
  Flex,
  VStack,
} from "@chakra-ui/react";

axios.defaults.baseURL = "http://localhost:4000";

const fetchPosts = async () => {
  const response = await axios.get<Post>("/posts");
  return response.data;
};

export default function HomePage() {
  const [post, setPost] = useState<Post | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchPosts()
      .then(setPost)
      .catch((error) => {
        setPost(undefined);
        setError("Something went wrong");
      });
  }, []);

  return (
    <Flex bg="gray.300" justify="center" h="100vh">
      <Container m={8}>
        <VStack spacing={4} align="flex-start">
          <Heading>Welcome </Heading>
          <Input bg="white" placeholder="Write something" />
          <Button type="submit" colorScheme="purple" width="" p={4}>
            Send
          </Button>
          <Box color="gray.500" fontWeight="semibold" fontSize="s">
            {post ? post.text : error ? error : "No posts yet"}
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
}
