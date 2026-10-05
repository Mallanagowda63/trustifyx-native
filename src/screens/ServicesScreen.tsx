import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import Badge from '../components/Badge';
import Grid from '../components/Grid';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const heroImage = require('../../assets/images/services-hero.jpg');

type IconName = 'code' | 'device' | 'cloud' | 'shield' | 'compass' | 'nodes';

const SERVICES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'code',
    title: 'Software Development',
    body: 'Reliable custom software platforms engineered cleanly to suit high-load enterprise workflow automation.',
  },
  {
    icon: 'device',
    title: 'Web & Mobile Apps',
    body: 'Native iOS, Android, and cross-platform web ecosystems ensuring flawless product velocity.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Solutions',
    body: 'Automated AWS/GCP deployments keeping infrastructure exceptionally fast, resilient, and highly secure.',
  },
  {
    icon: 'shield',
    title: 'QA & Testing',
    body: 'Military-grade automated software test suites identifying bugs prior to production branch deployments.',
  },
  {
    icon: 'compass',
    title: 'IT Consulting',
    body: 'High-octane technical advisory guiding companies through digital transformations, safety audits, and roadmaps.',
  },
  {
    icon: 'nodes',
    title: 'DevOps & Infrastructure',
    body: 'Robust automated pipeline orchestration leveraging Docker, Kubernetes, and secure CI/CD engines.',
  },
];

function ServiceIcon({ name }: { name: IconName }) {
  const { colors, styles } = useThemed(makeStyles);
  const stroke = { stroke: colors.yellow, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

  return (
    <View style={styles.iconBox}>
      <Svg width={18} height={18} viewBox="0 0 24 24">
        {name === 'code' && (
          <>
            <Rect x={3} y={3} width={18} height={18} rx={2} {...stroke} />
            <Path d="M10 9l-3 3 3 3M14 9l3 3-3 3" {...stroke} />
          </>
        )}
        {name === 'device' && <Rect x={4} y={3} width={16} height={18} rx={2} {...stroke} />}
        {name === 'cloud' && (
          <>
            <Path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" {...stroke} />
            <Path d="M12 12v9M16 16l-4-4-4 4" {...stroke} />
          </>
        )}
        {name === 'shield' && (
          <>
            <Path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" {...stroke} />
            <Path d="M12 8v4M12 16h.01" {...stroke} />
          </>
        )}
        {name === 'compass' && (
          <>
            <Circle cx={12} cy={12} r={10} {...stroke} />
            <Path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" {...stroke} />
          </>
        )}
        {name === 'nodes' && (
          <>
            <Circle cx={14.5} cy={7} r={2} fill={colors.yellow} />
            <Circle cx={8} cy={12} r={2} fill={colors.yellow} />
            <Circle cx={14} cy={16.5} r={2} fill={colors.yellow} />
          </>
        )}
      </Svg>
    </View>
  );
}

export default function ServicesScreen() {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const half = isWide ? styles.half : styles.halfStacked;
  const isPhone = width < 600;
  const columns = isWide ? 3 : isPhone ? 1 : 2;
  const pad = isWide ? 64 : 16;

  return (
    <View style={styles.screen}>
      {/* ---------- Hero ---------- */}
      <View style={{ paddingVertical: isWide ? 90 : 48 }}>
        <View style={[styles.container, { paddingHorizontal: pad }]}>
          <View style={isWide ? styles.row : styles.column}>
            <View style={half}>
              <View style={styles.kicker}>
                <View style={styles.kickerDot} />
                <Text style={styles.kickerText}>OUR ENGINEERING SUITE</Text>
              </View>
              <Text
                style={[
                  styles.title,
                  { fontSize: isWide ? 50 : isPhone ? 32 : 40, lineHeight: isWide ? 55 : isPhone ? 37 : 45 },
                ]}
              >
                Elite Software Services Engineered to Scale.
              </Text>
              <Text style={styles.paragraph}>
                From custom microservice layers to robust cross-platform user interfaces, TrustifyX
                builds hardened, production-grade applications that guarantee business velocity.
              </Text>
            </View>

            <View style={half}>
              <Image
                source={heroImage}
                style={[styles.heroImage, { height: isWide ? 370 : isPhone ? 230 : 300 }]}
                resizeMode="cover"
                accessibilityLabel="Engineer working at a multi-monitor workstation"
              />
            </View>
          </View>
        </View>
      </View>

      {/* ---------- Services grid ---------- */}
      <View style={[styles.graySection, { paddingVertical: isWide ? 90 : 56 }]}>
        <View style={[styles.container, { paddingHorizontal: pad }]}>
          <View style={styles.sectionHead}>
            <Badge label="Expert Engineering" style={{ alignSelf: 'center' }} />
            <Text style={[styles.sectionTitle, { fontSize: isWide ? 34 : 28 }]}>
              Bespoke Software Services
            </Text>
            <Text style={styles.sectionSub}>
              We build digital systems modeled for continuous performance, top-tier protection, and
              immediate business ROI.
            </Text>
          </View>

          <Grid columns={columns}>
            {SERVICES.map((service) => (
              <View key={service.title} style={styles.card}>
                <ServiceIcon name={service.icon} />
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardBody}>{service.body}</Text>
              </View>
            ))}
          </Grid>
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
  // Side by side: share the row equally. Stacked: natural height, so nothing overlaps.
  half: {
    flex: 1,
    width: '100%',
  },
  halfStacked: {
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
    maxWidth: 540,
    marginBottom: 26,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.text,
    maxWidth: 520,
  },
  heroImage: {
    width: '100%',
    borderRadius: 12,
  },

  // Services grid
  graySection: {
    backgroundColor: colors.section,
  },
  sectionHead: {
    alignItems: 'center',
    marginBottom: 44,
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
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 26,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    color: colors.black,
    marginBottom: 12,
  },
  cardBody: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.text,
  },
});
