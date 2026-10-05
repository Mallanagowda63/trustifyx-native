import { Linking, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Badge from '../components/Badge';
import { CONTACT_EMAIL } from '../data/company';
import { LEGAL_DOCS, LEGAL_ORDER, LegalId } from '../data/legal';
import { Palette, fonts, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

type Props = {
  doc: LegalId;
  onSelect: (doc: LegalId) => void;
};

export default function LegalScreen({ doc, onSelect }: Props) {
  const { styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const current = LEGAL_DOCS[doc];

  return (
    <View style={styles.screen}>
      <View style={[styles.band, { paddingTop: isWide ? 64 : 40, paddingBottom: isWide ? 48 : 32 }]}>
        <View style={[styles.column, { paddingHorizontal: isWide ? 32 : 16 }]}>
          <Badge label="Legal" />
          <Text style={[styles.title, { fontSize: isWide ? 44 : isPhone ? 30 : 36 }]}>{current.title}</Text>
          <Text style={styles.summary}>{current.summary}</Text>
          <Text style={styles.updated}>Last updated: {current.updated}</Text>

          <View style={styles.tabs}>
            {LEGAL_ORDER.map((id) => (
              <Pressable
                key={id}
                onPress={() => onSelect(id)}
                style={[styles.tab, id === doc && styles.tabActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: id === doc }}
              >
                <Text style={[styles.tabText, id === doc && styles.tabTextActive]}>{LEGAL_DOCS[id].title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.column, { paddingHorizontal: isWide ? 32 : 16, paddingTop: isWide ? 48 : 32, paddingBottom: isWide ? 80 : 56 }]}>
        {current.sections.map((section) => (
          <View key={section.heading} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            {section.paragraphs?.map((p) => (
              <Text key={p} style={styles.paragraph}>
                {p}
              </Text>
            ))}
            {section.bullets && (
              <View style={styles.bullets}>
                {section.bullets.map((b) => (
                  <View key={b} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            )}
            {section.note && <Text style={[styles.paragraph, styles.note]}>{section.note}</Text>}
          </View>
        ))}

        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>Questions about this page?</Text>
          <Pressable onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(current.title)}`)} accessibilityRole="link">
            <Text style={styles.contactLink}>{CONTACT_EMAIL}</Text>
          </Pressable>
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
    band: {
      backgroundColor: colors.section,
      borderBottomWidth: 1,
      borderBottomColor: colors.line,
    },
    column: {
      width: '100%',
      maxWidth: 860,
      alignSelf: 'center',
    },
    title: {
      fontFamily: fonts.heading,
      color: colors.black,
      letterSpacing: -0.5,
      marginTop: 16,
      marginBottom: 14,
    },
    summary: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 24,
      color: colors.text,
      maxWidth: 680,
      marginBottom: 10,
    },
    updated: {
      fontFamily: fonts.medium,
      fontSize: 12.5,
      color: colors.muted,
      marginBottom: 24,
    },
    tabs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tab: {
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.white,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    tabActive: {
      backgroundColor: colors.black,
      borderColor: colors.black,
    },
    tabText: {
      fontFamily: fonts.medium,
      fontSize: 12.5,
      color: colors.black,
    },
    tabTextActive: {
      color: colors.white,
    },
    section: {
      marginBottom: 28,
    },
    heading: {
      fontFamily: fonts.headingBold,
      fontSize: 19,
      color: colors.black,
      marginBottom: 10,
    },
    paragraph: {
      fontFamily: fonts.body,
      fontSize: 14.5,
      lineHeight: 24,
      color: colors.text,
      marginBottom: 8,
    },
    note: {
      marginTop: 10,
      marginBottom: 0,
    },
    bullets: {
      gap: 8,
      marginTop: 2,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.yellow,
      marginTop: 9,
    },
    bulletText: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 14.5,
      lineHeight: 24,
      color: colors.text,
    },
    contactBox: {
      marginTop: 12,
      backgroundColor: colors.section,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: 12,
      padding: 20,
      gap: 6,
    },
    contactTitle: {
      fontFamily: fonts.headingBold,
      fontSize: 16,
      color: colors.black,
    },
    contactLink: {
      fontFamily: fonts.semibold,
      fontSize: 14,
      color: colors.black,
      textDecorationLine: 'underline',
    },
  });
