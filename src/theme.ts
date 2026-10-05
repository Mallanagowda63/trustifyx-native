// `black` is the strongest foreground (ink) and `white` the page background (paper),
// so they swap in dark mode; `onDark` / `onYellow` stay fixed for text on those fills.
export const lightColors = {
  black: '#111111',
  dark: '#1b1b1b',
  text: '#555555',
  subtle: '#444444',
  muted: '#8a8a8a',
  nav: '#333333',
  yellow: '#ffe600',
  badge: '#fff6b3',
  highlight: '#fff3b3',
  notice: '#fbf8dc',
  border: '#eeeeee',
  line: '#ececec',
  section: '#f4f5f7',
  surfaceAlt: '#f8f9fb',
  white: '#ffffff',
  placeholder: '#9a9a9a',
  onDark: '#ffffff',
  onYellow: '#111111',
};

export type Palette = typeof lightColors;

export const darkColors: Palette = {
  black: '#f2f2f2',
  dark: '#1c1c20',
  text: '#a8a8ad',
  subtle: '#b8b8bd',
  muted: '#8a8a8f',
  nav: '#cfcfd4',
  yellow: '#ffe600',
  badge: 'rgba(255, 230, 0, 0.16)',
  highlight: 'rgba(255, 230, 0, 0.14)',
  notice: 'rgba(255, 230, 0, 0.10)',
  border: '#232327',
  line: '#2a2a2f',
  section: '#0b0b0d',
  surfaceAlt: '#18181c',
  white: '#131316',
  placeholder: '#77777c',
  onDark: '#ffffff',
  onYellow: '#111111',
};

export const fonts = {
  heading: 'Outfit_800ExtraBold',
  headingBold: 'Outfit_700Bold',
  body: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

// Content column width used across sections
export const MAX_WIDTH = 1760;
export const WIDE_BREAKPOINT = 900;
