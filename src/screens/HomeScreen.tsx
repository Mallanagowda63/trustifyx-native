import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const heroImage = require('../../assets/images/office.jpg');

type Props = {
  onExploreServices?: () => void;
};

export default function HomeScreen({ onExploreServices }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 480;

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.hero,
          isWide
            ? styles.heroWide
            : { paddingTop: isPhone ? 36 : 48, paddingBottom: isPhone ? 48 : 64, paddingHorizontal: isPhone ? 16 : 20 },
        ]}
      >
        <View style={isWide ? styles.textWide : styles.textStacked}>
          <View style={styles.dot} />
          <Text
            style={[
              styles.title,
              !isWide && { fontSize: isPhone ? 32 : 38, lineHeight: isPhone ? 36 : 42 },
            ]}
          >
            Building Trusted Software. Developing Future Talent.
          </Text>
          <Text style={styles.paragraph}>
            TrustifyX is a registered Indian software company delivering secure, scalable digital
            solutions while empowering the next generation of tech professionals through real-world
            internship programs.
          </Text>
          <Pressable style={styles.button} onPress={onExploreServices} accessibilityRole="button">
            <Text style={styles.buttonText}>EXPLORE SERVICES</Text>
            <Svg width={14} height={14} viewBox="0 0 24 24">
              <Path d="M5 12h14M13 6l6 6-6 6" stroke={colors.white} strokeWidth={2.5}
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </Svg>
          </Pressable>
        </View>

        <View style={isWide ? styles.imageWide : styles.imageStacked}>
          <Image
            source={heroImage}
            style={[styles.image, { height: isWide ? 480 : isPhone ? 240 : 300 }]}
            resizeMode="cover"
            accessibilityLabel="TrustifyX team collaborating in the office"
          />
        </View>
      </View>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  hero: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 60,
    paddingTop: 102,
    paddingBottom: 120,
    paddingHorizontal: 64,
  },
  textWide: {
    flex: 1,
  },
  textStacked: {
    marginBottom: 40,
  },
  imageWide: {
    width: '45%',
    maxWidth: 680,
    marginTop: 13,
  },
  imageStacked: {
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    marginBottom: 32,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 50,
    lineHeight: 54.5,
    letterSpacing: -0.5,
    color: colors.black,
    maxWidth: 460,
    marginBottom: 30,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.text,
    maxWidth: 470,
    marginBottom: 30,
  },
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.black,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },
  image: {
    width: '100%',
    borderRadius: 12,
  },
});
