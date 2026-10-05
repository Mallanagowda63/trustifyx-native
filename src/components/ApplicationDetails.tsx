import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { CONTACT_EMAIL } from '../data/company';
import { Palette, fonts } from '../theme';
import { useThemed } from '../themeContext';

const JOB_CHECKLIST = [
  'Updated resume/CV (PDF format preferred)',
  'Cover letter explaining your interest',
  'Portfolio or links to previous work',
  'Expected salary and availability/notice period',
  '2-3 professional references',
];

const INTERN_CHECKLIST = [
  'Updated resume/CV (PDF format preferred)',
  'Cover letter explaining your interest',
  'Portfolio or links to previous work',
  'Expected availability and internship start date',
  'Academic transcripts or relevant coursework',
];

type Props = {
  role: string;
  kind: 'job' | 'internship';
};

export default function ApplicationDetails({ role, kind }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const subject = `Application: ${role}`;
  const checklist = kind === 'job' ? JOB_CHECKLIST : INTERN_CHECKLIST;
  const steps = [
    'Prepare your resume/CV and cover letter.',
    'Include relevant portfolio or GitHub links.',
    `Send your application via email to ${CONTACT_EMAIL} with the subject line ${subject}.`,
  ];

  const applyByEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.eyebrow}>APPLICATION DETAILS</Text>
      <Text style={styles.title}>How to Apply</Text>
      <Text style={styles.intro}>Follow the steps below to submit your application for this role.</Text>

      <View style={styles.steps}>
        {steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subTitle}>What to include in your application</Text>
      <View style={styles.list}>
        {checklist.map((item) => (
          <View key={item} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.emailBox}>
        <Text style={styles.emailLabel}>APPLICATION EMAIL</Text>
        <Text style={styles.email} selectable>
          {CONTACT_EMAIL}
        </Text>
      </View>

      <View style={styles.notice}>
        <View style={styles.clock}>
          <Svg width={12} height={12} viewBox="0 0 24 24">
            <Circle cx={12} cy={12} r={9} stroke={colors.onYellow} strokeWidth={2.5} fill="none" />
            <Path d="M12 7v5l3 2" stroke={colors.onYellow} strokeWidth={2.5} strokeLinecap="round" fill="none" />
          </Svg>
        </View>
        <Text style={styles.noticeText}>We typically respond within 5-7 business days</Text>
      </View>

      <Pressable style={styles.button} onPress={applyByEmail} accessibilityRole="button">
        <Text style={styles.buttonText}>APPLY VIA EMAIL</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  panel: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 18,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.3,
    color: colors.subtle,
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.black,
    marginBottom: 6,
  },
  intro: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.text,
    marginBottom: 16,
  },
  steps: {
    gap: 10,
    marginBottom: 18,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.black,
    paddingTop: 1,
  },
  subTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.black,
    marginBottom: 12,
  },
  list: {
    gap: 9,
    marginBottom: 18,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.black,
  },
  listText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.text,
  },
  emailBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
  },
  emailLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    letterSpacing: 0.3,
    color: colors.subtle,
    marginBottom: 4,
  },
  email: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.black,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.notice,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  clock: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.black,
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },
});
