import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  Button,
  Box,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartOpen,
} from "../../store/slices/cartSlice";
import { useCurrency } from "../../hooks/useCurrency";
export default function CartDrawer() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
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
          {items.length === 0 ? (
            <VStack justify="center" h="full" spacing={4} color="oud.400">
              <FiShoppingBag size={48} />
              <Text fontFamily="'Cormorant Garamond', serif" fontSize="xl">
                Your bag is empty
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                textAlign="center"
              >
                Discover our rare agarwood and sandalwood collection
              </Text>
              <Button
                variant="gold"
                onClick={() => dispatch(closeCart())}
                as={Link}
                to="/products"
                size="sm"
              >
                Shop Collection
              </Button>
            </VStack>
          ) : (
            <VStack spacing={6} align="stretch">
              {items.map((item) => (
                <Box key={`${item.id}-${item.variant}`}>
                  <HStack align="start" spacing={4}>
                    <Image
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200"
                      }
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="md"
                      flexShrink={0}
                    />
                    <VStack align="start" flex={1} spacing={1}>
                      <Text
                        fontFamily="'Cormorant Garamond', serif"
                        fontSize="md"
                        fontWeight="500"
                        lineHeight="1.2"
                      >
                        {item.name}
                      </Text>
                      {item.variant && (
                        <Badge
                          bg="brand.50"
                          color="brand.600"
                          fontFamily="'Jost', sans-serif"
                          fontSize="9px"
                          letterSpacing="0.1em"
                        >
                          {item.variant}
                        </Badge>
                      )}{" "}
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="sm"
                        color="brand.500"
                        fontWeight="500"
                      >
                        {symbol}
                        {(
                          item.prices?.[currency] ||
                          item.price ||
                          0
                        ).toLocaleString()}
                      </Text>
                      <HStack spacing={2} pt={1}>
                        <IconButton
                          icon={<FiMinus />}
                          size="xs"
                          variant="outline"
                          borderColor="brand.200"
                          onClick={() =>
                            item.quantity > 1
                              ? dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    variant: item.variant,
                                    quantity: item.quantity - 1,
                                  })
                                )
                              : dispatch(
                                  removeFromCart({
                                    id: item.id,
                                    variant: item.variant,
                                  })
                                )
                          }
                          aria-label="Decrease"
                        />
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          minW="20px"
                          textAlign="center"
                        >
                          {item.quantity}
                        </Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="xs"
                          variant="outline"
                          borderColor="brand.200"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                variant: item.variant,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          aria-label="Increase"
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          size="xs"
                          variant="ghost"
                          color="red.400"
                          onClick={() =>
                            dispatch(
                              removeFromCart({
                                id: item.id,
                                variant: item.variant,
                              })
                            )
                          }
                          aria-label="Remove"
                        />
                      </HStack>
                    </VStack>
                  </HStack>
                  <Divider mt={4} borderColor="brand.100" />
                </Box>
              ))}
            </VStack>
          )}
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
