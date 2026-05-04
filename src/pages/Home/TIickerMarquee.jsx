import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function TIickerMarquee() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* TICKER MARQUEE  */}
      <Box bg="oud.900" py={3} overflow="hidden">
        <MotionBox
          display="flex"
          gap={12}
          animate={{ x: [0, -800] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <HStack key={i} spacing={12} whiteSpace="nowrap">
              {[
                "Agarwood · Oud",
                "Mysore Sandalwood",
                "Grade A Certified",
                "CITES Compliant",
                "Ships Worldwide",
                "India's First Atelier",
              ].map((t) => (
                <HStack key={t} spacing={3}>
                  <Box w="4px" h="4px" borderRadius="full" bg="brand.400" />
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="brand.300"
                  >
                    {t}
                  </Text>
                </HStack>
              ))}
            </HStack>
          ))}
        </MotionBox>
      </Box>
    </Box>
  );
}
