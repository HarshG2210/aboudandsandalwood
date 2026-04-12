import { extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    50: "#fdf6ee",
    100: "#f5e4c8",
    200: "#e8c98a",
    300: "#d4a853",
    400: "#b8882f",
    500: "#9a6f1e",
    600: "#7d5a16",
    700: "#5e430f",
    800: "#3e2c08",
    900: "#1e1503",
  },
  oud: {
    50: "#f4f0eb",
    100: "#e0d5c4",
    200: "#c4b09a",
    300: "#a68b6e",
    400: "#8a6d4d",
    500: "#6e5133",
    600: "#5a4029",
    700: "#43301e",
    800: "#2c2013",
    900: "#160f08",
  },
  ivory: "#faf7f2",
  gold: "#c9a84c",
};
export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors,
  fonts: {
    heading: `'Cormorant Garamond', serif`,
    body: `'Jost', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "ivory",
        color: props.colorMode === "dark" ? "gray.100" : "oud.800",
      },
      "::selection": {
        background: "brand.200",
        color: "oud.900",
      },
    }),
  },
  components: {
    Button: {
      variants: {
        gold: {
          bg: "brand.400",
          color: "white",
          _hover: {
            bg: "brand.500",
            transform: "translateY(-1px)",
            boxShadow: "lg",
          },
          _active: { bg: "brand.600" },
          transition: "all 0.2s",
          fontFamily: `'Jost', sans-serif`,
          fontWeight: "500",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontSize: "xs",
        },
        outline_gold: {
          border: "1px solid",
          borderColor: "brand.400",
          color: "brand.500",
          bg: "transparent",
          _hover: { bg: "brand.50", transform: "translateY(-1px)" },
          transition: "all 0.2s",
          fontFamily: `'Jost', sans-serif`,
          fontWeight: "500",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontSize: "xs",
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: `'Cormorant Garamond', serif`,
        fontWeight: "400",
      },
    },
  },
});
