import { Box, HStack, Image, VStack } from "@chakra-ui/react";

import React from "react";

const ProductGallery = ({
  product,
  selectedImage,
  setSelectedImage,
  MotionBox,
}) => {
  return (
    <VStack spacing={4}>
      <MotionBox
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        w="full"
      >
        <Box
          borderRadius="2xl"
          overflow="hidden"
          h={{ base: "320px", md: "520px" }}
          bg="white"
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>
      </MotionBox>

      {product.images.length > 1 && (
        <HStack spacing={3}>
          {product.images.map((img, i) => (
            <Box
              key={i}
              w="72px"
              h="72px"
              borderRadius="lg"
              overflow="hidden"
              border="2px solid"
              borderColor={selectedImage === i ? "brand.400" : "transparent"}
              cursor="pointer"
              onClick={() => setSelectedImage(i)}
            >
              <Image src={img} alt="" w="full" h="full" objectFit="cover" />
            </Box>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default React.memo(ProductGallery);
