import React from "react";
import { Input, Button } from "@chakra-ui/react";

export const PostInput = ({
  newPost,
  setNewPost,
  createPost,
}: {
  newPost: string;
  setNewPost: (text: string) => void;
  createPost: (text: string) => void;
}) => {
  return (
    <>
      <Input
        bg="gray.100"
        placeholder="Write something"
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <Button
        type="submit"
        colorScheme="purple"
        size="sm"
        p={4}
        onClick={() => createPost(newPost)}
      >
        Send
      </Button>
    </>
  );
};
