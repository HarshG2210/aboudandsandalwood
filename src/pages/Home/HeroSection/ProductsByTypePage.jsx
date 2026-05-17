import {
  Box,
  Container,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import ProductCard from "../../../components/ui/ProductCard";
import { fetchHeroSectionsWebsite } from "../../../store/slices/heroWebsiteSlice";
import { fetchProductsByType } from "../../../store/slices/productTypeSlice";
import { useParams } from "react-router-dom";

export default function ProductsByTypePage() {
  const { type } = useParams();

  const dispatch = useDispatch();

  const { loading, products } = useSelector((s) => s.productType);

  console.log("products", products);

  const { banners } = useSelector((s) => s.heroWebsite);

  console.log("banners", banners);

  useEffect(() => {
    dispatch(fetchProductsByType(type));

    if (!banners.length) {
      dispatch(fetchHeroSectionsWebsite());
    }
  }, [dispatch, type]);

  const currentBanner = useMemo(() => {
    return banners.find((b) => b.product_type === type);
  }, [banners, type]);

  if (loading) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box>
      {/* HERO */}

      <Box
        position="relative"
        h={{ base: "400px", md: "600px" }}
        overflow="hidden"
      >
        <Image src={currentBanner?.image} w="100%" h="100%" objectFit="cover" />

        <Box position="absolute" inset={0} bg="rgba(0,0,0,0.45)" />

        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          direction="column"
          textAlign="center"
          px={6}
        >
          <Text
            fontSize={{ base: "4xl", md: "7xl" }}
            color="white"
            fontWeight="800"
          >
            {type}
          </Text>

          <Text mt={4} color="whiteAlpha.800" maxW="600px" fontSize="lg">
            Explore premium handcrafted spiritual collections.
          </Text>
        </Flex>
      </Box>

      {/* PRODUCTS */}

      <Container maxW="1600px" py={16}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap={8}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
