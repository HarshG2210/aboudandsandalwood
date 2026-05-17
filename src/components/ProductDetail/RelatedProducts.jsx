import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import ProductCard from "../ui/ProductCard";
import React from "react";

const RelatedProducts = ({ related }) => {
  if (related.length === 0) return null;

  return (
    <Box>
      <Text
        fontFamily="'Cormorant Garamond', serif"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={8}
      >
        You May Also Like
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default React.memo(RelatedProducts);
