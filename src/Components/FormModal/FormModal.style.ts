// FormModal.style.ts
import { BoxProps, ModalHeaderProps, InputProps } from "@chakra-ui/react";

interface Styles {
  containerModal: BoxProps;
  contentTitle: BoxProps;
  modalHeader: ModalHeaderProps;
  inputStyle:InputProps
  labelStyle: InputProps
  counterContainer: BoxProps
}

export const styles: Styles = {
  contentTitle: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  modalHeader: {
    width: '100%',  
    textAlign: 'center',
    fontSize: 'lg',
    fontWeight: 'bold',
  },
 inputStyle:{
  borderRadius: '20px'
 },
 labelStyle: {
  fontSize: 'sm',
  fontWeight: 'bold',
  color: '#333',
},
counterContainer: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderLeft: '1px solid #e2e8f0', // Línea divisoria
},
};