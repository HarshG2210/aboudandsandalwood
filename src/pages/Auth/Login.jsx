import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const bg = useColorModeValue("ivory", "gray.900");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  // ================= VALIDATION =================
  const validate = () => {
    const e = {};

    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";

    if (!form.password) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ================= HANDLE =================
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await auth.login({
        email: form.email,
        password: form.password,
      });

      navigate("/");
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      // toast handled in service
    }
  };

  // ================= UI =================
  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={10}
        borderRadius="2xl"
        border="1px solid"
        borderColor="brand.100"
        w="full"
        maxW="420px"
        boxShadow="xl"
      >
        <VStack spacing={6}>
          <VStack spacing={1} textAlign="center">
            <Text fontSize="3xl" color="oud.900">
              Welcome Back
            </Text>
            <Text fontSize="xs" color="oud.500">
              Login to your account
            </Text>
          </VStack>
          {/* Email */}
          <FormControl isInvalid={errors.email}>
            <FormLabel fontSize="xs">Email</FormLabel>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          {/* Password */}
          <FormControl isInvalid={errors.password}>
            <FormLabel fontSize="xs">Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <InputRightElement>
                <IconButton
                  icon={show ? <FiEyeOff /> : <FiEye />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setShow(!show)}
                  aria-label="toggle password"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            variant="gold"
            w="full"
            onClick={handleLogin}
            isLoading={auth.loadingLogin}
          >
            Login
          </Button>
          <Text fontSize="xs">
            Don’t have an account?{" "}
            <span
              style={{ color: "#B8882F", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Text>

          <Text
            fontSize="xs"
            cursor="pointer"
            color="brand.400"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
