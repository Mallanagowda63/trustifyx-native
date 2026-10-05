import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Badge from './Badge';
import ApplicationDetails from './ApplicationDetails';
import { Palette, fonts } from '../theme';
import { useThemed } from '../themeContext';

type Props = {
  title: string;
  team: string;
  location: string;
  type: string;
  kind: 'job' | 'internship';
  expanded: boolean;
  onApply: () => void;
};

// A role listing; "Apply Now" reveals the How to Apply panel underneath.
export default function JobRow({ title, team, location, type, kind, expanded, onApply }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const stacked = width < 600;

  return (
    <View style={styles.card}>
      <View style={[styles.header, stacked && styles.headerStacked]}>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.meta}>
            <Text style={styles.team}>{team.toUpperCase()}</Text>
            <View style={styles.dot} />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Badge label={type} uppercase={false} style={styles.type} />
          <Pressable
            style={styles.apply}
            onPress={onApply}
            accessibilityRole="button"
            accessibilityState={{ expanded }}
          >
            <Text style={styles.applyText}>Apply Now</Text>
          </Pressable>
        </View>
      </View>

      {expanded && (
        <View style={styles.details}>
          <ApplicationDetails role={title} kind={kind} />
        </View>
      )}
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  card: {
    backgroundColor: colors.section,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.black,
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  team: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.3,
    color: colors.subtle,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.muted,
  },
  location: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  type: {
    borderRadius: 4,
    alignSelf: 'center',
  },
  apply: {
    backgroundColor: colors.black,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  applyText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.white,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 18,
    paddingTop: 18,
  },
});
