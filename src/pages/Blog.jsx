// Blog.jsx
import React from "react";
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
const MotionBox = motion(Box);
const posts = [
  {
    id: 1,
    title: "What Makes Assam Agarwood the Finest in the World",
    category: "Education",
    date: "Dec 2024",
    read: "6 min",
    excerpt:
      "The unique climate of Assam's Brahmaputra valley, combined with specific mold species, creates oleoresin concentrations unmatched anywhere on Earth.",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df3e3f6?w=700",
  },
  {
    id: 2,
    title: "How to Use a Japa Mala: A Beginner's Complete Guide",
    category: "Spiritual",
    date: "Nov 2024",
    read: "8 min",
    excerpt:
      "The mala is more than prayer beads — it is a technology of consciousness. Learn the traditional method of japa meditation passed down through Vedic lineages.",
    image: "https://images.unsplash.com/photo-1609198093478-2e6bca3e3c75?w=700",
  },
  {
    id: 3,
    title: "Oud in Arabic Culture: From Ancient Trade Routes to Modern Luxury",
    category: "Heritage",
    date: "Oct 2024",
    read: "10 min",
    excerpt:
      "How agarwood traveled from South Asia's forests to become the most sought-after fragrance material in Arabia — a 2,000-year story.",
    image: "https://images.unsplash.com/photo-1591981563701-81c0e7f4ad4f?w=700",
  },
  {
    id: 4,
    title: "The Difference Between Agarwood Grades: A to C Explained",
    category: "Education",
    date: "Sep 2024",
    read: "5 min",
    excerpt:
      "Grade A, AA, Super Grade — what do these actually mean? Our master grader explains the oleoresin content, visual markers, and scent characteristics of each tier.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700",
  },
  {
    id: 5,
    title: "Mysore Sandalwood: Why It Is the Most Regulated Wood in India",
    category: "Heritage",
    date: "Aug 2024",
    read: "7 min",
    excerpt:
      "Karnataka's sandalwood (Santalum album) is classified as a government property. Here is the full story of its protection and why it matters.",
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=700",
  },
  {
    id: 6,
    title: "Kodo: Japan's Ancient Art of Listening to Fragrance",
    category: "Spiritual",
    date: "Jul 2024",
    read: "9 min",
    excerpt:
      'In Japan, you do not smell incense — you "listen" to it. Explore the 600-year-old practice of Kodo and why Indian agarwood is at its heart.',
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df3e3f6?w=700",
  },
];
const catColors = {
  Education: "blue",
  Spiritual: "purple",
  Heritage: "orange",
};
const Blog = () => {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg} pt={24} pb={24}>
      <Box
        bg="oud.900"
        py={16}
        mb={16}
        position="relative"
        bgImage="url('https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1200')"
        bgSize="cover"
        bgPosition="center"
      >
        <Box position="absolute" inset={0} bg="rgba(30,21,3,0.88)" />
        <VStack position="relative" textAlign="center" spacing={3} px={4}>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="brand.400"
          >
            The Atelier Journal
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="300"
            color="white"
          >
            Journal & Heritage
          </Text>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            color="rgba(255,255,255,0.65)"
            maxW="400px"
          >
            Stories from the forest, fragrance wisdom, and the spiritual
            traditions we serve.
          </Text>
        </VStack>
      </Box>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {posts.map((post, i) => (
            <MotionBox
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Box
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                border="1px solid"
                borderColor="brand.100"
                _hover={{
                  boxShadow: "0 8px 40px rgba(138,109,77,0.12)",
                  transform: "translateY(-4px)",
                }}
                transition="all 0.3s"
                cursor="pointer"
              >
                <Box h="220px" overflow="hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.5s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>
                <VStack align="start" spacing={3} p={6}>
                  <HStack justify="space-between" w="full">
                    <Badge
                      colorScheme={catColors[post.category]}
                      fontFamily="'Jost', sans-serif"
                      fontSize="9px"
                      letterSpacing="0.1em"
                    >
                      {post.category}
                    </Badge>
                    <HStack spacing={1} color="oud.400">
                      <FiClock size={11} />
                      <Text fontFamily="'Jost', sans-serif" fontSize="10px">
                        {post.read} read
                      </Text>
                    </HStack>
                  </HStack>
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="xl"
                    fontWeight="400"
                    color="oud.900"
                    lineHeight="1.25"
                    noOfLines={2}
                  >
                    {post.title}
                  </Text>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    color="oud.500"
                    lineHeight="1.8"
                    noOfLines={3}
                  >
                    {post.excerpt}
                  </Text>
                  <HStack pt={2} color="brand.500">
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      letterSpacing="0.1em"
                    >
                      Read More
                    </Text>
                    <FiArrowRight size={12} />
                  </HStack>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Blog;
