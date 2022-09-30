import { Box, Avatar, Flex } from "@chakra-ui/react";
import Post from "@project1-chat-app/shared";

export const Feed = ({ post, error }: { post: Post[]; error?: string }) => {
  if (error) {
    return <div>{error}</div>;
  } else if (post) {
    return (
      <Box width="50%">
        {post.map((item) => {
          return (
            <Flex mt="5" p="1">
              <Avatar
                name="Anna Rylander"
                src="https://bit.ly/broken-link"
                size="xs"
                bg="purple"
              />
              <Box
                bg="gray.100"
                borderRadius="md"
                p="1"
                w="100%"
                ml="2"
                fontWeight="semibold"
                fontSize="xs"
                color="gray.500"
              >
                <p>{item.text}</p>
              </Box>
            </Flex>
          );
        })}
      </Box>
    );
  } else {
    return <div>"No posts yet"</div>;
  }
};
