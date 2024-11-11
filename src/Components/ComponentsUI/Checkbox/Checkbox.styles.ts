// FormModal.style.ts
import {InputProps } from "@chakra-ui/react";

interface Styles {

  inputStyle:InputProps
  labelStyle: InputProps
}

export const styles: Styles = {
  inputStyle: {
    borderRadius: '20px'
  },
  labelStyle: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: '#333',
  },
 
};