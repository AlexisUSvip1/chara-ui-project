// App.js
// Componente principal de la aplicación que sirve como bienvenida y permite al usuario generar componentes interactivos.

import { Box, Text } from '@chakra-ui/react';
import { styles } from "./App.style";
import { Preview } from '../PreviewContainer/PreviewContainer';

/**
 * App
 * Componente principal que muestra una bienvenida al usuario e integra el contenedor de vista previa.
 *
 * @component
 * @returns {JSX.Element} - Estructura de la interfaz principal con el saludo y el generador de componentes.
 */
function App() {
  return (
    <>
      <Box mt={30} p={4} {...styles.container}>
        <Text fontSize="2xl" fontWeight="bold">
          Hola, Bienvenido a tu generador de componentes
        </Text>
        <Text fontSize="lg" mt={4} mb={10}>
          ¿Qué componente deseas agregar?
        </Text>
        <Preview />
      </Box>
    </>
  );
}

export default App;
