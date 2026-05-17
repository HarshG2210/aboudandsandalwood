import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiWhatsappLine } from "react-icons/ri";
import Select from "react-select";
import { sendContactMessage } from "../../store/slices/contactSlice";

// ============================================
// COUNTRY OPTIONS
// ============================================

const COUNTRY_OPTIONS = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AU", label: "Australia" },
  { value: "BD", label: "Bangladesh" },
  { value: "BE", label: "Belgium" },
  { value: "BR", label: "Brazil" },
  { value: "CA", label: "Canada" },
  { value: "CN", label: "China" },
  { value: "DK", label: "Denmark" },
  { value: "EG", label: "Egypt" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "HK", label: "Hong Kong" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "KE", label: "Kenya" },
  { value: "KW", label: "Kuwait" },
  { value: "LB", label: "Lebanon" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "MX", label: "Mexico" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NG", label: "Nigeria" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "QA", label: "Qatar" },
  { value: "RU", label: "Russia" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SG", label: "Singapore" },
  { value: "ZA", label: "South Africa" },
  { value: "KR", label: "South Korea" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "TH", label: "Thailand" },
  { value: "TR", label: "Turkey" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "VN", label: "Vietnam" },
  { value: "YE", label: "Yemen" },
];

// ============================================
// SUBJECT OPTIONS
// ============================================

const SUBJECT_OPTIONS = [
  {
    value: "product_enquiry",
    label: "Product Enquiry",
  },
  {
    value: "bulk_order",
    label: "Bulk Order",
  },
  {
    value: "custom_gifting",
    label: "Custom Gifting",
  },
  {
    value: "shipping_query",
    label: "Shipping Query",
  },
  {
    value: "authentication",
    label: "Authentication",
  },
  {
    value: "partnership",
    label: "Partnership",
  },
  {
    value: "other",
    label: "Other",
  },
];

const Contact = () => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { loading } = useSelector((s) => s.contact);

  const bg = useColorModeValue("ivory", "gray.900");

  const inputBg = useColorModeValue("white", "gray.800");

  // ============================================
  // FORM STATE
  // ============================================

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: null,
    subject: null,
    message: "",
  });

  // ============================================
  // REACT SELECT STYLES
  // ============================================

  const selectStyles = useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        minHeight: "48px",
        borderRadius: "12px",
        borderColor: state.isFocused
          ? "#b7791f"
          : "#e2d8c7",
        boxShadow: "none",
        background: inputBg,
        cursor: "text",

        "&:hover": {
          borderColor: "#b7791f",
        },
      }),

      menu: (base) => ({
        ...base,
        zIndex: 9999,
      }),

      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
          ? "#f7f0e6"
          : "white",
        color: "#2d2d2d",
        cursor: "pointer",
      }),

      singleValue: (base) => ({
        ...base,
        color: "#2d2d2d",
      }),

      input: (base) => ({
        ...base,
        color: "#2d2d2d",
      }),

      placeholder: (base) => ({
        ...base,
        color: "#8b8b8b",
      }),
    }),
    [inputBg]
  );

  // ============================================
  // SUBMIT
  // ============================================

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

    try {
      // ============================================
      // PAYLOAD WITH DJANGO CHOICE VALUES
      // ============================================

      const payload = {
        name: form.name,
        email: form.email,

        // send country code like "IN"
        country: form.country?.value || "IN",

        // send subject value like "product_enquiry"
        subject:
          form.subject?.value || "product_enquiry",

        message: form.message,
      };

      await dispatch(sendContactMessage(payload)).unwrap();

      toast({
        title: "Message sent successfully ✨",
        description: "We will contact you soon.",
        status: "success",
        duration: 3000,
        position: "top",
      });

      // RESET
      setForm({
        name: "",
        email: "",
        country: null,
        subject: null,
        message: "",
      });
    } catch (err) {
      console.log(err);

      toast({
        title: "Failed to send message",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <Box bg={bg} pt={24} pb={24}>
      {/* HERO */}
      <Box
        bg="oud.900"
        py={16}
        mb={16}
        position="relative"
      >
        <VStack
          textAlign="center"
          spacing={3}
          px={4}
        >
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
            fontSize={{
              base: "4xl",
              md: "6xl",
            }}
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
            Questions about our products?
            Custom orders? We'd love to hear
            from you.
          </Text>
        </VStack>
      </Box>

      {/* CONTENT */}
      <Box
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 10 }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1fr 1.6fr",
          }}
          gap={12}
        >
          {/* LEFT INFO */}
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
                Whether you're placing a bulk
                order, asking about a
                product's authenticity, or
                exploring custom gifting for
                your business — our team
                responds within 24 hours.
              </Text>
            </Box>

            {[
              {
                icon: FiMail,
                label: "Email",
                value:
                  "hello@aboudandsandalwood.com",
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
                value:
                  "Nagpur, Maharashtra, India",
              },
            ].map((item) => (
              <HStack
                key={item.label}
                spacing={4}
                align="start"
              >
                <Box
                  p={3}
                  bg="brand.50"
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <item.icon
                    size={18}
                    color="var(--chakra-colors-brand-500)"
                  />
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
          </VStack>

          {/* FORM */}
          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="brand.100"
          >
            <VStack spacing={5}>
              {/* NAME + EMAIL */}
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={4}
                w="full"
              >
                <FormControl isRequired>
                  <FormLabel
                    fontSize="xs"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Name
                  </FormLabel>

                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your name"
                    borderColor="brand.200"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "none",
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel
                    fontSize="xs"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Email
                  </FormLabel>

                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }))
                    }
                    placeholder="your@email.com"
                    borderColor="brand.200"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "none",
                    }}
                  />
                </FormControl>
              </SimpleGrid>

              {/* COUNTRY + SUBJECT */}
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={4}
                w="full"
              >
                {/* COUNTRY */}
                <FormControl>
                  <FormLabel
                    fontSize="xs"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Country
                  </FormLabel>

                  <Select
                    options={COUNTRY_OPTIONS}
                    value={form.country}
                    onChange={(selected) =>
                      setForm((f) => ({
                        ...f,
                        country: selected,
                      }))
                    }
                    placeholder="Search country..."
                    isSearchable
                    styles={selectStyles}
                  />
                </FormControl>

                {/* SUBJECT */}
                <FormControl>
                  <FormLabel
                    fontSize="xs"
                    textTransform="uppercase"
                    color="oud.600"
                  >
                    Subject
                  </FormLabel>

                  <Select
                    options={SUBJECT_OPTIONS}
                    value={form.subject}
                    onChange={(selected) =>
                      setForm((f) => ({
                        ...f,
                        subject: selected,
                      }))
                    }
                    placeholder="Select topic"
                    isSearchable={false}
                    styles={selectStyles}
                  />
                </FormControl>
              </SimpleGrid>

              {/* MESSAGE */}
              <FormControl isRequired>
                <FormLabel
                  fontSize="xs"
                  textTransform="uppercase"
                  color="oud.600"
                >
                  Message
                </FormLabel>

                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      message: e.target.value,
                    }))
                  }
                  rows={5}
                  resize="vertical"
                  placeholder="Tell us how we can help you..."
                  borderColor="brand.200"
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "none",
                  }}
                />
              </FormControl>

              {/* BUTTON */}
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
                fontSize="xs"
                color="oud.400"
                textAlign="center"
              >
                We respond to all enquiries
                within 24 business hours
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;