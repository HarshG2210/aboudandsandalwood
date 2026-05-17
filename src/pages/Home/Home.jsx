import { Box, useColorModeValue } from "@chakra-ui/react";

import Collection from "./Collection";
import CtaStrip from "./CtaStrip";
import FeaturedProducts from "./FeaturedProducts";
import HeroSection from "./HeroSection/HeroSection";
import MiddleEastSpotlight from "./MiddleEastSpotlight";
import TIickerMarquee from "./TIickerMarquee";
import Testimonials from "./Testimonials";
import TrustPillars from "./TrustPillars";

export default function Home() {
  const bg = useColorModeValue("ivory", "gray.900");

  return (
    <Box bg={bg}>
      <HeroSection />
      <TIickerMarquee />
      <Collection />
      <FeaturedProducts />
      <TrustPillars />
      <MiddleEastSpotlight />
      <Testimonials />
      <CtaStrip />
    </Box>
  );
}
