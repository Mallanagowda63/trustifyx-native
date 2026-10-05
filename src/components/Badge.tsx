import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Palette, fonts } from '../theme';
import { useThemed } from '../themeContext';

type Props = {
  label: string;
  /** Solid yellow on dark backgrounds, pale yellow on light ones. */
  variant?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
  uppercase?: boolean;
};

export default function Badge({ label, variant = 'light', style, uppercase = true }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  return (
    <View style={[styles.badge, variant === 'dark' && styles.badgeDark, style]}>
      <Text style={[styles.text, variant === 'dark' && styles.textDark]}>{uppercase ? label.toUpperCase() : label}</Text>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeDark: {
    backgroundColor: colors.yellow,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.black,
  },
  textDark: {
    color: colors.onYellow,
  },
});
