import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { createProduct, updateProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProductForm({ selectedProduct, onSuccess }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((s) => s.product);

  const getInitialState = () => ({
    name: "",
    short_description: "",
    category: "",
    subcategory: "",
    product_type: "",
    grade: "",
    origin: "",
    scent: "",
    purpose: "",
    sustainability: "",
    tags: [],
    bead_count: "",
    bead_size: "",
    rating: "",
    variants: [],
  });

  const [form, setForm] = useState(getInitialState());

  // ================= PREFILL =================
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name || "",
        short_description: selectedProduct.short_description || "",
        category: selectedProduct.category || "",
        subcategory: selectedProduct.subcategory || "",
        product_type: selectedProduct.product_type || "",
        grade: selectedProduct.grade || "",
        origin: selectedProduct.origin || "",
        scent: selectedProduct.scent || "",
        purpose: selectedProduct.purpose || "",
        sustainability: selectedProduct.sustainability || "",
        bead_count: selectedProduct.bead_count || "",
        bead_size: selectedProduct.bead_size || "",
        tags: selectedProduct.tags ? [selectedProduct.tags] : [],
        rating: selectedProduct.rating || "",
        variants: selectedProduct.variants || [],
      });
    }
  }, [selectedProduct]);

  // ================= HANDLERS =================
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // VARIANTS HANDLING
  const handleVariantChange = (index, key, value) => {
    setForm((prev) => {
      const updatedVariants = prev.variants.map((v, i) =>
        i === index ? { ...v, [key]: value } : v
      );

      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          label: "",
          size: "",
          price: "",
          stock: "",
          low_stock_threshold: "",
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    const updated = form.variants.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const payload = {
      ...form,
      rating: Number(form.rating),
      tags: form.tags.length > 0 ? form.tags[0] : "",
      variants: form.variants.map((v) => ({
        ...v,
        price: Number(v.price),
        stock: Number(v.stock),
        low_stock_threshold: Number(v.low_stock_threshold),
      })),
    };

    try {
      if (selectedProduct) {
        await dispatch(
          updateProduct({ id: selectedProduct.id, data: payload })
        ).unwrap();
      } else {
        await dispatch(createProduct(payload)).unwrap();
      }

      // ✅ RESET FORM AFTER SUCCESS
      setForm(getInitialState());

      // ✅ CLEAR EDIT MODE (IMPORTANT)
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // ✅ SAFE LOADING STATE
  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Spinner size="xl" color="brand.400" />
      </Flex>
    );
  }

  return (
    <Box bg="white" p={6} borderRadius="2xl" boxShadow="lg" color="oud.800">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Product Info
        </Text>
        <Input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Textarea
          placeholder="Short Description"
          value={form.short_description}
          onChange={(e) => handleChange("short_description", e.target.value)}
        />
        <Select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">Category</option>
          <option value="AGARWOOD">Agarwood</option>
          <option value="SANDALWOOD">Sandalwood</option>
        </Select>
        <Select
          value={form.subcategory}
          onChange={(e) => handleChange("subcategory", e.target.value)}
        >
          <option value="">Subcategory</option>
          <option value="RED">Red</option>
          <option value="WHITE">White</option>
        </Select>
        <Select
          value={form.product_type}
          onChange={(e) => handleChange("product_type", e.target.value)}
        >
          <option value="">Product Type</option>
          <option value="BRACELET">Bracelet</option>
          <option value="MALA">Mala</option>
          <option value="OIL">Oil</option>
          <option value="CHIPS">Chips</option>
          <option value="POWDER">Powder</option>
        </Select>
        <Select
          value={form.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
        >
          <option value="">Origin</option>
          <option value="ASSAM">Assam</option>
          <option value="KERALA">Kerala</option>
        </Select>
        <Input
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => handleChange("grade", e.target.value)}
        />
        <Input
          placeholder="Scent"
          value={form.scent}
          onChange={(e) => handleChange("scent", e.target.value)}
        />
        <Input
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => handleChange("purpose", e.target.value)}
        />
        <Input
          placeholder="Sustainability"
          value={form.sustainability}
          onChange={(e) => handleChange("sustainability", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Bead Count"
          value={form.bead_count}
          onChange={(e) => handleChange("bead_count", e.target.value)}
        />

        <Select
          value={form.bead_size}
          onChange={(e) => handleChange("bead_size", e.target.value)}
        >
          <option value="Bead Size">Bead Size</option>
          <option value="8">8mm</option>
          <option value="10">10mm</option>
          <option value="12">12mm</option>
        </Select>

        {/* TAGS */}
        <CheckboxGroup
          value={form.tags}
          onChange={(val) => handleChange("tags", val)}
        >
          <HStack>
            <Checkbox value="BESTSELLER">Best Seller</Checkbox>
            <Checkbox value="NEW_ARRIVAL">New Arrival</Checkbox>
            <Checkbox value="MOST_DEMANDING">Most Demanding</Checkbox>
          </HStack>
        </CheckboxGroup>
        <Input
          type="number"
          placeholder="Rating"
          value={form.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
        />
        {/* ================= VARIANTS ================= */}
        <Divider />
        <Text fontSize="xl" fontWeight="bold">
          Variants
        </Text>
        {form.variants.map((variant, index) => (
          <Box key={index} p={4} border="1px solid #eee" borderRadius="lg">
            <VStack spacing={3}>
              <Input
                placeholder="Label (e.g. Small, Medium, Large)"
                value={variant.label}
                onChange={(e) =>
                  handleVariantChange(index, "label", e.target.value)
                }
              />

              <Input
                placeholder="Size"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
              />

              <Input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
              />

              <Input
                type="number"
                placeholder="Low Stock Threshold"
                value={variant.low_stock_threshold}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "low_stock_threshold",
                    e.target.value
                  )
                }
              />

              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => removeVariant(index)}
              />
            </VStack>
          </Box>
        ))}
        <Button leftIcon={<AddIcon />} onClick={addVariant}>
          Add Variant
        </Button>
        <Button
          variant="gold"
          w="full"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText={selectedProduct ? "Updating..." : "Creating..."}
        >
          {selectedProduct ? "Update Product" : "Create Product"}
        </Button>
      </VStack>
    </Box>
  );
}
