// FormModal.style.ts
import { InputProps, BoxProps, TextProps } from "@chakra-ui/react";

interface Styles {
  container: BoxProps;
  containerComponent: BoxProps;
  containerOptions:BoxProps
  inputStyle: InputProps;
  labelStyle: TextProps;
  iconButtonStyle: InputProps;
  optionsContent: BoxProps
}

export const styles: Styles = {
  container: {
    width: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  containerOptions: {
    display:"flex",
    gap:"2",
    justifyContent:"space-between"
  },
  containerComponent: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 8,
  },
  inputStyle: {
    borderRadius: "20px",
    textAlign: "center", // Para centrar el texto en campos de entrada específicos
  },
  labelStyle: {
    fontSize: "sm",
    fontWeight: "bold",
    color: "#333",
    mb: 1,
  },
  iconButtonStyle: {
    variant: "outline",
    borderRadius: "full",
  },
  optionsContent: {
    height:'100px',
    overflowY:'auto'
  }
 
};
