import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { deleteProduct, fetchProductById } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const parseTags = (tags) => {
  if (!tags) return [];
  try {
    if (typeof tags === "string" && tags.startsWith("[")) {
      return JSON.parse(tags);
    }
    return Array.isArray(tags) ? tags : [tags];
  } catch {
    return [];
  }
};

export default function AdminProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, loading } = useSelector((s) => s.product);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading || !singleProduct) {
    return (
      <Flex justify="center" align="center" h="80vh" bg="gray.50">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Flex>
    );
  }

  // Handle up to 5 images
  const images = singleProduct.images?.slice(0, 5) || [];
  const mainImage =
    images[selectedImageIndex]?.image || "https://via.placeholder.com/600x600";

  const tags = parseTags(singleProduct.tags);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(singleProduct.id));
      navigate("/admin/products");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/products?edit=${singleProduct.id}`);
  };

  // Helper function to determine stock status
  const getStockStatus = (variant) => {
    if (!variant) return { status: "In Stock", colorScheme: "green" };

    const stock = Number(variant.stock) || 0;
    const threshold = Number(variant.low_stock_threshold) || 0;

    if (stock <= threshold) {
      return { status: "Low Stock", colorScheme: "red" };
    }
    return { status: "In Stock", colorScheme: "green" };
  };

  return (
    <Box p={{ base: 6, lg: 10 }} bg="gray.50" minH="100vh">
      <Box maxW="1400px" mx="auto">
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          mb={8}
          flexWrap="wrap"
          gap={4}
        >
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.800"
              letterSpacing="tight"
            >
              {singleProduct.name}
            </Text>
            <HStack mt={2}>
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  colorScheme="green"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {tag}
                </Badge>
              ))}
            </HStack>
          </Box>

          <HStack>
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              size="lg"
              onClick={handleEdit}
              shadow="md"
            >
              Edit Product
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              size="lg"
              variant="solid"
              onClick={handleDelete}
              shadow="md"
            >
              Delete
            </Button>
          </HStack>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", lg: "7fr 5fr" }}
          gap={{ base: 8, lg: 12 }}
        >
          {/* ==================== IMAGE GALLERY ==================== */}
          <VStack align="stretch" spacing={6}>
            <Box
              position="relative"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="2xl"
              bg="white"
            >
              <Image
                src={mainImage}
                alt={singleProduct.name}
                w="100%"
                h={{ base: "420px", md: "520px" }}
                objectFit="cover"
                transition="transform 0.4s ease"
                _hover={{ transform: "scale(1.04)" }}
              />
              <Box
                position="absolute"
                top={4}
                right={4}
                bg="whiteAlpha.900"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="bold"
                shadow="md"
              >
                {selectedImageIndex + 1} / {Math.max(images.length, 1)}
              </Box>
            </Box>

            {images.length > 1 && (
              <SimpleGrid columns={5} spacing={4}>
                {images.map((img, idx) => (
                  <Box
                    key={idx}
                    borderRadius="xl"
                    overflow="hidden"
                    cursor="pointer"
                    border="3px solid"
                    borderColor={
                      selectedImageIndex === idx ? "brand.500" : "transparent"
                    }
                    transition="all 0.2s"
                    onClick={() => setSelectedImageIndex(idx)}
                    _hover={{
                      borderColor: "brand.400",
                      transform: "scale(1.05)",
                    }}
                  >
                    <Image
                      src={img.image}
                      alt={`View ${idx + 1}`}
                      h="100px"
                      w="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </VStack>

          {/* ==================== PRODUCT DETAILS ==================== */}
          <VStack align="stretch" spacing={8}>
            {/* Price & Rating */}
            <Flex justify="space-between" align="flex-end" wrap="wrap" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  STARTING FROM
                </Text>
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="1"
                >
                  ₹
                  {Math.min(
                    ...(singleProduct.variants?.map((v) => Number(v.price)) || [
                      0,
                    ])
                  )}
                </Text>
              </Box>

              <HStack>
                <Flex align="center" gap={1}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      color={
                        i < Math.floor(singleProduct.rating || 0)
                          ? "yellow.400"
                          : "gray.300"
                      }
                      boxSize={6}
                    />
                  ))}
                </Flex>
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  ml={2}
                  color="gray.600"
                >
                  {singleProduct.rating || "4.8"}
                </Text>
              </HStack>
            </Flex>

            <Text color="gray.600" fontSize="lg" lineHeight="tall">
              {singleProduct.short_description}
            </Text>

            <Divider />

            {/* Key Specifications */}
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
              {[
                { label: "Category", value: singleProduct.category },
                {
                  label: "Subcategory",
                  value: singleProduct.subcategory || "—",
                },
                { label: "Type", value: singleProduct.product_type },
                { label: "Origin", value: singleProduct.origin },
                { label: "Grade", value: singleProduct.grade },
                { label: "Scent", value: singleProduct.scent },
                { label: "Purpose", value: singleProduct.purpose },
                {
                  label: "Sustainability",
                  value: singleProduct.sustainability,
                },
                { label: "Bead Count", value: singleProduct.bead_count },
                { label: "Bead Size", value: `${singleProduct.bead_size} mm` },
              ].map((item, i) => (
                <Box key={i} bg="white" p={4} borderRadius="2xl" shadow="sm">
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    mb={1}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {item.label}
                  </Text>
                  <Text fontWeight="semibold" fontSize="lg" color="gray.800">
                    {item.value}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            <Divider />

            {/* Variants Section */}
            <Box>
              <Text fontSize="2xl" fontWeight="bold" mb={5} color="gray.800">
                Available Variants
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {singleProduct.variants?.length === 0 ? (
                  <Text color="gray.600">No variants available</Text>
                ) : (
                  singleProduct.variants.map((variant) => {
                    const { status, colorScheme } = getStockStatus(variant);

                    return (
                      <Box
                        key={variant.id}
                        bg="white"
                        p={6}
                        borderRadius="2xl"
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.100"
                        transition="all 0.3s"
                        _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                      >
                        <Flex justify="space-between" align="start" mb={4}>
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="gray.800"
                          >
                            {variant.label}
                          </Text>
                          <Badge
                            colorScheme={colorScheme}
                            px={4}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            {status}
                          </Badge>
                        </Flex>

                        <HStack justify="space-between" mb={3}>
                          <Box>
                            <Text color="gray.500" fontSize="sm">
                              Price
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="bold"
                              color="gray.800"
                            >
                              ₹{variant.price}
                            </Text>
                          </Box>
                          <Box textAlign="right">
                            <Text color="gray.500" fontSize="sm">
                              Stock
                            </Text>
                            <Text
                              fontSize="xl"
                              fontWeight="semibold"
                              color="gray.800"
                            >
                              {variant.stock}
                            </Text>
                          </Box>
                        </HStack>

                        <Text color="gray.600" fontSize="sm">
                          Size: <strong>{variant.size}</strong>
                        </Text>
                        <Text color="gray.500" fontSize="xs" mt={2}>
                          Threshold: {variant.low_stock_threshold}
                        </Text>
                      </Box>
                    );
                  })
                )}
              </SimpleGrid>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}
