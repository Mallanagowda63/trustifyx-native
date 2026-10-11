import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, Path, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';
import { SOCIAL } from '../components/Footer';
import { CONTACT_EMAIL, LAUNCH_LABEL } from '../data/company';
import { fonts } from '../theme';

// The launch page is always dark, whatever the device mode.
const C = {
  bg: '#0a0a0c',
  card: '#131316',
  cardBorder: '#26262c',
  text: '#ffffff',
  soft: '#a9a9b0',
  muted: '#6e6e76',
  yellow: '#ffe600',
};

const logo = require('../../assets/images/trustifyx-logo-dark.png');
const LOGO_RATIO = 1132 / 442;
const useNativeDriver = Platform.OS !== 'web';

const pad2 = (n: number) => String(n).padStart(2, '0');

function remaining(now: number, launchAt: number) {
  const ms = Math.max(0, launchAt - now);
  const s = Math.floor(ms / 1000);
  return { ms, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

type Props = { launchAt: number; onLaunch: () => void };

export default function ComingSoonScreen({ launchAt, onLaunch }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isPhone = width < 520;
  const [now, setNow] = useState(Date.now());
  const left = remaining(now, launchAt);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (left.ms === 0) onLaunch();
  }, [left.ms, onLaunch]);

  // Content rises in once; the status dot keeps pulsing.
  const enter = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1100, easing: Easing.out(Easing.quad), useNativeDriver }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver }),
      ]),
    ).start();
  }, [enter, pulse]);

  const units = [
    { label: 'DAYS', value: left.days },
    { label: 'HOURS', value: left.hours },
    { label: 'MINUTES', value: left.minutes },
    { label: 'SECONDS', value: left.seconds },
  ];

  const tileSize = isWide ? 128 : 104;
  const digitSize = isWide ? 60 : isPhone ? 30 : 46;
  const logoHeight = isWide ? 54 : 42;

  return (
    <View style={styles.screen}>
      <Backdrop />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingHorizontal: 16, paddingVertical: isWide ? 64 : 40 }]}>
        <Animated.View
          style={[
            styles.content,
            { opacity: enter, transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] },
          ]}
        >
          <Image source={logo} style={{ height: logoHeight, width: logoHeight * LOGO_RATIO }} resizeMode="contain" accessibilityLabel="TrustifyX" />

          <View style={styles.badge}>
            <View style={styles.dotWrap}>
              <Animated.View
                style={[
                  styles.dotRing,
                  {
                    opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }),
                    transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }],
                  },
                ]}
              />
              <View style={styles.dot} />
            </View>
            <Text style={styles.badgeText}>LAUNCHING {LAUNCH_LABEL.toUpperCase()}</Text>
          </View>

          <Text style={[styles.title, { fontSize: isWide ? 68 : isPhone ? 38 : 52, lineHeight: isWide ? 74 : isPhone ? 44 : 58 }]}>
            Something <Text style={styles.titleAccent}>trusted</Text>
            {isPhone ? ' ' : '\n'}is coming.
          </Text>

          <Text style={[styles.subtitle, { fontSize: isPhone ? 15 : 17 }]}>
            Secure, scalable software and real-world internship programs, built in Bengaluru.
            Our new home goes live when the clock hits zero.
          </Text>

          <View style={[styles.timer, isPhone && styles.timerPhone]} accessibilityRole="timer" accessibilityLabel={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds until launch`}>
            {units.map((u) => (
              <View key={u.label} style={[styles.tile, isPhone ? styles.tilePhone : { width: tileSize, height: tileSize * 1.05 }]}>
                <View style={styles.tileShine} />
                <Text style={[styles.digits, { fontSize: digitSize, lineHeight: digitSize * 1.1 }]}>{pad2(u.value)}</Text>
                <Text style={[styles.unit, { fontSize: isPhone ? 9 : 11 }]}>{u.label}</Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Hello TrustifyX')}`)}
            style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => [styles.cta, (hovered || pressed) && styles.ctaActive]}
            accessibilityRole="link"
          >
            <Text style={styles.ctaText}>Get in touch</Text>
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path d="M5 12h14M13 6l6 6-6 6" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </Svg>
          </Pressable>
          <Text style={styles.email}>{CONTACT_EMAIL}</Text>

          <View style={styles.divider} />

          <Text style={styles.followLabel}>FOLLOW THE LAUNCH</Text>
          <View style={styles.social}>
            {SOCIAL.map((s) => (
              <Pressable
                key={s.name}
                onPress={() => Linking.openURL(s.url)}
                style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => [styles.socialIcon, (hovered || pressed) && styles.socialIconActive]}
                accessibilityRole="link"
                accessibilityLabel={s.name}
              >
                <Svg width={17} height={17} viewBox="0 0 24 24">
                  {s.icon}
                </Svg>
              </Pressable>
            ))}
          </View>

          <Text style={styles.copy}>© 2026 TrustifyX. All rights reserved.</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

// Faint grid with a warm yellow glow behind the headline.
function Backdrop() {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <Pattern id="grid" width={48} height={48} patternUnits="userSpaceOnUse">
          <Path d="M48 0H0V48" stroke="#ffffff" strokeOpacity={0.045} strokeWidth={1} fill="none" />
        </Pattern>
        <RadialGradient id="glow" cx="50%" cy="22%" r="55%">
          <Stop offset="0" stopColor="#ffe600" stopOpacity={0.16} />
          <Stop offset="0.45" stopColor="#ffe600" stopOpacity={0.04} />
          <Stop offset="1" stopColor="#ffe600" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="fade" cx="50%" cy="50%" r="75%">
          <Stop offset="0.55" stopColor={C.bg} stopOpacity={0} />
          <Stop offset="1" stopColor={C.bg} stopOpacity={1} />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
      <Rect width="100%" height="100%" fill="url(#glow)" />
      <Rect width="100%" height="100%" fill="url(#fade)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignItems: 'center',
  },
  badge: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 230, 0, 0.35)',
    backgroundColor: 'rgba(255, 230, 0, 0.08)',
  },
  dotWrap: {
    width: 8,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.yellow,
  },
  dotRing: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.yellow,
  },
  badgeText: {
    flexShrink: 1,
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    letterSpacing: 1.2,
    color: C.yellow,
  },
  title: {
    fontFamily: fonts.heading,
    color: C.text,
    textAlign: 'center',
    marginTop: 28,
    letterSpacing: -1,
  },
  titleAccent: {
    color: C.yellow,
  },
  subtitle: {
    fontFamily: fonts.body,
    lineHeight: 26,
    color: C.soft,
    textAlign: 'center',
    maxWidth: 560,
    marginTop: 20,
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 44,
  },
  timerPhone: {
    width: '100%',
    gap: 8,
  },
  tilePhone: {
    flex: 1,
    paddingVertical: 18,
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.card,
    overflow: 'hidden',
  },
  tileShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.35)',
  },
  digits: {
    fontFamily: fonts.heading,
    color: C.yellow,
    fontVariant: ['tabular-nums'],
  },
  unit: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.6,
    color: C.muted,
    marginTop: 6,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 44,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: C.yellow,
  },
  ctaActive: {
    backgroundColor: '#fff27a',
    transform: [{ translateY: -1 }],
  },
  ctaText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#111111',
  },
  email: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: C.muted,
    marginTop: 12,
  },
  divider: {
    width: 56,
    height: 1,
    backgroundColor: C.cardBorder,
    marginTop: 40,
    marginBottom: 28,
  },
  followLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: C.muted,
  },
  social: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.card,
  },
  socialIconActive: {
    borderColor: C.yellow,
    backgroundColor: 'rgba(255, 230, 0, 0.12)',
  },
  copy: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#55555c',
    marginTop: 40,
  },
});
