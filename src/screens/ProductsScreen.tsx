import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Badge from '../components/Badge';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const heroImage = require('../../assets/images/products-hero.jpg');
const vakilImage = require('../../assets/images/vakil-dashboard.jpg');

export default function ProductsScreen() {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const pad = isWide ? 64 : 16;

  return (
    <View style={styles.screen}>
      {/* ---------- Hero ---------- */}
      <View style={{ paddingVertical: isWide ? 90 : 48 }}>
        <View style={[styles.container, { paddingHorizontal: pad }]}>
          <View style={isWide ? styles.row : styles.column}>
            <View style={styles.half}>
              <View style={styles.kicker}>
                <View style={styles.kickerDot} />
                <Text style={styles.kickerText}>PROPRIETARY TECH SUITE</Text>
              </View>
              <Text
                style={[
                  styles.title,
                  { fontSize: isWide ? 50 : isPhone ? 32 : 40, lineHeight: isWide ? 55 : isPhone ? 37 : 45 },
                ]}
              >
                Out-of-the-Box Systems. Custom-Tuned Precision.
              </Text>
              <Text style={styles.paragraph}>
                We deploy proprietary SaaS engines built on highly resilient modern codebases. Gain
                immediate market leverage with pre-certified modules tailored cleanly to your niche.
              </Text>
              <Pressable style={styles.button} accessibilityRole="button">
                <Text style={styles.buttonText}>REQUEST A CUSTOM DEMO</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24">
                  <Path d="M5 12h14M13 6l6 6-6 6" stroke={colors.white} strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </Svg>
              </Pressable>
            </View>

            <View style={styles.half}>
              <Image
                source={heroImage}
                style={[styles.image, { height: isWide ? 360 : isPhone ? 230 : 300 }]}
                resizeMode="cover"
                accessibilityLabel="Cyber Defense Matrix illustration"
              />
            </View>
          </View>
        </View>
      </View>

      {/* ---------- Shipped products ---------- */}
      <View style={[styles.graySection, { paddingVertical: isWide ? 90 : 56 }]}>
        <View style={[styles.container, { paddingHorizontal: pad }]}>
          <View style={[styles.sectionHead, { marginBottom: isWide ? 90 : 44 }]}>
            <Badge label="SaaS Innovation" style={{ alignSelf: 'center' }} />
            <Text style={[styles.sectionTitle, { fontSize: isWide ? 34 : 28 }]}>
              Shipped Software Products
            </Text>
            <Text style={styles.sectionSub}>
              Ready-to-deploy platforms designed for zero-latency operations, fluid user interfaces,
              and unmatched data security.
            </Text>
          </View>

          <View style={isWide ? styles.row : styles.column}>
            <View style={styles.half}>
              <Image
                source={vakilImage}
                style={[styles.image, styles.productImage, { height: isWide ? 305 : isPhone ? 200 : 280 }]}
                resizeMode="cover"
                accessibilityLabel="Vakil Legal Suite dashboard"
              />
            </View>

            <View style={styles.half}>
              <Badge label="Legal Tech" uppercase={false} />
              <Text style={[styles.productTitle, { fontSize: isWide ? 28 : 24 }]}>
                Vakil Legal Suite
              </Text>
              <Text style={[styles.paragraph, styles.productBody]}>
                A sleek workspace connecting on-demand legal advisors with patients and corporate
                partners. Integrates complete virtual consult rooms, and instant compliance
                tracking.
              </Text>
              <Pressable style={styles.textLink} accessibilityRole="link">
                <Text style={styles.textLinkText}>Request Demo Session</Text>
                <Svg width={14} height={14} viewBox="0 0 24 24">
                  <Path d="M8 4l8 8-8 8" stroke={colors.black} strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </Svg>
              </Pressable>
            </View>
          </View>
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
  container: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
  },
  column: {
    gap: 36,
  },
  half: {
    flex: 1,
    width: '100%',
  },

  // Hero
  kicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  kickerDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.yellow,
  },
  kickerText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.3,
    color: colors.subtle,
  },
  title: {
    fontFamily: fonts.heading,
    letterSpacing: -0.5,
    color: colors.black,
    maxWidth: 440,
    marginBottom: 26,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.text,
    maxWidth: 520,
    marginBottom: 32,
  },
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.black,
    paddingVertical: 13,
    paddingHorizontal: 22,
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

  // Shipped products
  graySection: {
    backgroundColor: colors.section,
  },
  sectionHead: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    color: colors.black,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 14,
  },
  sectionSub: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
    textAlign: 'center',
    maxWidth: 560,
  },
  productImage: {
    borderRadius: 10,
  },
  productTitle: {
    fontFamily: fonts.heading,
    color: colors.black,
    marginTop: 16,
    marginBottom: 18,
  },
  productBody: {
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 22,
  },
  textLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textLinkText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.black,
  },
});
