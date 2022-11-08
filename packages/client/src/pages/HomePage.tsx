import React, { useEffect, useState } from "react";
import { Post } from "@project1-chat-app/shared";
import axios from "axios";
import { Container, Flex, VStack } from "@chakra-ui/react";
import { Feed } from "../components/Feed";
import { PostInput } from "../components/PostInput";
import Logout from "../components/Logout";

axios.defaults.baseURL = "http://localhost:4000";

const fetchPosts = async (): Promise<Post[]> => {
  const token: string | null = localStorage.getItem("jwt");
  const response = await axios.get<Post[]>("/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default function HomePage() {
  const [post, setPost] = useState<Post[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [newPost, setNewPost] = useState<string>("");

  const createPost = async (newPost: string): Promise<void> => {
    const message = {
      text: newPost,
      timeStamp: new Date(),
    };

    try {
      const token: string | null = localStorage.getItem("jwt");
      await axios.post("/posts", message, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await axios.get<Post[]>("/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data);
    } catch (err) {
      setPost([]);
      setError("Something went wrong...");
    } finally {
      setNewPost("");
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchPosts()
  //       .then(setPost)
  //       .catch((error) => {
  //         setPost([]);
  //         setError("Something went wrong");
  //       });
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    fetchPosts()
      .then(setPost)
      .catch((error) => {
        setPost([]);
        setError("Something went wrong");
      });
  }, []);

  return (
    <Flex bg="white" justify="center" h="100vh">
      <Logout />
      <Container m={8}>
        {post && (
          <>
            <Feed post={post} error={error} />
            <VStack spacing={4} align="flex-start">
              <PostInput
                newPost={newPost}
                setNewPost={setNewPost}
                createPost={createPost}
              />
            </VStack>
          </>
        )}
      </Container>
    </Flex>
  );
}
