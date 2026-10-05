import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import Logo from './Logo';
import { Page } from './Navbar';
import { LegalId } from '../data/legal';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

// Each footer link jumps to the site section that covers it, or opens a legal page.
type FooterLink = { label: string; to: Page } | { label: string; legal: LegalId };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', to: 'About Us' },
      { label: 'Our Teams', to: 'About Us' },
      { label: 'Careers', to: 'Careers' },
      { label: 'Newsroom', to: 'Home' },
    ],
  },
  {
    title: 'SERVICES',
    links: [
      { label: 'Enterprise Software', to: 'Services' },
      { label: 'Mobile Development', to: 'Services' },
      { label: 'DevOps Pipelines', to: 'Services' },
      { label: 'Consultation', to: 'Contact Us' },
    ],
  },
  {
    title: 'INTERNSHIPS',
    links: [
      { label: 'Web Dev Track', to: 'Careers' },
      { label: 'ML & Data Science', to: 'Careers' },
      { label: 'UI/UX Cohort', to: 'Careers' },
      { label: 'Cloud Infrastructure', to: 'Careers' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', legal: 'privacy' },
      { label: 'Terms of Service', legal: 'terms' },
      { label: 'Compliance Guidelines', legal: 'compliance' },
    ],
  },
];

// Footer is always dark, so its icons stay white in both modes.
const iconProps = { stroke: '#ffffff', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

const SOCIAL = [
  {
    name: 'Facebook',
    icon: <Path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" {...iconProps} />,
  },
  {
    name: 'Twitter',
    icon: (
      <Path
        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
        {...iconProps}
      />
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <>
        <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" {...iconProps} />
        <Rect x={2} y={9} width={4} height={12} {...iconProps} />
        <Circle cx={4} cy={4} r={2} {...iconProps} />
      </>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <>
        <Path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          {...iconProps}
        />
        <Path d="M9 18c-4.51 2-5-2-7-2" {...iconProps} />
      </>
    ),
  },
];

type Props = {
  onNavigate: (page: Page) => void;
  onOpenLegal: (doc: LegalId) => void;
};

export default function Footer({ onNavigate, onOpenLegal }: Props) {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const pad = isWide ? 64 : 16;

  return (
    <View style={styles.footer}>
      <View style={[styles.container, { paddingHorizontal: pad, paddingTop: isWide ? 56 : 40 }]}>
        <View style={[styles.top, !isWide && styles.topStacked]}>
          <View style={styles.brand}>
            <Pressable style={styles.logoBox} onPress={() => onNavigate('Home')} accessibilityRole="link">
              <Logo size={14} />
            </Pressable>
            <Text style={styles.tagline}>
              Providing premier software engineering suites while raising the technological bar of
              development cohorts globally.
            </Text>
            <View style={styles.social}>
              {SOCIAL.map((s) => (
                <View key={s.name} style={styles.socialIcon} accessibilityLabel={s.name}>
                  <Svg width={13} height={13} viewBox="0 0 24 24">
                    {s.icon}
                  </Svg>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.columns, isPhone && styles.columnsPhone]}>
            {COLUMNS.map((col) => (
              <View key={col.title} style={[styles.column, isPhone && { width: '50%' }]}>
                <Text style={styles.colTitle}>{col.title}</Text>
                {col.links.map((link) => (
                  <Pressable
                    key={link.label}
                    onPress={() => ('legal' in link ? onOpenLegal(link.legal) : onNavigate(link.to))}
                    accessibilityRole="link"
                  >
                    <Text style={styles.link}>{link.label}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.bottom, isPhone && styles.bottomStacked]}>
          <Text style={styles.small}>© 2026 TrustifyX. All rights reserved.</Text>
          <Text style={styles.small}>CIN: U72900XX2024PTC000000</Text>
        </View>
      </View>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  footer: {
    backgroundColor: colors.dark,
  },
  container: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 48,
    paddingBottom: 40,
  },
  topStacked: {
    flexDirection: 'column',
  },
  brand: {
    maxWidth: 320,
  },
  logoBox: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 18,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 19,
    color: '#a8a8a8',
    marginBottom: 20,
  },
  social: {
    flexDirection: 'row',
    gap: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columns: {
    flexDirection: 'row',
    gap: 48,
  },
  columnsPhone: {
    flexWrap: 'wrap',
    gap: 0,
    rowGap: 28,
  },
  column: {
    gap: 12,
    minWidth: 130,
  },
  colTitle: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.3,
    color: colors.yellow,
    marginBottom: 2,
  },
  link: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#b5b5b5',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2e2e2e',
    paddingVertical: 20,
  },
  bottomStacked: {
    flexDirection: 'column',
    gap: 8,
  },
  small: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: '#8f8f8f',
  },
});
