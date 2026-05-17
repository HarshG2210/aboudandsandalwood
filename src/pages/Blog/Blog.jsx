import {
  Box,
  Container,
  Grid,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchBlogs } from "../../store/slices/blogSlice";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Blogs() {
  const dispatch = useDispatch();

  const { blogs, loading } = useSelector((s) => s.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg="#faf7f2" minH="100vh" py={24}>
      <Container maxW="1400px">
        {/* HEADER */}

        <VStack spacing={4} mb={20}>
          <Text
            fontSize={{ base: "5xl", md: "7xl" }}
            fontWeight="300"
            textAlign="center"
            fontFamily="'Cormorant Garamond', serif"
          >
            Journal & Stories
          </Text>

          <Text
            color="gray.500"
            textAlign="center"
            maxW="700px"
            lineHeight="2"
          >
            Explore deep insights, fragrance rituals,
            oud craftsmanship and sandalwood stories.
          </Text>
        </VStack>

        {/* BLOGS */}

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
          }}
          gap={10}
        >
          {blogs.map((blog, index) => (
            <MotionBox
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <Link to={`/blogs/${blog.id}`}>
                <Box
                  bg="white"
                  borderRadius="3xl"
                  overflow="hidden"
                  boxShadow="0 15px 60px rgba(0,0,0,0.06)"
                  transition="0.3s"
                  _hover={{
                    transform: "translateY(-8px)",
                  }}
                >
                  <Image
                    src={blog.images?.[0]}
                    h="280px"
                    w="100%"
                    objectFit="cover"
                  />

                  <Box p={8}>
                    <HStack
                      justify="space-between"
                      mb={4}
                    >
                      <Text
                        fontSize="sm"
                        color="gray.500"
                      >
                        {blog.author?.username}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="gray.500"
                      >
                        {new Date(
                          blog.created_at
                        ).toLocaleDateString()}
                      </Text>
                    </HStack>

                    <Text
                      fontSize="3xl"
                      lineHeight="1.2"
                      mb={4}
                      fontFamily="'Cormorant Garamond', serif"
                    >
                      {blog.title}
                    </Text>

                    <Text
                      color="gray.600"
                      lineHeight="1.9"
                      noOfLines={3}
                    >
                      {blog.paragraphs?.[0]}
                    </Text>

                    <HStack mt={6} spacing={5}>
                      <Text fontSize="sm">
                        ❤️ {blog.likes_count}
                      </Text>

                      <Text fontSize="sm">
                        💬 {blog.comments?.length}
                      </Text>
                    </HStack>
                  </Box>
                </Box>
              </Link>
            </MotionBox>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}