import {
    Box,
    Button,
    Grid,
    HStack,
    Input,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import {
    createAddress,
    deleteAddress,
    fetchAddresses,
} from "../../store/slices/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AddressPage() {
    const dispatch = useDispatch();
    const { addresses, loading } = useSelector((s) => s.address);
  
    const [form, setForm] = useState({
      full_name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      phone: "",
      is_default: false,
    });
  
    useEffect(() => {
      dispatch(fetchAddresses());
    }, [dispatch]);
  
    const handleChange = (k, v) =>
      setForm((p) => ({ ...p, [k]: v }));
  
    const handleSubmit = async () => {
      await dispatch(createAddress(form));
      setForm({
        full_name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
        is_default: false,
      });
    };
  
    if (loading) {
      return <Spinner size="xl" />;
    }
  
    return (
      <Box p={8} bg="gray.50" minH="100vh">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          My Addresses
        </Text>
  
        {/* FORM */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="md" mb={8}>
          <VStack spacing={3}>
            <Input placeholder="Full Name" value={form.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)} />
  
            <Input placeholder="Address Line 1" value={form.line1}
              onChange={(e) => handleChange("line1", e.target.value)} />
  
            <Input placeholder="Address Line 2" value={form.line2}
              onChange={(e) => handleChange("line2", e.target.value)} />
  
            <HStack w="full">
              <Input placeholder="City"
                onChange={(e) => handleChange("city", e.target.value)} />
              <Input placeholder="State"
                onChange={(e) => handleChange("state", e.target.value)} />
            </HStack>
  
            <HStack w="full">
              <Input placeholder="Postal Code"
                onChange={(e) => handleChange("postal_code", e.target.value)} />
              <Input placeholder="Country"
                onChange={(e) => handleChange("country", e.target.value)} />
            </HStack>
  
            <Input placeholder="Phone"
              onChange={(e) => handleChange("phone", e.target.value)} />
  
            <Button colorScheme="purple" onClick={handleSubmit} w="full">
              Add Address
            </Button>
          </VStack>
        </Box>
  
        {/* LIST */}
        <Grid templateColumns="repeat(auto-fill,minmax(280px,1fr))" gap={6}>
          {addresses.map((a) => (
            <Box key={a.id} bg="white" p={5} borderRadius="xl" boxShadow="sm">
              <Text fontWeight="bold">{a.full_name}</Text>
              <Text fontSize="sm">{a.line1}</Text>
              <Text fontSize="sm">{a.line2}</Text>
              <Text fontSize="sm">
                {a.city}, {a.state} - {a.postal_code}
              </Text>
              <Text fontSize="sm">{a.country}</Text>
              <Text fontSize="sm">📞 {a.phone}</Text>
  
              <Button
                mt={3}
                size="sm"
                colorScheme="red"
                onClick={() => dispatch(deleteAddress(a.id))}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>
    );
  }
  
  