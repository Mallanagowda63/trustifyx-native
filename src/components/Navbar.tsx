import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Logo from './Logo';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useTheme, useThemed } from '../themeContext';

export const LINKS = ['Home', 'About Us', 'Services', 'Products', 'Careers', 'Contact Us'] as const;
export type Page = (typeof LINKS)[number];

// Sun in dark mode (switch to light), moon in light mode (switch to dark).
function ThemeToggle() {
  const { colors, styles } = useThemed(makeStyles);
  const { scheme, toggle } = useTheme();
  const dark = scheme === 'dark';
  const stroke = { stroke: colors.black, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

  return (
    <Pressable
      onPress={toggle}
      style={styles.toggle}
      accessibilityRole="button"
      accessibilityLabel={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Svg width={17} height={17} viewBox="0 0 24 24">
        {dark ? (
          <>
            <Circle cx={12} cy={12} r={4} {...stroke} />
            <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" {...stroke} />
          </>
        ) : (
          <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" {...stroke} />
        )}
      </Svg>
    </Pressable>
  );
}

type Props = {
  active: Page;
  onNavigate: (page: Page) => void;
};

export default function Navbar({ active, onNavigate }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  // Full link row needs more room than the page layout does.
  const showLinks = width >= 1150;
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.bar}>
      <View style={[styles.inner, { paddingHorizontal: isWide ? 64 : 16 }]}>
        <Pressable onPress={() => onNavigate('Home')} accessibilityRole="link">
          <Logo size={isWide ? 20 : 16} />
        </Pressable>

        <View style={styles.right}>
        {showLinks ? (
          <View style={styles.links}>
            {LINKS.map((link) => (
              <Pressable key={link} onPress={() => onNavigate(link)} accessibilityRole="link">
                <Text style={[styles.link, link === active && styles.linkActive]}>
                  {link.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Pressable
            onPress={() => setOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
            style={styles.burger}
          >
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
          </Pressable>
        )}
          <ThemeToggle />
        </View>
      </View>

      {!showLinks && open && (
        <View style={styles.menu}>
          {LINKS.map((link) => (
            <Pressable key={link} onPress={() => {
                setOpen(false);
                onNavigate(link);
              }} style={styles.menuItem}>
              <Text style={[styles.link, link === active && styles.linkActive]}>
                {link.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inner: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
    height: 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  toggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  links: {
    flexDirection: 'row',
    gap: 36,
  },
  link: {
    fontFamily: fonts.body,
    fontSize: 15,
    letterSpacing: 0.3,
    color: colors.nav,
  },
  linkActive: {
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  burger: {
    padding: 8,
    gap: 5,
  },
  burgerLine: {
    width: 22,
    height: 2,
    backgroundColor: colors.black,
  },
  menu: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
