import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import {
  closeCart,
  removeCartItem,
  selectCartItemsWithTotal,
  selectCartOpen,
  selectCartTotal,
  updateCartItem,
} from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { useCurrency } from "../../hooks/useCurrency";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItemsWithTotal);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectCartOpen);
  const { symbol, currency } = useCurrency();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => dispatch(closeCart())}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent bg="ivory">
        <DrawerCloseButton />
        <DrawerHeader borderBottom="1px solid" borderColor="brand.100">
          <HStack>
            <FiShoppingBag color="var(--chakra-colors-brand-400)" />
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontWeight="400"
              fontSize="xl"
            >
              Your Bag ({items.length})
            </Text>
          </HStack>
        </DrawerHeader>
        <DrawerBody py={6}>
          {items.map((item) => (
            <Box key={item.id}>
              <HStack align="start" spacing={4}>
                <Image
                  src={
                    item.product_detail?.images?.[0]?.image ||
                    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200"
                  }
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                />

                <VStack align="start" flex={1} spacing={1}>
                  <Text fontSize="md" fontWeight="500">
                    {item.product_detail?.name}
                  </Text>

                  {item.variant_detail && (
                    <Badge bg="brand.50" color="brand.600" fontSize="9px">
                      {item.variant_detail.label}
                    </Badge>
                  )}

                  {/* ✅ PRICE PER ITEM */}
                  <Text fontSize="sm" color="brand.500" fontWeight="600">
                    {symbol}
                    {item.itemTotal.toLocaleString()}
                  </Text>

                  {/* OPTIONAL BREAKDOWN */}
                  <Text fontSize="xs" color="gray.500">
                    {symbol}
                    {Number(item.variant_detail?.price).toLocaleString()} ×{" "}
                    {item.quantity}
                  </Text>

                  {/* QUANTITY CONTROLS */}
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FiMinus />}
                      size="xs"
                      onClick={() =>
                        item.quantity > 1
                          ? dispatch(
                              updateCartItem({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          : dispatch(removeCartItem(item.id))
                      }
                    />

                    <Text>{item.quantity}</Text>

                    <IconButton
                      icon={<FiPlus />}
                      size="xs"
                      onClick={() =>
                        dispatch(
                          updateCartItem({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    />

                    <IconButton
                      icon={<FiTrash2 />}
                      size="xs"
                      color="red.400"
                      onClick={() => dispatch(removeCartItem(item.id))}
                    />
                  </HStack>
                </VStack>
              </HStack>

              <Divider mt={4} />
            </Box>
          ))}
        </DrawerBody>
        {items.length > 0 && (
          <DrawerFooter
            borderTop="1px solid"
            borderColor="brand.100"
            flexDir="column"
            gap={3}
          >
            <HStack justify="space-between" w="full">
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                color="oud.600"
              >
                Subtotal
              </Text>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="xl"
                fontWeight="500"
              >
                {symbol}
                {total.toLocaleString()}
              </Text>
            </HStack>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              color="oud.400"
              textAlign="center"
            >
              Shipping & taxes calculated at checkout
            </Text>
            <Button
              variant="gold"
              w="full"
              size="lg"
              as={Link}
              to="/checkout"
              onClick={() => dispatch(closeCart())}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outline_gold"
              w="full"
              size="sm"
              as={Link}
              to="/products"
              onClick={() => dispatch(closeCart())}
            >
              Continue Shopping
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
