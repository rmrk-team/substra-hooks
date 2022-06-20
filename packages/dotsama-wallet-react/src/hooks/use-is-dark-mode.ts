import { useColorMode } from '@chakra-ui/react';

export const useIsDarkMode = () => {
  const isDark = useColorMode().colorMode === 'dark';

  return isDark;
};
