import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("#FFFFFF", "dark")(props),
      color: mode("#224957", "#fff")(props),
    },
  }),
};

const colors = {
  tea: "#20DF7F",
  dark: "#224957",
  "dark-light": "##224957",
};

const theme = extendTheme({ config, styles, colors });
export default theme;
