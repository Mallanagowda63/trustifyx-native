import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Logo from '../components/Logo';
import Badge from '../components/Badge';
import BrandArt from '../components/BrandArt';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const officeImage = require('../../assets/images/office.jpg');

const CARDS = [
  {
    badge: 'Our Vision',
    title:
      'To become a trusted technology partner that builds reliable digital solutions and prepares students for real-world software careers.',
    body: 'We look forward to establishing industry-defining engineering practices that foster technological alignment, absolute system safety, and absolute transparency in every operational tier.',
  },
  {
    badge: 'Our Mission',
    title:
      'To provide secure, innovative and scalable software solutions while delivering practical, project-based internship experiences.',
    body: 'Through high-velocity execution, standard development cycles, and continuous architectural refinement, we deploy software that moves businesses forward while building careers.',
  },
];

// White logo on transparent background; the Journey section is always dark.
const legallyTalkLogo = require('../../assets/images/legally-talk-white.png');
const LOGO_RATIO = 678 / 269;

const JOURNEY: { year: string; title: string; body: string; logo?: number }[] = [
  {
    year: '2026',
    title: 'Legally Talk',
    logo: legallyTalkLogo,
    body: 'TrustifyX was conceptualized to develop a lawyer consultant mobile app that connects legal professionals with clients through streamlined case management and on-demand advisory services.',
  },
  {
    year: '2027',
    title: 'Coming Soon...',
    body: 'New update coming soon',
  },
];

function Container({ children, isWide }: { children: React.ReactNode; isWide: boolean }) {
  const { colors, styles } = useThemed(makeStyles);
  return <View style={[styles.container, { paddingHorizontal: isWide ? 64 : 16 }]}>{children}</View>;
}

export default function AboutScreen() {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const row = isWide ? styles.row : styles.column;

  return (
    <View style={styles.screen}>
        {/* ---------- Hero ---------- */}
        <View style={[styles.section, { paddingVertical: isWide ? 90 : 48 }]}>
          <Container isWide={isWide}>
            <View style={[row, styles.centered]}>
              <View style={styles.half}>
                <View style={styles.aboutTitle}>
                  <Text style={[styles.aboutText, { fontSize: isWide ? 50 : 38 }]}>About </Text>
                  <Logo size={isWide ? 30 : 23} />
                </View>
                <Text style={styles.paragraph}>
                  TrustifyX is a registered Indian software company committed to building secure,
                  scalable, and innovative digital solutions. We combine cutting-edge technology
                  with structured internship programs to create real impact — for businesses and
                  aspiring developers alike.
                </Text>
                <Pressable style={styles.button} accessibilityRole="button">
                  <Text style={styles.buttonText}>OUR SERVICES</Text>
                  <Svg width={14} height={14} viewBox="0 0 24 24">
                    <Path d="M5 12h14M13 6l6 6-6 6" stroke={colors.white} strokeWidth={2.5}
                      strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </Svg>
                </Pressable>
              </View>

              <View style={styles.half}>
                <Image
                  source={officeImage}
                  style={[styles.heroImage, { height: isWide ? 420 : 260 }]}
                  resizeMode="cover"
                  accessibilityLabel="TrustifyX team collaborating in the office"
                />
              </View>
            </View>
          </Container>
        </View>

        {/* ---------- Vision & Mission ---------- */}
        <View style={[styles.section, styles.graySection, { paddingVertical: isWide ? 80 : 48 }]}>
          <Container isWide={isWide}>
            <View style={[row, { alignItems: 'stretch' }]}>
              {CARDS.map((card) => (
                <View key={card.badge} style={[styles.card, styles.half]}>
                  <Badge label={card.badge} />
                  <Text style={[styles.cardTitle, { fontSize: isWide ? 24 : 20 }]}>{card.title}</Text>
                  <Text style={styles.cardBody}>{card.body}</Text>
                </View>
              ))}
            </View>
          </Container>
        </View>

        {/* ---------- Journey ---------- */}
        <View style={[styles.section, styles.darkSection, { paddingVertical: isWide ? 90 : 56 }]}>
          <Container isWide={isWide}>
            <View style={styles.journeyHead}>
              <Badge label="Our Progression" variant="dark" style={{ alignSelf: 'center' }} />
              <Text style={[styles.journeyTitle, { fontSize: isWide ? 34 : 28 }]}>
                The TrustifyX Journey
              </Text>
              <Text style={styles.journeySub}>
                Tracing our velocity from a bold structural idea to an ISO-certified technology
                powerhouse.
              </Text>
            </View>

            <View style={styles.timeline}>
              {JOURNEY.map((item) => (
                <View key={item.year} style={styles.timelineItem}>
                  <View style={styles.yearCol}>
                    <Text style={styles.year}>{item.year}</Text>
                    <View style={styles.yearDot} />
                  </View>
                  <View style={styles.timelineText}>
                    {item.logo ? (
                      <Image
                        source={item.logo}
                        style={[styles.timelineLogo, { width: 46 * LOGO_RATIO }]}
                        resizeMode="contain"
                        accessibilityLabel={item.title}
                      />
                    ) : (
                      <Text style={styles.timelineTitle}>{item.title}</Text>
                    )}
                    <Text style={styles.timelineBody}>{item.body}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Container>
        </View>

        {/* ---------- Why the name ---------- */}
        <View style={[styles.section, { paddingVertical: isWide ? 90 : 48 }]}>
          <Container isWide={isWide}>
            <View style={[row, styles.centered]}>
              <View style={styles.half}>
                <Badge label="Brand Ethos" />
                <Text style={[styles.whyTitle, { fontSize: isWide ? 34 : 28 }]}>
                  Why the Name TrustifyX?
                </Text>
                <Text style={[styles.paragraph, styles.quote]}>
                  “Trustify” represents our absolute commitment to building trust through elite
                  engineering quality, structural compliance, and responsive transparency.
                </Text>
                <Text style={styles.paragraph}>
                  The ‘X’ represents the algebraic variable of the unknown — the limitless
                  possibilities, custom architectures, and elite solutions we unlock for our
                  business clients and learning interns alike.
                </Text>
                <Text style={styles.paragraph}>
                  Together, TrustifyX stands as a beacon for trusted innovation without boundaries.
                  We transform complex software challenges into predictable business successes.
                </Text>
              </View>

              <View style={styles.half}>
                <View style={[styles.artFrame, { height: isWide ? 390 : 240 }]}>
                  <BrandArt />
                </View>
              </View>
            </View>
          </Container>
        </View>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  section: {
    width: '100%',
  },
  graySection: {
    backgroundColor: colors.section,
  },
  darkSection: {
    backgroundColor: colors.dark,
  },
  container: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 40,
  },
  column: {
    flexDirection: 'column',
    gap: 32,
  },
  centered: {
    alignItems: 'center',
  },
  half: {
    flex: 1,
    width: '100%',
  },

  // Hero
  aboutTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  aboutText: {
    fontFamily: fonts.heading,
    color: colors.black,
    letterSpacing: -0.5,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    maxWidth: 480,
    marginBottom: 18,
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
    marginTop: 8,
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },
  heroImage: {
    width: '100%',
    borderRadius: 12,
  },

  // Vision & Mission
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 32,
  },
  cardTitle: {
    fontFamily: fonts.heading,
    color: colors.black,
    lineHeight: 31,
    marginTop: 18,
    marginBottom: 20,
  },
  cardBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 21,
    color: colors.text,
  },

  // Journey
  journeyHead: {
    alignItems: 'center',
    marginBottom: 48,
  },
  journeyTitle: {
    fontFamily: fonts.heading,
    color: colors.onDark,
    marginTop: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  journeySub: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 440,
  },
  timeline: {
    gap: 28,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 22,
  },
  yearCol: {
    width: 64,
    alignItems: 'center',
  },
  year: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.yellow,
  },
  yearDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.yellow,
    marginTop: 10,
  },
  timelineText: {
    flex: 1,
    maxWidth: 560,
    paddingTop: 4,
  },
  timelineLogo: {
    height: 46,
    marginBottom: 10,
  },
  timelineTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.onDark,
    marginBottom: 6,
  },
  timelineBody: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 20,
    color: colors.muted,
  },

  // Why the name
  whyTitle: {
    fontFamily: fonts.heading,
    color: colors.black,
    marginTop: 18,
    marginBottom: 22,
  },
  quote: {
    fontFamily: fonts.medium,
    color: colors.subtle,
  },
  artFrame: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
