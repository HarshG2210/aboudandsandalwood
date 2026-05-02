import {
    Box,
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import { adminLogin } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { loading } = useSelector((s) => s.admin);
  
    const [form, setForm] = useState({
      username: "",
      password: "",
    });
  
    const [showPassword, setShowPassword] = useState(false);
  
    const handle = async () => {
      try {
        await dispatch(adminLogin(form)).unwrap();
        navigate("/admin/dashboard");
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Box bg="white" p={10} borderRadius="xl" boxShadow="lg" w="350px">
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Admin Login
            </Text>
  
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
  
            {/* ✅ PASSWORD FIELD WITH TOGGLE */}
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label="Toggle password visibility"
                />
              </InputRightElement>
            </InputGroup>
  
            <Button
              variant="gold"
              onClick={handle}
              isLoading={loading}
              w="full"
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }