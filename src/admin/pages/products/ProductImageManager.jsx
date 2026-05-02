import {
    Box,
    Button,
    Checkbox,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import {
    deleteProductImage,
    updateProductImage,
    uploadProductImage,
} from "../../store/productSlice";

import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductImageManager({
    isOpen,
    onClose,
    product,
  }) {
    const dispatch = useDispatch();
  
    const [newImages, setNewImages] = useState([]);
  
    const handleUpload = async () => {
      for (let img of newImages) {
        if (!img.file) continue;
  
        const formData = new FormData();
        formData.append("product", product.id);
        formData.append("image", img.file);
        formData.append("is_primary", img.is_primary);
  
        await dispatch(uploadProductImage(formData));
      }
  
      setNewImages([]);
      onClose();
    };
  
    const handleDelete = async (id) => {
      await dispatch(deleteProductImage(id));
    };
  
    const handleReplace = async (id, file) => {
      const formData = new FormData();
      formData.append("image", file);
  
      await dispatch(updateProductImage({ id, formData }));
    };
  
    const addSlot = () => {
      if (newImages.length >= 5) return;
  
      setNewImages((prev) => [
        ...prev,
        { file: null, is_primary: false },
      ]);
    };
  
    const setPrimary = (index) => {
      setNewImages((prev) =>
        prev.map((img, i) => ({
          ...img,
          is_primary: i === index,
        }))
      );
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.name} - Images</ModalHeader>
  
          <ModalBody>
            <VStack spacing={5}>
              {/* EXISTING IMAGES */}
              {product.images?.map((img) => (
                <Box key={img.id} w="100%">
                  <Image src={img.image} h="120px" />
  
                  <HStack mt={2}>
                    <Input
                      type="file"
                      onChange={(e) =>
                        handleReplace(img.id, e.target.files[0])
                      }
                    />
  
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(img.id)}
                    />
                  </HStack>
                </Box>
              ))}
  
              {/* NEW UPLOAD */}
              {newImages.map((img, index) => (
                <Box key={index} w="100%">
                  <Input
                    type="file"
                    onChange={(e) => {
                      const updated = [...newImages];
                      updated[index].file = e.target.files[0];
                      setNewImages(updated);
                    }}
                  />
  
                  {img.file && (
                    <>
                      <Image
                        src={URL.createObjectURL(img.file)}
                        h="100px"
                        mt={2}
                      />
  
                      <Checkbox
                        isChecked={img.is_primary}
                        onChange={() => setPrimary(index)}
                      >
                        Make Primary
                      </Checkbox>
                    </>
                  )}
                </Box>
              ))}
  
              <Button onClick={addSlot}>Add Image</Button>
  
              <Button colorScheme="green" onClick={handleUpload}>
                Upload
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }