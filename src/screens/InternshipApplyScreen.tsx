import { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Badge from '../components/Badge';
import JobRow from '../components/JobRow';
import { INTERNSHIPS, Internship } from '../data/careers';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const REASONS = [
  {
    title: 'Hands-on work',
    body: 'Join live projects from day one and contribute to products, campaigns, and client-facing work.',
  },
  {
    title: 'Mentorship',
    body: 'Work alongside senior designers, engineers, and marketers who guide your growth.',
  },
  {
    title: 'Clear pathways',
    body: 'Build a strong portfolio and gain experience that prepares you for full-time roles.',
  },
];

type Props = {
  internship: Internship;
};

export default function InternshipApplyScreen({ internship }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const pad = isWide ? 64 : 16;
  const [expanded, setExpanded] = useState(true);

  const { team } = internship;

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { paddingHorizontal: pad, paddingTop: isWide ? 32 : 20 }]}>
        {/* grey band behind the top half of the board card */}
        <View style={[styles.band, { left: -1000, right: -1000, height: isWide ? 240 : 180 }]} />

        <View style={[styles.board, isWide ? styles.boardWide : styles.boardStacked, { padding: isPhone ? 20 : 32 }]}>
          <View style={isWide ? { flex: 1 } : undefined}>
            <Badge label="Internship Board" />
            <Text style={[styles.title, { fontSize: isWide ? 44 : isPhone ? 30 : 36 }]}>
              Internships Available
            </Text>
            <Text style={styles.paragraph}>
              Explore career opportunities across design, engineering, and marketing. Build
              real-world experience, work with experienced teams, and take the next step in your
              professional journey.
            </Text>
            <View style={styles.chips}>
              <View style={[styles.chip, styles.chipYellow]}>
                <Text style={styles.chipText}>{INTERNSHIPS.length} open roles</Text>
              </View>
              <View style={[styles.chip, styles.chipOutline]}>
                <Text style={styles.chipText}>Updated weekly</Text>
              </View>
            </View>
          </View>

          <View style={[styles.why, isWide && { width: '36%', maxWidth: 420 }]}>
            <Badge label="Why Interns Choose Us" variant="dark" style={styles.whyBadge} />
            {REASONS.map((r) => (
              <View key={r.title} style={styles.reason}>
                <Text style={styles.reasonTitle}>{r.title}</Text>
                <Text style={styles.reasonBody}>{r.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.application, { marginTop: isWide ? 28 : 20 }]}>
          <JobRow
            title={internship.title}
            team={team}
            location={internship.location}
            type="Internship"
            kind="internship"
            expanded={expanded}
            onApply={() => setExpanded((v) => !v)}
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
    paddingBottom: 80,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  band: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.surfaceAlt,
  },
  board: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 20,
    gap: 32,
  },
  boardWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardStacked: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.black,
    letterSpacing: -0.5,
    marginTop: 18,
    marginBottom: 16,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    maxWidth: 560,
    marginBottom: 20,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipYellow: {
    backgroundColor: colors.badge,
  },
  chipOutline: {
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: colors.black,
  },
  why: {
    backgroundColor: colors.dark,
    borderRadius: 14,
    padding: 22,
    gap: 14,
  },
  whyBadge: {
    backgroundColor: '#fff3b3',
    marginBottom: 2,
  },
  reason: {
    gap: 4,
  },
  reasonTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#fff3b3',
  },
  reasonBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: '#eeeeee',
  },
  application: {
    width: '100%',
    maxWidth: 820,
    alignSelf: 'center',
  },
});
