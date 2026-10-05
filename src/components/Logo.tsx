import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Palette, fonts } from '../theme';
import { useThemed } from '../themeContext';

type Props = {
  /** Font size of the "Trustify" wordmark; everything else scales from it. */
  size?: number;
};

// Proportions traced from the TrustifyX logo artwork.
export default function Logo({ size = 16 }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const dot = size * 1.62;
  const markW = size * 3.3;
  const markH = size * 2.84;

  return (
    <View style={[styles.row, { height: markH }]} accessibilityLabel="TrustifyX">
      <View
        style={[
          styles.dot,
          { width: dot, height: dot, borderRadius: dot / 2, marginTop: -dot / 2 + size * 0.05 },
        ]}
      />
      <Text
        style={[
          styles.text,
          { fontSize: size, lineHeight: size * 1.2, paddingLeft: size * 0.42 },
        ]}
      >
        {/* "Tr" sits on the yellow dot, so it stays dark in both modes */}
        <Text style={{ color: colors.onYellow }}>Tr</Text>
        ustify
      </Text>
      <Svg width={markW} height={markH} viewBox="-90 0 512 440" style={{ marginLeft: -size * 0.3 }}>
        {/* outlined X: thick black strokes with a white core */}
        <Path d="M30 140 L285 305 M285 140 L30 305" stroke={colors.black} strokeWidth={62} strokeLinecap="square" />
        <Path d="M30 140 L285 305 M285 140 L30 305" stroke={colors.white} strokeWidth={26} strokeLinecap="square" />
        {/* long slash cutting through the X */}
        <Path d="M-80 440 L420 0" stroke={colors.white} strokeWidth={40} />
        <Path d="M-80 440 L420 0" stroke={colors.black} strokeWidth={16} />
      </Svg>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    left: 0,
    top: '50%',
    backgroundColor: colors.yellow,
  },
  text: {
    fontFamily: fonts.heading,
    color: colors.black,
    letterSpacing: -0.2,
  },
});
