import { useMediaQuery } from '@chakra-ui/react';

const defaultBreakpointValues = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em',
};

export const useScreenSize = (
  breakpointValues: Record<string, string> = defaultBreakpointValues,
) => {
  const [isSm, isMd, isLg, isXl, isXxl] = useMediaQuery([
    `(max-width: ${breakpointValues.sm})`,
    `(max-width: ${breakpointValues.md})`,
    `(max-width: ${breakpointValues.lg})`,
    `(max-width: ${breakpointValues.xl})`,
    `(min-width: ${breakpointValues.xl})`,
  ]);

  return { isSm, isMd, isLg, isXl, isXxl };
};
