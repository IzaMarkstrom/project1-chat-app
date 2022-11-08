import React from "react";
import { Box, Avatar, Flex, Text } from "@chakra-ui/react";
import { Post } from "@project1-chat-app/shared";
import moment from "moment";

export const Feed = ({ post, error }: { post: Post[]; error?: string }) => {
  if (error) {
    return <div>{error}</div>;
  } else if (post) {
    return (
      <Box width="50%" mb="10" mt="10">
        {post.map((item) => {
          return (
            <Box key={item.id}>
              <Flex mt="5" p="1" fontSize="md">
                <Box>
                  <Avatar
                    name={item.authorName}
                    src="https://bit.ly/broken-link"
                    size="xs"
                    bg="purple"
                  />
                </Box>
                <Box
                  bg="gray.100"
                  borderRadius="md"
                  p="1"
                  w="100%"
                  ml="2"
                  fontWeight="semibold"
                  fontSize="xs"
                  color="gray.500"
                  display="flex"
                  justifyContent="space-between"
                >
                  <p>{item.text}</p>
                </Box>
              </Flex>
              <Text fontSize="xs" color="gray.400" ml="2">
                {moment(item.timeStamp).fromNow()}
              </Text>
            </Box>
          );
        })}
      </Box>
    );
  } else {
    return (
      <div>
        <p>No posts yet</p>
      </div>
    );
  }
};
