import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  Badge,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";

import { FiArrowRight } from "react-icons/fi";
import { fetchHeroSectionsWebsite } from "../../../store/slices/heroWebsiteSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionBox = motion(Box);

export default function HeroSection() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { banners, loading } = useSelector((s) => s.heroWebsite);

  useEffect(() => {
    dispatch(fetchHeroSectionsWebsite());
  }, [dispatch]);

  if (loading) {
    return (
      <Flex h="100vh" justify="center" align="center">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box position="relative">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <Box
              h={{ base: "90vh", md: "100vh" }}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                inset={0}
                bgImage={`url(${banner.image})`}
                bgSize="cover"
                bgPosition="center"
              />

              <Box position="absolute" inset={0} bg="rgba(0,0,0,0.45)" />

              <Flex
                position="relative"
                zIndex={2}
                h="100%"
                align="center"
                px={{ base: 6, md: 16 }}
              >
                <MotionBox
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  maxW="700px"
                >
                  <Badge
                    bg="purple.500"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    mb={5}
                  >
                    LUXURY COLLECTION
                  </Badge>

                  <Text
                    fontSize={{ base: "4xl", md: "7xl" }}
                    color="white"
                    fontWeight="800"
                    lineHeight="1"
                    mb={6}
                  >
                    {banner.product_type}
                    <br />
                    Collection
                  </Text>

                  <Text
                    color="whiteAlpha.800"
                    fontSize={{ base: "md", md: "lg" }}
                    maxW="500px"
                    lineHeight="1.8"
                    mb={10}
                  >
                    Discover handcrafted spiritual luxury products made from
                    authentic agarwood and sandalwood.
                  </Text>

                  <Button
                    size="lg"
                    bg="purple.500"
                    color="white"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: "purple.600",
                    }}
                    onClick={() =>
                      navigate(`/products/type/${banner.product_type}`)
                    }
                  >
                    Explore Collection
                  </Button>
                </MotionBox>
              </Flex>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
