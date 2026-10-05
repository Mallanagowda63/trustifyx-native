import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, Palette } from './theme';

type Scheme = 'light' | 'dark';

type ThemeValue = {
  scheme: Scheme;
  colors: Palette;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeValue>({
  scheme: 'light',
  colors: lightColors,
  toggle: () => {},
});

// Follows the device setting until the visitor picks a mode with the toggle.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [override, setOverride] = useState<Scheme | null>(null);
  const scheme: Scheme = override ?? (system === 'dark' ? 'dark' : 'light');

  const value = useMemo<ThemeValue>(
    () => ({
      scheme,
      colors: scheme === 'dark' ? darkColors : lightColors,
      toggle: () => setOverride(scheme === 'dark' ? 'light' : 'dark'),
    }),
    [scheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

// Builds a component's styles for the active palette (rebuilt only when the mode changes).
export function useThemed<T>(makeStyles: (colors: Palette) => T) {
  const { colors, scheme } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors, makeStyles]);
  return { colors, styles, scheme };
}
