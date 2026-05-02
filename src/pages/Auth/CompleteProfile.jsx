import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_picture: null,
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("phone_number", form.phone_number);

      if (form.profile_picture) {
        formData.append("profile_picture", form.profile_picture);
      }

      await auth.completeProfile(formData);

      navigate("/profile");
    } catch (err) {
      console.error("PROFILE ERROR:", err);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="ivory"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={10} borderRadius="xl" w="400px">
        <VStack spacing={5}>
          <Text fontSize="2xl">Complete Profile</Text>

          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type="file"
              onChange={(e) =>
                setForm({ ...form, profile_picture: e.target.files[0] })
              }
            />
          </FormControl>

          <Button
            variant="gold"
            w="full"
            onClick={handleSubmit}
            isLoading={auth.loadingCompleteProfile}
          >
            Save Profile
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
