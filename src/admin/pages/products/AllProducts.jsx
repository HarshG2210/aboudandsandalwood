import {
  Badge,
  Box,
  Divider,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

// ✅ helper: get price
const getDisplayPrice = (product) => {
  if (product.variants?.length > 0) {
    return product.variants[0]?.price;
  }
  return product.price || "N/A";
};

// ✅ helper: parse tags
const parseTags = (tags) => {
  if (!tags) return [];

  try {
    if (typeof tags === "string" && tags.startsWith("[")) {
      return JSON.parse(tags);
    }
    return [tags];
  } catch {
    return [];
  }
};

export default function AllProducts({ products }) {
  const navigate = useNavigate();

  // ✅ GROUP BY CATEGORY
  const grouped = products.reduce((acc, product) => {
    const key = product.category || "OTHERS";
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  return (
    <Box p={6}>
      <Text fontSize="3xl" mb={8} fontWeight="bold" color="oud.800">
        All Products
      </Text>

      {Object.entries(grouped).map(([category, items]) => (
        <Box key={category} mb={12}>
          {/* CATEGORY HEADER */}
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="brand.500">
            {category}
          </Text>

          <Divider mb={6} />

          <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={6}>
            {items.map((p) => {
              const img =
                p.images?.find((i) => i.is_primary)?.image ||
                p.images?.[0]?.image ||
                "https://via.placeholder.com/300";

              const tags = parseTags(p.tags);

              return (
                <Box
                  key={p.id}
                  bg="white"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="md"
                  border="1px solid"
                  borderColor="brand.50"
                  cursor="pointer"
                  onClick={() => navigate(`/admin/products/${p.id}`)}
                  _hover={{
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow: "2xl",
                  }}
                  transition="all 0.3s"
                >
                  {/* IMAGE */}
                  <Box position="relative">
                    <Image src={img} h="180px" w="100%" objectFit="cover" />

                    {/* TAG BADGES */}
                    <HStack position="absolute" top="2" left="2">
                      {tags.map((t, i) => (
                        <Badge key={i} colorScheme="green">
                          {t}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>

                  {/* CONTENT */}
                  <VStack align="start" p={4} spacing={2}>
                    <Text fontWeight="bold" color="oud.800" noOfLines={1}>
                      {p.name}
                    </Text>

                    <Text fontSize="sm" color="oud.400" noOfLines={2}>
                      {p.short_description}
                    </Text>

                    <HStack>
                      <Badge colorScheme="purple">{p.category}</Badge>
                      <Badge colorScheme="orange">{p.product_type}</Badge>
                    </HStack>

                    {/* PRICE */}
                    <Text color="green.600" fontWeight="bold">
                      ₹{getDisplayPrice(p)}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
