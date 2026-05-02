import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { bulkUploadProducts } from "../../store/productSlice";
import { useState } from "react";

export default function BulkUploadProducts() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading } = useSelector((s) => s.product);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    console.log("📂 Selected File:", selected);

    if (!selected) return;

    if (!selected.name.toLowerCase().endsWith(".csv")) {
      toast({
        title: "Invalid file",
        description: "Only CSV files allowed",
        status: "error",
      });
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "warning",
      });
      return;
    }

    try {
      await dispatch(bulkUploadProducts(file)).unwrap();

      toast({
        title: "Upload success 🚀",
        status: "success",
      });

      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Bulk Upload Products (CSV)
        </Text>

        {/* FILE INPUT */}
        <input
          type="file"
          accept=".csv,text/csv,application/vnd.ms-excel"
          onChange={handleFileChange}
        />

        {/* FILE PREVIEW */}
        {file && (
          <Box bg="gray.100" p={3} borderRadius="md">
            <Text fontWeight="bold">Selected File:</Text>
            <Text>Name: {file.name}</Text>
            <Text>Size: {(file.size / 1024).toFixed(2)} KB</Text>
            <Text>Type: {file.type || "unknown"}</Text>
          </Box>
        )}

        <Button
          onClick={handleUpload}
          isLoading={loading}
          loadingText="Uploading..."
          colorScheme="purple"
        >
          Upload CSV
        </Button>
      </VStack>
    </Box>
  );
}
