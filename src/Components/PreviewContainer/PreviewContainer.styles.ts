// PreviewContainer.styles.ts
import { BoxProps, TextProps, IconButtonProps } from "@chakra-ui/react";

interface Styles {
  container: BoxProps;
  containerComponent: BoxProps;
  header: BoxProps;
  viewContainer: BoxProps;
  label: TextProps;
  iconButton: IconButtonProps;
  preview: TextProps;
}

export const styles: Styles = {
  container: {
    width: '100%',
    background: '#F6F6F6',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
    borderRadius: '10px',
    gap: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  containerComponent: {
    padding: '20px',
    width: ['100%', '48%', '30%'], // Responsivo para diferentes tamaños de pantalla
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '20px',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',

    _hover: {
      boxShadow: '0px 4px 80px rgb(0 0 0 / 19%)',
      cursor: 'pointer',
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  label: {
    fontSize: ['sm', 'sm'], // Tamaño de fuente más pequeño en pantallas pequeñas
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    variant: 'ghost',
    color: '#333',
    borderRadius: 100,

  } as IconButtonProps,
  viewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F6F6F6',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '30px',
  },
  preview: {
    alignSelf: 'flex-start',
    marginTop: '30px',
    background: '#F6F6F6',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '30px',
    fontWeight: '600',
  },
};
