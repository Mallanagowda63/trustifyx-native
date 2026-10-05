import { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Badge from '../components/Badge';
import Grid from '../components/Grid';
import JobRow from '../components/JobRow';
import { INTERNSHIPS, Internship, JOBS, STEPS, VALUES } from '../data/careers';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const heroImage = require('../../assets/images/careers-hero.jpg');

function Arrow({ color, size = 16 }: { color?: string; size?: number }) {
  const { colors } = useThemed(makeStyles);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color ?? colors.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function SectionHead({ badge, title, sub, isWide }: { badge: string; title: string; sub: string; isWide: boolean }) {
  const { colors, styles } = useThemed(makeStyles);
  return (
    <View style={styles.sectionHead}>
      <Badge label={badge} style={{ alignSelf: 'center' }} />
      <Text style={[styles.sectionTitle, { fontSize: isWide ? 34 : 28 }]}>{title}</Text>
      <Text style={styles.sectionSub}>{sub}</Text>
    </View>
  );
}

type Props = {
  /** Called with the open-roles list's offset from the top of this section. */
  onExplorePositions?: (offsetY: number) => void;
  onApplyInternship?: (internship: Internship) => void;
};

export default function CareersScreen({ onExplorePositions, onApplyInternship }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const [openJob, setOpenJob] = useState<string | null>(null);
  const rolesY = useRef(0);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const columns = isWide ? 3 : isPhone ? 1 : 2;
  const pad = isWide ? 64 : 16;
  const container = [styles.container, { paddingHorizontal: pad }];

  return (
    <View style={styles.screen}>
      {/* ---------- Hero ---------- */}
      <View style={{ paddingVertical: isWide ? 90 : 48 }}>
        <View style={container}>
          <View style={isWide ? styles.row : styles.column}>
            <View style={styles.half}>
              <View style={styles.kicker}>
                <View style={styles.kickerDot} />
                <Text style={styles.kickerText}>JOIN OUR DEV TEAM</Text>
              </View>
              <Text
                style={[
                  styles.title,
                  { fontSize: isWide ? 50 : isPhone ? 32 : 40, lineHeight: isWide ? 55 : isPhone ? 37 : 45 },
                ]}
              >
                Build the Future. Share Your Knowledge.
              </Text>
              <Text style={styles.paragraph}>
                We operate at the convergence of elite engineering pipelines and structured
                technical education. Work on sophisticated microservices while guiding cohorts of
                aspiring technology builders.
              </Text>
              <Pressable style={styles.button} onPress={() => onExplorePositions?.(rolesY.current)} accessibilityRole="button">
                <Text style={styles.buttonText}>EXPLORE OPEN POSITIONS</Text>
                <Arrow />
              </Pressable>
            </View>

            <View style={styles.half}>
              <Image
                source={heroImage}
                style={[styles.image, { height: isWide ? 400 : isPhone ? 230 : 300 }]}
                resizeMode="cover"
                accessibilityLabel="TrustifyX team collaborating around a glass board"
              />
            </View>
          </View>
        </View>
      </View>

      {/* ---------- Core values ---------- */}
      <View style={[styles.gray, { paddingVertical: isWide ? 90 : 56 }]}>
        <View style={container}>
          <SectionHead
            isWide={isWide}
            badge="Life at TrustifyX"
            title="Our Core Values"
            sub="How we maintain standard-setting architectural outcomes while enabling huge professional acceleration."
          />
          <Grid columns={columns}>
            {VALUES.map((v) => (
              <View key={v.title} style={styles.valueCard}>
                <Text style={styles.valueTitle}>{v.title}</Text>
                <Text style={styles.smallBody}>{v.body}</Text>
              </View>
            ))}
          </Grid>
        </View>
      </View>

      {/* ---------- Open roles ---------- */}
      <View
        style={{ paddingVertical: isWide ? 90 : 56 }}
        onLayout={(e) => {
          rolesY.current = e.nativeEvent.layout.y;
        }}
      >
        <View style={container}>
          <SectionHead
            isWide={isWide}
            badge="Opportunities"
            title="Active Sprints Hiring"
            sub="Ready to deploy robust code? View our listed roles and submit your application."
          />
          <View style={styles.jobs}>
            {JOBS.map((job) => (
              <JobRow
                key={job.title}
                {...job}
                kind="job"
                expanded={openJob === job.title}
                onApply={() => setOpenJob(openJob === job.title ? null : job.title)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* ---------- Internships ---------- */}
      <View style={[styles.gray, { paddingTop: isWide ? 70 : 48, paddingBottom: 40 }]}>
        <View style={container}>
          <View style={[styles.sectionHead, { marginBottom: 0 }]}>
            <Badge label="Professional Tracks" style={{ alignSelf: 'center' }} />
            <Text style={[styles.internTitle, { fontSize: isWide ? 42 : 30 }]}>Internships Available</Text>
            <Text style={styles.sectionSub}>
              Choose your specialization track. Learn standard corporate workflows under rigorous
              modern parameters.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: 24, paddingBottom: isWide ? 80 : 48 }}>
        <View style={container}>
          <Grid columns={columns} gap={isWide ? 22 : 16}>
            {INTERNSHIPS.map((job) => (
              <View key={job.title} style={styles.internCard}>
                <View style={styles.internTop}>
                  <Badge label={job.tag} />
                  <Text style={styles.internMeta}>{job.meta}</Text>
                </View>
                <Text style={styles.internName}>{job.title}</Text>
                <Text style={styles.internTeam}>{job.team}</Text>

                <View style={styles.facts}>
                  <View style={styles.fact}>
                    <Text style={styles.factLabel}>LOCATION</Text>
                    <Text style={styles.factValue}>{job.location}</Text>
                  </View>
                  <View style={styles.fact}>
                    <Text style={styles.factLabel}>DURATION</Text>
                    <Text style={styles.factValue}>{job.duration}</Text>
                  </View>
                </View>

                <Text style={styles.respTitle}>Responsibilities</Text>
                <Text style={styles.respBody}>{job.body}</Text>

                <View style={styles.pay}>
                  <Text style={styles.payLabel}>COMPENSATION</Text>
                  <Text style={styles.payValue}>{job.pay}</Text>
                </View>

                <Pressable
                  style={styles.applyWide}
                  onPress={() => onApplyInternship?.(job)}
                  accessibilityRole="button"
                >
                  <Text style={styles.applyWideText}>APPLY NOW</Text>
                  <Arrow />
                </Pressable>
              </View>
            ))}
          </Grid>
        </View>
      </View>

      {/* ---------- Hiring timeline ---------- */}
      <View style={{ paddingBottom: isWide ? 90 : 56 }}>
        <View style={container}>
          <SectionHead
            isWide={isWide}
            badge="Structured Process"
            title="Our Cohort Hiring Timeline"
            sub="From online screening challenges to direct principal interviews — here is your path into TrustifyX."
          />
          <Grid columns={isPhone ? 1 : 3}>
            {STEPS.map((step) => (
              <View key={step.num} style={styles.stepCard}>
                <Text style={styles.stepNum}>{step.num}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.smallBody}>{step.body}</Text>
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
  half: {
    flex: 1,
    width: '100%',
  },
  gray: {
    backgroundColor: colors.section,
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
    maxWidth: 560,
    marginBottom: 26,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.text,
    maxWidth: 540,
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

  // Section heads
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

  // Core values
  valueCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 24,
  },
  valueTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.black,
    marginBottom: 14,
  },
  smallBody: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.text,
  },

  // Open roles
  jobs: {
    gap: 14,
  },

  // Internships
  internTitle: {
    fontFamily: fonts.bold,
    color: colors.black,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 14,
  },
  internCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  internTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  internMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.subtle,
  },
  internName: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: colors.black,
    marginBottom: 6,
  },
  internTeam: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
    marginBottom: 18,
  },
  facts: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  fact: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: 12,
  },
  factLabel: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.subtle,
    marginBottom: 4,
  },
  factValue: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.black,
  },
  respTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.black,
    marginBottom: 10,
  },
  respBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 21,
    color: colors.text,
    marginBottom: 20,
    flexGrow: 1,
  },
  pay: {
    backgroundColor: colors.highlight,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  payLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.subtle,
    marginBottom: 4,
  },
  payValue: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.black,
  },
  applyWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
  },
  applyWideText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },

  // Timeline
  stepCard: {
    flex: 1,
    backgroundColor: colors.section,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 22,
  },
  stepNum: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.black,
    marginBottom: 14,
  },
  stepTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.black,
    marginBottom: 12,
  },
});
