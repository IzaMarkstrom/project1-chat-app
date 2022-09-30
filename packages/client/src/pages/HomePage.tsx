import { useEffect, useState } from "react";
import Post from "@project1-chat-app/shared";
import axios from "axios";
import {
  Input,
  Container,
  Button,
  Heading,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Feed } from "../components/Feed";
import { PostInput } from "../components/PostInput";

axios.defaults.baseURL = "http://localhost:4000";

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>("/posts");
  return response.data;
};

export default function HomePage() {
  const [post, setPost] = useState<Post[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [newPost, setNewPost] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const createPost = async (newPost: string): Promise<void> => {
    const message: Post = {
      text: newPost,
      author: author,
      timeStamp: new Date(),
      id: post.length + 1,
    };

    try {
      await axios.post("/posts", message);
      const response = await axios.get<Post[]>("/posts");
      setPost(response.data);
      console.log(response.data);
    } catch (err) {
      setPost([]);
      setError("Something went wrong...");
    } finally {
      setNewPost("");
    }
  };

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
      <Container m={8}>
        <VStack spacing={4} align="flex-start">
          <Heading>Welcome </Heading>
          <PostInput
            newPost={newPost}
            setNewPost={setNewPost}
            createPost={createPost}
            author={author}
            setAuthor={setAuthor}
          />
          <Feed post={post} error={error} />
        </VStack>
      </Container>
    </Flex>
  );
}
