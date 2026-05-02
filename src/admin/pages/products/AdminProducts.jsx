import {
  Box,
  Button,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AllProducts from "./AllProducts";
import BulkUploadProducts from "./BulkUploadProducts";
import ProductForm from "./ProductForm";
import ProductImageList from "./ProductImageList";
import { fetchProducts } from "../../store/productSlice";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const { products, loading, singleProduct } = useSelector(
    (state) => state.product
  );

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (singleProduct) {
      setSelectedProduct(singleProduct);
    }
  }, [singleProduct]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Spinner size="xl" color="brand.400" />
      </Flex>
    );
  }

  return (
    <Tabs variant="unstyled" isFitted>
      <TabList mb={4}>
        <Tab
          _selected={{
            bg: "brand.400",
            color: "white",
          }}
          color="oud.800"
        >
          Manage Products
        </Tab>

        <Tab
          _selected={{
            bg: "brand.400",
            color: "white",
          }}
          color="oud.800"
        >
          BulkUpload Products{" "}
        </Tab>
        <Tab
          _selected={{
            bg: "brand.400",
            color: "white",
          }}
          color="oud.800"
        >
          Handle Product Images
        </Tab>
        <Tab
          _selected={{
            bg: "brand.400",
            color: "white",
          }}
          color="oud.800"
        >
          All Products
        </Tab>
      </TabList>

      <TabPanels>
        {/* TAB 1 */}
        <TabPanel p={0}>
          <Flex minH="100vh">
            <Box flex="1" p={10} bg="ivory">
              <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="2xl" fontWeight="bold" color="oud.800">
                  {selectedProduct ? "Edit Product " : "Create Product "}
                </Text>

                {selectedProduct && (
                  <Button
                    size="sm"
                    variant="outline_gold"
                    onClick={() => {
                      setSelectedProduct(null);
                    }}
                  >
                    + New Product
                  </Button>
                )}
              </Flex>
              <ProductForm
                selectedProduct={selectedProduct}
                onSuccess={() => setSelectedProduct(null)}
              />
            </Box>
          </Flex>
        </TabPanel>

        {/* TAB 2 */}
        <TabPanel>
          <BulkUploadProducts />
        </TabPanel>

        {/* TAB 3 */}
        <TabPanel>
          <ProductImageList products={products} />
        </TabPanel>

        {/* TAB 4 */}
        <TabPanel>
          <AllProducts products={products} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
