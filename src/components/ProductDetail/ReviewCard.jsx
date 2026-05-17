import { Badge, Box, HStack, Image, Text } from "@chakra-ui/react";

import { FiStar } from "react-icons/fi";
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
    >
      <HStack justify="space-between" mb={4}>
        <Box>
          <Text fontWeight="700">{review.user_detail?.username}</Text>

          <Text fontSize="sm" color="gray.500">
            {new Date(review.created_at).toLocaleDateString()}
          </Text>
        </Box>

        {review.is_verified_purchase && (
          <Badge colorScheme="green">Verified Purchase</Badge>
        )}
      </HStack>

      <HStack mb={3}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            size={14}
            fill={i < review.rating ? "var(--chakra-colors-brand-400)" : "none"}
            color="var(--chakra-colors-brand-400)"
          />
        ))}
      </HStack>

      <Text fontWeight="700" mb={2}>
        {review.title}
      </Text>

      <Text mb={4}>{review.description}</Text>

      {review.images?.length > 0 && (
        <HStack spacing={3} flexWrap="wrap">
          {review.images.map((img) => (
            <Image
              key={img.id}
              src={img.image}
              w="90px"
              h="90px"
              objectFit="cover"
              borderRadius="lg"
            />
          ))}
        </HStack>
      )}
    </Box>
  );
};

export default React.memo(ReviewCard);
