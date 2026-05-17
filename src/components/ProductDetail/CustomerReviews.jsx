import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

import React from "react";
import ReviewCard from "./ReviewCard";

const CustomerReviews = ({
  reviews,
  totalReviews,
  averageRating,
  navigate,
  product,
}) => {
  return (
    <Box mb={20}>
      <HStack justify="space-between" mb={8}>
        <Box>
          <Text fontSize="4xl">Customer Reviews</Text>

          <Text>
            {totalReviews} Reviews · Average Rating {averageRating}
          </Text>
        </Box>

        <Button
          variant="outline_gold"
          onClick={() => navigate(`/products/${product.id}/review`)}
        >
          Write Review
        </Button>
      </HStack>

      <VStack spacing={6} align="stretch">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </VStack>
    </Box>
  );
};

export default React.memo(CustomerReviews);
