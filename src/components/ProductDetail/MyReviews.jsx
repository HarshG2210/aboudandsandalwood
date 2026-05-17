import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";

import ReviewCard from "./ReviewCard";

const MyReviews = ({ userReviews, product, navigate }) => {
  const filteredReviews = useMemo(() => {
    return userReviews.filter(
      (review) => String(review.product) === String(product.id)
    );
  }, [userReviews, product.id]);

  return (
    <Box mb={20}>
      <HStack justify="space-between" mb={8}>
        <Box>
          <Text fontSize="4xl">My Reviews</Text>

          <Text>Reviews submitted by you</Text>
        </Box>
      </HStack>

      {filteredReviews.length === 0 ? (
        <Box textAlign="center">
          <Text>You haven't reviewed this product yet</Text>

          <Button
            mt={5}
            variant="gold"
            onClick={() => navigate(`/products/${product.id}/review`)}
          >
            Write Review
          </Button>
        </Box>
      ) : (
        <VStack spacing={6} align="stretch">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default React.memo(MyReviews);
