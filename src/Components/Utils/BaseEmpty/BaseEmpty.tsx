// BaseEmpty.tsx
import { Box, Text, Icon, BoxProps, TextProps, IconProps } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface BaseEmptyProps {
  message?: string;
  icon?: React.ElementType;
  containerStyle?: BoxProps;
  textStyle?: TextProps;
  iconStyle?: IconProps;
}

export const BaseEmpty: React.FC<BaseEmptyProps> = ({
  message = "No hay datos disponibles",
  icon = WarningIcon,
  containerStyle,
  textStyle,
  iconStyle,
}) => {
  return (
    <Box
      data-testid="base-empty-container" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      padding="4" 
      borderRadius="md" 
      bg="gray.100" 
      {...containerStyle}
    >
      <Icon as={icon} boxSize="6" color="gray.400" mb="2" {...iconStyle} data-testid="icon"/>
      <Text fontSize="md" color="gray.600" {...textStyle} data-testid="text">
        {message}
      </Text>
    </Box>
  );
};
