import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FiCamera, FiImage, FiStar, FiUpload } from "react-icons/fi";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { submitReview } from "../../store/slices/reviewSlice";

const MotionBox = motion(Box);

export default function ReviewProduct() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const { loading } = useSelector((s) => s.review);

  // ==========================================
  // STATES
  // ==========================================

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [rating, setRating] = useState(1);

  const [images, setImages] = useState([]);

  // ==========================================
  // COLORS
  // ==========================================

  const bg = useColorModeValue("#f8f5ef", "#111111");

  const cardBg = useColorModeValue("white", "#1b1b1b");

  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const inputBg = useColorModeValue("gray.50", "whiteAlpha.50");

  // ==========================================
  // IMAGE PREVIEW
  // ==========================================

  const imagePreview = useMemo(() => {
    return images.map((img) => ({
      file: img,
      url: URL.createObjectURL(img),
    }));
  }, [images]);

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImages((prev) => {
      const updated = [...prev, ...files];

      // allow only 2 images
      return updated.slice(0, 2);
    });
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async () => {
    if (!title || !description || !rating) {
      toast({
        title: "Please fill all fields",
        status: "warning",
      });

      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);

      formData.append("description", description);

      formData.append("rating", rating);

      images.forEach((img) => {
        formData.append("images", img);
      });

      await dispatch(
        submitReview({
          productId: id,
          data: formData,
        })
      ).unwrap();

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your experience.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/products/${id}`);
    } catch (err) {
      console.error(err);

      toast({
        title: "Failed to submit review",
        status: "error",
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg={bg}
      py={{ base: 24, md: 32 }}
      px={4}
      overflow="hidden"
      position="relative"
    >
      {/* BACKGROUND GLOW */}

      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="350px"
        h="350px"
        bg="brand.100"
        filter="blur(120px)"
        opacity={0.4}
        borderRadius="full"
      />

      <Container maxW="1200px">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 10, lg: 20 }}
          alignItems="center"
        >
          {/* LEFT SIDE */}

          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Text
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="300"
                lineHeight="1"
                fontFamily="'Cormorant Garamond', serif"
                color="oud.900"
                mb={5}
              >
                Share Your
                <Text as="span" color="brand.500">
                  {" "}
                  Experience
                </Text>
              </Text>

              <Text
                color="gray.500"
                fontSize="lg"
                lineHeight="2"
                maxW="500px"
                fontFamily="'Jost', sans-serif"
              >
                Your review helps others discover authentic fragrances and
                premium craftsmanship. Tell us what made this product special
                for you.
              </Text>

              {/* REVIEW PREVIEW CARD */}

              <Box
                mt={14}
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="3xl"
                p={8}
                boxShadow="0 20px 60px rgba(0,0,0,0.06)"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="160px"
                  h="160px"
                  bg="brand.50"
                  borderRadius="full"
                  transform="translate(30%, -30%)"
                />

                <HStack spacing={1} mb={4}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={18}
                      fill={
                        i < rating ? "var(--chakra-colors-brand-400)" : "none"
                      }
                      color="var(--chakra-colors-brand-400)"
                    />
                  ))}
                </HStack>

                <Text fontSize="2xl" fontWeight="600" color="oud.800" mb={2}>
                  {title || "Your review title"}
                </Text>

                <Text color="gray.500" lineHeight="1.9">
                  {description ||
                    "Describe the fragrance, quality, packaging, longevity and your overall experience with this product."}
                </Text>
              </Box>
            </MotionBox>
          </GridItem>

          {/* RIGHT SIDE */}

          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              bg={cardBg}
              borderRadius="3xl"
              p={{ base: 6, md: 10 }}
              border="1px solid"
              borderColor={borderColor}
              boxShadow="0 20px 80px rgba(0,0,0,0.08)"
            >
              <VStack spacing={7} align="stretch">
                {/* TITLE */}

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Review Title
                  </FormLabel>

                  <Input
                    h="58px"
                    borderRadius="xl"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    placeholder="Amazing fragrance..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                {/* DESCRIPTION */}

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Your Experience
                  </FormLabel>

                  <Textarea
                    minH="180px"
                    resize="none"
                    borderRadius="2xl"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    placeholder="Describe your experience with this product..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </FormControl>

                {/* RATING */}

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Rating
                  </FormLabel>

                  <HStack spacing={3}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconButton
                        key={star}
                        icon={
                          <FiStar
                            fill={
                              star <= rating
                                ? "var(--chakra-colors-brand-400)"
                                : "none"
                            }
                          />
                        }
                        onClick={() => setRating(star)}
                        size="lg"
                        borderRadius="full"
                        variant="ghost"
                        fontSize="24px"
                        color={star <= rating ? "brand.400" : "gray.300"}
                        _hover={{
                          transform: "scale(1.08)",
                          bg: "brand.50",
                        }}
                      />
                    ))}
                  </HStack>
                </FormControl>

                {/* IMAGE UPLOAD */}

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Upload Photos
                  </FormLabel>

                  <Box
                    as="label"
                    htmlFor="review-image-upload"
                    border="2px dashed"
                    borderColor="brand.200"
                    borderRadius="2xl"
                    p={10}
                    textAlign="center"
                    bg="brand.50"
                    cursor="pointer"
                    transition="0.3s"
                    _hover={{
                      borderColor: "brand.400",
                      bg: "brand.100",
                    }}
                  >
                    {/* HIDDEN INPUT */}

                    <Input
                      id="review-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      display="none"
                      onChange={handleImageChange}
                    />

                    <VStack spacing={4}>
                      <Box
                        w="70px"
                        h="70px"
                        borderRadius="full"
                        bg="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="lg"
                      >
                        <FiCamera size={28} />
                      </Box>

                      <Box>
                        <Text fontWeight="700" color="oud.800">
                          Upload Review Images
                        </Text>

                        <Text color="gray.500" mt={1}>
                          Click anywhere to upload up to 2 images
                        </Text>
                      </Box>

                      <Button
                        leftIcon={<FiUpload />}
                        variant="outline"
                        borderRadius="full"
                        pointerEvents="none"
                      >
                        Choose Files
                      </Button>
                    </VStack>
                  </Box>
                </FormControl>

                {/* IMAGE PREVIEW */}

                {imagePreview.length > 0 && (
                  <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
                    {imagePreview.map((img, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        position="relative"
                      >
                        <Image
                          src={img.url}
                          h="120px"
                          w="full"
                          objectFit="cover"
                          borderRadius="2xl"
                        />

                        <Button
                          size="xs"
                          position="absolute"
                          top={2}
                          right={2}
                          borderRadius="full"
                          colorScheme="red"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </Button>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                )}

                {/* SUBMIT */}

                <Button
                  h="62px"
                  borderRadius="full"
                  bg="brand.500"
                  color="white"
                  fontSize="md"
                  fontWeight="600"
                  _hover={{
                    bg: "brand.600",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                  transition="0.3s"
                  leftIcon={<FiImage />}
                  onClick={handleSubmit}
                  isLoading={loading}
                >
                  Publish Review
                </Button>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
