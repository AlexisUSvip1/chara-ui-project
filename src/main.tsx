import React from "react"; // Importa la librería React
import ReactDOM from "react-dom/client"; // Importa ReactDOM para renderizar en el DOM
import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Importa ChakraProvider y extendTheme para configurar el tema de Chakra UI
import App from "../src/Components/Home/App"; // Importa el componente raíz App

// Crea un tema personalizado usando extendTheme de Chakra UI
const theme = extendTheme({});

// Renderiza el componente principal dentro de un elemento con ID 'root'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {" "}
    {/* StrictMode ayuda a identificar problemas en la aplicación */}
    <ChakraProvider theme={theme}>
      {" "}
      {/* ChakraProvider envuelve la app para aplicar el tema */}
      <App /> {/* Componente raíz de la aplicación */}
    </ChakraProvider>
  </React.StrictMode>
);
