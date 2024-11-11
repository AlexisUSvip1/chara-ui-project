import { BoxProps, TextProps } from "@chakra-ui/react";

interface Styles {
  container: BoxProps;
  title: TextProps;
  subtitle: TextProps;
}

export const styles: Styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    marginTop:'40px',
    textAlign:'center'
  },
  title: {
    color: "#0088cc",
    fontSize: "2xl",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
    fontSize: "lg",
    marginTop: "8px",
  },
};
