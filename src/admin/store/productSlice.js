import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { productService } from "../services/productService";
import { toast } from "react-toastify";

// ================= THUNKS =================

// CREATE
export const createProduct = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await productService.createProduct(payload);
      return res;
    } catch (err) {
      console.error("❌ CREATE PRODUCT:", err);
      return rejectWithValue(err?.detail || "Create failed");
    }
  }
);

// FETCH ALL
export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await productService.getProducts();
      "🔥 FETCH PRODUCTS:", res;
      return res;
    } catch (err) {
      console.error("❌ FETCH PRODUCTS ERROR:", err);
      return rejectWithValue(err?.detail || "Fetch failed");
    }
  }
);

// FETCH SINGLE
export const fetchProductById = createAsyncThunk(
  "product/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await productService.getProductById(id);
      "🔥 SINGLE PRODUCT:", res;
      return res;
    } catch (err) {
      console.error("❌ FETCH ONE ERROR:", err);
      return rejectWithValue(err?.detail || "Fetch product failed");
    }
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await productService.updateProduct(id, data);
      return res;
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err);
      return rejectWithValue(err?.detail || "Update failed");
    }
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      return rejectWithValue(err?.detail || "Delete failed");
    }
  }
);
// BULK UPLOAD
export const bulkUploadProducts = createAsyncThunk(
  "product/bulkUpload",
  async (file, { rejectWithValue }) => {
    try {
      const res = await productService.bulkUploadProducts(file);
      return res;
    } catch (err) {
      console.error("❌ BULK UPLOAD ERROR:", err);
      return rejectWithValue(err?.detail || "Bulk upload failed");
    }
  }
);

// Upload single image
export const uploadProductImage = createAsyncThunk(
  "product/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      return await productService.uploadProductImage(formData);
    } catch (err) {
      return rejectWithValue(err?.detail || "Upload failed");
    }
  }
);

export const updateProductImage = createAsyncThunk(
  "product/updateImage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await productService.updateProductImage(id, formData);
    } catch (err) {
      return rejectWithValue(err?.detail || "Update failed");
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "product/deleteImage",
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProductImage(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.detail || "Delete failed");
    }
  }
);

// ================= SLICE =================

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    singleProduct: null,

    loading: false,

    error: null,
  },

  reducers: {
    // ✅ CLEAR SINGLE PRODUCT (VERY IMPORTANT)
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= FETCH ALL =================
      .addCase(fetchProducts.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;

        s.products = Array.isArray(a.payload)
          ? a.payload
          : a.payload?.results || [];

        "FINAL PRODUCTS:", s.products;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        toast.error(a.payload);
      })

      // ================= FETCH ONE =================
      .addCase(fetchProductById.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.loading = false;
        s.singleProduct = a.payload;
      })
      .addCase(fetchProductById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        toast.error(a.payload);
      })

      // ================= CREATE =================
      .addCase(createProduct.pending, (s) => {
        s.loading = true;
      })
      .addCase(createProduct.fulfilled, (s, a) => {
        s.loading = false;

        if (Array.isArray(s.products)) {
          s.products.unshift(a.payload);
        }

        toast.success("Product created successfully ");
      })
      .addCase(createProduct.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })

      // ================= UPDATE =================
      .addCase(updateProduct.pending, (s) => {
        s.loading = true;
      })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.loading = false;

        const index = s.products.findIndex((p) => p.id === a.payload.id);

        if (index !== -1) {
          s.products[index] = a.payload;
        }

        s.singleProduct = a.payload;

        toast.success("Product updated successfully ");
      })
      .addCase(updateProduct.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })

      // ================= DELETE =================
      .addCase(deleteProduct.pending, (s) => {
        s.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.loading = false;

        s.products = s.products.filter((p) => p.id !== a.payload);

        // ✅ clear detail if deleted
        if (s.singleProduct?.id === a.payload) {
          s.singleProduct = null;
        }

        toast.success("Product deleted 🗑️");
      })
      .addCase(deleteProduct.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })

      // Bulk upload
      .addCase(bulkUploadProducts.pending, (s) => {
        s.loading = true;
      })
      .addCase(bulkUploadProducts.fulfilled, (s, a) => {
        s.loading = false;

        // backend may return created products list
        if (Array.isArray(a.payload)) {
          s.products = [...a.payload, ...s.products];
        }

        toast.success("Bulk upload successful 🚀");
      })
      .addCase(bulkUploadProducts.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })
      // ================= IMAGE UPLOAD =================
      .addCase(uploadProductImage.pending, (s) => {
        s.loading = true;
      })
      .addCase(uploadProductImage.fulfilled, (s, a) => {
        s.loading = false;

        const newImage = a.payload;

        // find product and push image
        const product = s.products.find((p) => p.id === newImage.product);
        if (product) {
          if (!product.images) product.images = [];
          product.images.push(newImage);
        }

        // sync single product
        if (s.singleProduct?.id === newImage.product) {
          if (!s.singleProduct.images) s.singleProduct.images = [];
          s.singleProduct.images.push(newImage);
        }

        toast.success("Image uploaded 📸");
      })
      .addCase(uploadProductImage.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })

      // ================= IMAGE UPDATE =================
      .addCase(updateProductImage.pending, (s) => {
        s.loading = true;
      })
      .addCase(updateProductImage.fulfilled, (s, a) => {
        s.loading = false;

        const updatedImage = a.payload;

        // update in products list
        s.products.forEach((p) => {
          if (!p.images) return;

          const index = p.images.findIndex((img) => img.id === updatedImage.id);
          if (index !== -1) {
            p.images[index] = updatedImage;
          }
        });

        // update single product
        if (s.singleProduct?.images) {
          const index = s.singleProduct.images.findIndex(
            (img) => img.id === updatedImage.id
          );
          if (index !== -1) {
            s.singleProduct.images[index] = updatedImage;
          }
        }

        toast.success("Image updated ✏️");
      })
      .addCase(updateProductImage.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      })

      // ================= IMAGE DELETE =================
      .addCase(deleteProductImage.pending, (s) => {
        s.loading = true;
      })
      .addCase(deleteProductImage.fulfilled, (s, a) => {
        s.loading = false;

        const deletedId = a.payload;

        // remove from products
        s.products.forEach((p) => {
          if (!p.images) return;
          p.images = p.images.filter((img) => img.id !== deletedId);
        });

        // remove from single product
        if (s.singleProduct?.images) {
          s.singleProduct.images = s.singleProduct.images.filter(
            (img) => img.id !== deletedId
          );
        }

        toast.success("Image deleted 🗑️");
      })
      .addCase(deleteProductImage.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      });
  },
});

// ================= EXPORTS =================
export const { clearSingleProduct } = productSlice.actions;

export default productSlice.reducer;
