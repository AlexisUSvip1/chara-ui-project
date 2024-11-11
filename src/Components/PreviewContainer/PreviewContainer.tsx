import { Box, Checkbox, Input, Select, Text, IconButton } from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { styles } from "./PreviewContainer.styles";
import { FormModal } from "../FormModal/FormModal";
import { CounterComponents } from "../FormModal/ShowComponentsUI/CounterComponents";
import {usePreviewContainer} from "./PreviewContainer.hooks"
export const Preview = () => {
 
  const {
    handleOpenModal, 
    handleGetInformation, 
    isOpen, 
    isCounterOpen,
    onClose, 
    modalTitle, 
    onCloseCounter,
    componentData,
  } = usePreviewContainer()
  return (
    <Box {...styles.container}>
      <Box {...styles.containerComponent} className="input-component">
        <Box {...styles.header}>
          <Text {...styles.label}>Input</Text>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleOpenModal("Input")}>
                Crear
              </Text>
              <IconButton
                icon={<AddIcon />}
                variant="ghost"
                onClick={() => handleOpenModal("Input")}
                fontSize={{ base: "sm", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleGetInformation("input")}>
                Ver Creados
              </Text>
              <IconButton
                icon={<ViewIcon />}
                variant="ghost"
                onClick={() => handleGetInformation("input")}
                fontSize={{ base: "sm", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
          </Box>
        </Box>
        <Input placeholder="Ingresa tu título aquí" sx={{ borderRadius: '30px' }} />
        <Text {...styles.preview}>Preview</Text>
      </Box>

      {/* Repetición similar para Checkbox y Select */}
      <Box {...styles.containerComponent} className="checkbox-component">
        <Box {...styles.header}>
          <Text {...styles.label}>Check</Text>
          <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center" width={'100%'}>
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleOpenModal("Checkbox")}>
                Crear
              </Text>
              <IconButton
                icon={<AddIcon />}
                variant="ghost"
                onClick={() => handleOpenModal("Checkbox")}
                fontSize={{ base: "sm", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleGetInformation("checkbox")}>
                Ver Creados
              </Text>
              <IconButton
                icon={<ViewIcon />}
                variant="ghost"
                onClick={() => handleGetInformation("checkbox")}
                fontSize={{ base: "sm", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
          </Box>
        </Box>
        <Checkbox>¿Ir al cine hoy?</Checkbox>
        <Text {...styles.preview}>Preview</Text>
      </Box>

      <Box {...styles.containerComponent} className="select-component">
        <Box {...styles.header}>
          <Text {...styles.label}>Select</Text>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" width={'100%'}>
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleOpenModal("Select Option")}>
                Crear
              </Text>
              <IconButton
                icon={<AddIcon />}
                variant="ghost"
                onClick={() => handleOpenModal("Select Option")}
                fontSize={{ base: "xl", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
            <Box className="view-icon-container" {...styles.viewContainer}>
              <Text fontSize={{ base: "sm", md: "md" }} {...styles.label} onClick={() => handleGetInformation("select")}>
                Ver Creados
              </Text>
              <IconButton
                icon={<ViewIcon />}
                variant="ghost"
                onClick={() => handleGetInformation("select")}
                fontSize={{ base: "sm", md: "md" }}
                {...styles.iconButton}
              />
            </Box>
          </Box>
        </Box>
        <Select placeholder="Selecciona un país" sx={{ borderRadius: '30px' }}>
          <option value="mexico">México</option>
          <option value="argentina">Argentina</option>
          <option value="colombia">Colombia</option>
          <option value="chile">Chile</option>
        </Select>
        <Text {...styles.preview}>Preview</Text>
      </Box>

      <FormModal isOpen={isOpen} onClose={onClose} title={modalTitle} />
      <CounterComponents isOpen={isCounterOpen} onClose={onCloseCounter} title={modalTitle} data={componentData} />
    </Box>
  );
};

export { CounterComponents };