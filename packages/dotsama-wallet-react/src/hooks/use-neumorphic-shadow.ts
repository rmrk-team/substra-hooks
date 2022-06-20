import { useIsDarkMode } from './use-is-dark-mode';

export const useNeumorphicShadow = () => {
  const isDark = useIsDarkMode();

  return isDark
    ? '5px 5px 10px #141922, -5px -5px 10px #202736'
    : '5px 5px 10px #a8b1ba, -5px -5px 10px #eef9ff';
};
