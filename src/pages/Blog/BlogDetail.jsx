import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiUser,
} from "react-icons/fi";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addComment,
  fetchSingleBlog,
  likeBlog,
} from "../../store/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const MotionBox = motion(Box);

export default function BlogDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const toast = useToast();

  const {
    singleBlog: blog,
    singleLoading,
    commentLoading,
  } = useSelector((s) => s.blog);

  const [comment, setComment] = useState("");

  // =========================================
  // FETCH BLOG
  // =========================================

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  // =========================================
  // YOUTUBE EMBED
  // =========================================

  const embedUrl = useMemo(() => {
    if (!blog?.video_link) return null;

    if (blog.video_link.includes("youtu.be")) {
      const videoId = blog.video_link
        .split("/")
        .pop()
        .split("?")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    return blog.video_link.replace(
      "watch?v=",
      "embed/"
    );
  }, [blog]);

  // =========================================
  // COMMENT
  // =========================================

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await dispatch(
        addComment({
          blogId: id,
          content: comment,
        })
      ).unwrap();

      setComment("");

      toast({
        title: "Comment Added",
        status: "success",
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Failed to add comment",
        status: "error",
        position: "top",
      });
    }
  };

  // =========================================
  // LIKE
  // =========================================

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (singleLoading || !blog) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#faf7f2"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      bg="#faf7f2"
      minH="100vh"
      py={{ base: 24, md: 32 }}
    >
      <Container maxW="1000px">
        {/* HERO IMAGE */}

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box
            borderRadius="3xl"
            overflow="hidden"
            mb={10}
            boxShadow="0 25px 80px rgba(0,0,0,0.08)"
          >
            <Image
              src={blog.images?.[0]}
              h={{ base: "300px", md: "500px" }}
              w="100%"
              objectFit="cover"
            />
          </Box>
        </MotionBox>

        {/* TITLE */}

        <VStack
          spacing={5}
          align="start"
          mb={14}
        >
          <Text
            fontSize={{
              base: "4xl",
              md: "6xl",
            }}
            lineHeight="1"
            fontWeight="300"
            color="gray.800"
            fontFamily="'Cormorant Garamond', serif"
          >
            {blog.title}
          </Text>

          {/* META */}

          <HStack
            spacing={6}
            flexWrap="wrap"
          >
            <HStack>
              <Icon as={FiUser} />

              <Text color="gray.600">
                {blog.author?.username}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FiCalendar} />

              <Text color="gray.600">
                {new Date(
                  blog.created_at
                ).toLocaleDateString()}
              </Text>
            </HStack>
          </HStack>

          {/* ACTIONS */}

          <HStack spacing={4}>
            <Button
              leftIcon={<FiHeart />}
              borderRadius="full"
              bg="black"
              color="white"
              _hover={{
                transform: "translateY(-2px)",
              }}
              onClick={handleLike}
            >
              {blog.likes_count} Likes
            </Button>

            <Button
              leftIcon={<FiMessageCircle />}
              variant="outline"
              borderRadius="full"
            >
              {blog.comments?.length} Comments
            </Button>
          </HStack>
        </VStack>

        {/* CONTENT */}

        <VStack
          spacing={10}
          align="stretch"
        >
          {blog.paragraphs?.map((para, index) => (
            <Text
              key={index}
              fontSize="lg"
              lineHeight="2.2"
              color="gray.700"
              fontWeight="400"
            >
              {para}
            </Text>
          ))}
        </VStack>

        {/* GALLERY */}

        {blog.images?.length > 0 && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
            spacing={6}
            mt={20}
          >
            {blog.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                borderRadius="2xl"
                h="320px"
                w="100%"
                objectFit="cover"
                boxShadow="lg"
              />
            ))}
          </SimpleGrid>
        )}

        {/* VIDEO */}

        {embedUrl && (
          <Box mt={20}>
            <Text
              mb={6}
              fontSize="3xl"
              fontFamily="'Cormorant Garamond', serif"
            >
              Watch Video
            </Text>

            <Box
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="0 20px 60px rgba(0,0,0,0.08)"
            >
              <iframe
                width="100%"
                height="500"
                src={embedUrl}
                title="Blog Video"
                allowFullScreen
              />
            </Box>
          </Box>
        )}

        {/* COMMENTS */}

        <Box mt={24}>
          <Text
            fontSize="4xl"
            mb={10}
            fontFamily="'Cormorant Garamond', serif"
          >
            Comments
          </Text>

          {/* ADD COMMENT */}

          <HStack
            align="start"
            mb={10}
          >
            <Input
              placeholder="Write your thoughts..."
              bg="white"
              h="60px"
              borderRadius="full"
              value={comment}
              color="black"
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <Button
              h="60px"
              px={8}
              borderRadius="full"
              bg="black"
              color="white"
              leftIcon={<FiSend />}
              onClick={handleComment}
              isLoading={commentLoading}
            >
              Post
            </Button>
          </HStack>

          {/* COMMENT LIST */}

          <VStack
            spacing={6}
            align="stretch"
          >
            {blog.comments?.length === 0 ? (
              <Box
                bg="white"
                p={10}
                borderRadius="2xl"
                textAlign="center"
              >
                <Text color="gray.500">
                  No comments yet
                </Text>
              </Box>
            ) : (
              blog.comments.map((c) => (
                <Box
                  key={c.id}
                  bg="white"
                  p={6}
                  borderRadius="2xl"
                  boxShadow="sm"
                >
                  <HStack
                    align="start"
                    spacing={4}
                  >
                    <Avatar
                      name={
                        c.user?.username
                      }
                    />

                    <Box flex={1}>
                      <HStack
                        justify="space-between"
                        mb={2}
                      >
                        <Text
                          fontWeight="700"
                          color="gray.800"
                        >
                          {
                            c.user
                              ?.username
                          }
                        </Text>

                        <Text
                          fontSize="sm"
                          color="gray.500"
                        >
                          {new Date(
                            c.created_at
                          ).toLocaleDateString()}
                        </Text>
                      </HStack>

                      <Divider mb={3} />

                      <Text
                        color="gray.700"
                        lineHeight="1.8"
                      >
                        {c.content}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}