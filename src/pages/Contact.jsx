import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const bg = useColorModeValue("ivory", "gray.900");
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Please fill required fields",
        status: "warning",
        duration: 3000,
        position: "top",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "We'll reply within 24 hours.",
        status: "success",
        duration: 3000,
        position: "top",
      });
      setForm({ name: "", email: "", country: "", subject: "", message: "" });
    }, 1400);
  };
  return (
    <Box bg={bg} pt={24} pb={24}>
      <Box bg="oud.900" py={16} mb={16} position="relative">
        <VStack textAlign="center" spacing={3} px={4}>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="brand.400"
          >
            Get In Touch
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="300"
            color="white"
          >
            Contact Us
          </Text>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            color="rgba(255,255,255,0.65)"
          >
            Questions about our products? Custom orders? We'd love to hear from
            you.
          </Text>
        </VStack>
      </Box>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 10 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }} gap={12}>
          {/* Info */}
          <VStack align="start" spacing={8}>
            <Box>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="3xl"
                fontWeight="300"
                color="oud.900"
                mb={4}
              >
                We'd love to hear from you
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                color="oud.600"
                lineHeight="2"
              >
                Whether you're placing a bulk order, asking about a product's
                authenticity, or exploring custom gifting for your business —
                our team responds within 24 hours.
              </Text>
            </Box>
            {[
              {
                icon: FiMail,
                label: "Email",
                value: "hello@aboudandsandalwood.com",
              },
              {
                icon: RiWhatsappLine,
                label: "WhatsApp (India)",
                value: "+91 98765 43210",
              },
              {
                icon: FiPhone,
                label: "International",
                value: "+91 98765 43210",
              },
              {
                icon: FiMapPin,
                label: "Registered Office",
                value: "Nagpur, Maharashtra, India",
              },
            ].map((item) => (
              <HStack key={item.label} spacing={4} align="start">
                <Box p={3} bg="brand.50" borderRadius="lg" flexShrink={0}>
                  <item.icon size={18} color="var(--chakra-colors-brand-500)" />
                </Box>
                <Box>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="brand.400"
                    mb={1}
                  >
                    {item.label}
                  </Text>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    color="oud.700"
                  >
                    {item.value}
                  </Text>
                </Box>
              </HStack>
            ))}
            <Box pt={4}>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.400"
                mb={3}
              >
                Business Hours
              </Text>
              <VStack align="start" spacing={1}>
                {[
                  ["Monday – Saturday", "10:00 AM – 7:00 PM IST"],
                  ["Sunday", "Email only"],
                  ["WhatsApp", "24/7 for urgentorders"],
                ].map(([day, time]) => (
                  <HStack key={day} spacing={4}>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.500"
                      minW="150px"
                    >
                      {day}
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.700"
                    >
                      {time}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </VStack>
          {/* Form */}
          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="brand.100"
          >
            <VStack spacing={5}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Name
                  </FormLabel>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                    placeholder="Your name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                    placeholder="your@email.com"
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl>
                  <FormLabel
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Country
                  </FormLabel>
                  <Select
                    value={form.country}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, country: e.target.value }))
                    }
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                  >
                    <option value="">Select country</option>
                    {[
                      "India",
                      "UAE",
                      "Saudi Arabia",
                      "Qatar",
                      "Japan",
                      "China",
                      "USA",
                      "Canada",
                      "Other",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Subject
                  </FormLabel>
                  <Select
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                  >
                    <option value="">Select topic</option>
                    {[
                      "Product Enquiry",
                      "Bulk Order",
                      "Custom Gifting",
                      "Shipping Query",
                      "Authentication",
                      "Partnership",
                      "Other",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="oud.600"
                >
                  Message
                </FormLabel>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={5}
                  fontFamily="'Jost', sans-serif"
                  fontSize="sm"
                  borderColor="brand.200"
                  _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                  resize="vertical"
                  placeholder="Tell us how we can help you..."
                />
              </FormControl>

              <Button
                variant="gold"
                w="full"
                size="lg"
                leftIcon={<FiSend />}
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Sending..."
              >
                Send Message
              </Button>

              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                color="oud.400"
                textAlign="center"
              >
                We respond to all enquiries within 24 business hours
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;
