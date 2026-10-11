import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Image, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { fonts } from '../theme';

const logo = require('../../assets/images/trustifyx-logo-dark.png');
const LOGO_RATIO = 1132 / 442;
const useNativeDriver = Platform.OS !== 'web';
const CONFETTI_COLORS = ['#ffe600', '#ffffff', '#ffd000', '#fff6b3'];
const BALLOON_COLORS = ['#ffe600', '#ffc400', '#f5f5f5', '#fff6b3', '#ffd84d'];
const HOLD_MS = 3400;
const FADE_MS = 700;

type Props = { onDone: () => void };

function Balloon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size * 1.75} viewBox="0 0 60 105">
      <Path d="M30 4C14 4 4 18 4 34c0 20 16 34 26 38 10-4 26-18 26-38C56 18 46 4 30 4z" fill={color} />
      <Path d="M26 72h8l-4 6z" fill={color} />
      <Ellipse cx={19} cy={24} rx={5} ry={10} fill="#ffffff" opacity={0.45} transform="rotate(-20 19 24)" />
      <Path d="M30 78q-6 9 2 16t-2 11" stroke="#d8d8d8" strokeOpacity={0.6} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

// Plays once when the countdown reaches zero: ring burst, "We're live.", confetti, then fades to reveal the site.
export default function LaunchOverlay({ onDone }: Props) {
  const { width, height } = useWindowDimensions();
  const isPhone = width < 600;

  const burst = useRef(new Animated.Value(0)).current;
  const text = useRef(new Animated.Value(0)).current;
  const fall = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const sweep = useRef(new Animated.Value(0)).current;

  // Balloons sweep in from the left and right edges to land all over the frame, then drift upward.
  const balloons = useMemo(() => {
    const perSide = isPhone ? 9 : 16;
    return Array.from({ length: perSide * 2 }, (_, i) => {
      const left = i % 2 === 0;
      const slot = Math.floor(i / 2);
      const size = isPhone ? 38 + Math.random() * 30 : 58 + Math.random() * 54;
      // Spread landing spots in rows down each half so the whole frame fills evenly.
      const ty = (slot / perSide) * height * 1.05 - size * 0.4 + (Math.random() - 0.5) * 40;
      const tx = left ? -size * 0.3 + Math.random() * (width * 0.5 - size * 0.4) : width * 0.5 + Math.random() * (width * 0.5 - size * 0.6);
      return {
        key: i,
        size,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        fromX: left ? -size - 40 - tx : width + 40 - tx,
        fromY: height * (0.25 + Math.random() * 0.25),
        tx,
        ty,
        delay: Math.random() * 0.4,
        tilt: (left ? 1 : -1) * (18 + Math.random() * 14),
        rise: 80 + Math.random() * 160,
      };
    });
  }, [width, height, isPhone]);

  // Each piece gets its own column, size, speed and spin; one shared progress value drives them all.
  const pieces = useMemo(
    () =>
      Array.from({ length: isPhone ? 46 : 90 }, (_, i) => ({
        key: i,
        x: Math.random() * width,
        w: 6 + Math.random() * 8,
        h: 10 + Math.random() * 10,
        delay: Math.random() * 0.35,
        speed: 0.75 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [width, isPhone],
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(burst, { toValue: 1, duration: 1100, easing: Easing.out(Easing.cubic), useNativeDriver }),
      Animated.sequence([
        Animated.delay(180),
        Animated.spring(text, { toValue: 1, friction: 6, tension: 70, useNativeDriver }),
      ]),
      Animated.timing(sweep, { toValue: 1, duration: 1500, easing: Easing.out(Easing.cubic), useNativeDriver }),
      Animated.timing(fall, { toValue: 1, duration: HOLD_MS + FADE_MS, easing: Easing.linear, useNativeDriver }),
    ]).start();
    const t = setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: FADE_MS, easing: Easing.inOut(Easing.quad), useNativeDriver }).start(() => onDone());
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [burst, text, fall, fade, sweep, onDone]);

  const ring = Math.max(width, height) * 1.6;
  const logoHeight = isPhone ? 40 : 52;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, { opacity: fade }]} pointerEvents="none">
      {/* Ring burst */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: ring,
            height: ring,
            borderRadius: ring / 2,
            marginLeft: -ring / 2,
            marginTop: -ring / 2,
            opacity: burst.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.9, 0] }),
            transform: [{ scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.02, 1] }) }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: burst.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.55, 0.25] }),
            transform: [{ scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.4] }) }],
          },
        ]}
      />

      {/* Balloons */}
      {balloons.map((b) => {
        const t = sweep.interpolate({ inputRange: [0, b.delay, b.delay + 0.6, 1], outputRange: [0, 0, 1, 1], extrapolate: 'clamp' });
        return (
          <Animated.View
            key={`b${b.key}`}
            style={{
              position: 'absolute',
              left: b.tx,
              top: b.ty,
              transform: [
                { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [b.fromX, 0] }) },
                {
                  translateY: Animated.add(
                    t.interpolate({ inputRange: [0, 1], outputRange: [b.fromY, 0] }),
                    fall.interpolate({ inputRange: [0, 1], outputRange: [0, -b.rise] }),
                  ),
                },
                { rotate: t.interpolate({ inputRange: [0, 1], outputRange: [`${b.tilt}deg`, `${b.tilt * 0.2}deg`] }) },
              ],
            }}
          >
            <Balloon size={b.size} color={b.color} />
          </Animated.View>
        );
      })}

      {/* Confetti */}
      {pieces.map((p) => {
        const start = p.delay;
        return (
          <Animated.View
            key={p.key}
            style={{
              position: 'absolute',
              top: -30,
              left: p.x,
              width: p.w,
              height: p.h,
              borderRadius: 2,
              backgroundColor: p.color,
              opacity: fall.interpolate({ inputRange: [0, start, start + 0.02, 1], outputRange: [0, 0, 1, 1] }),
              transform: [
                { translateY: fall.interpolate({ inputRange: [0, start, 1], outputRange: [0, 0, (height + 80) * p.speed] }) },
                { translateX: fall.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] }) },
                { rotate: fall.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin}deg`] }) },
              ],
            }}
          />
        );
      })}

      {/* Message */}
      <View style={styles.center}>
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: text,
            transform: [{ scale: text.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
          }}
        >
          <Image source={logo} style={{ height: logoHeight, width: logoHeight * LOGO_RATIO }} resizeMode="contain" accessibilityLabel="TrustifyX" />
          <Text style={[styles.title, { fontSize: isPhone ? 52 : 96, lineHeight: isPhone ? 58 : 104 }]}>
            We're <Text style={styles.accent}>live.</Text>
          </Text>
          <Text style={[styles.sub, { fontSize: isPhone ? 14 : 17 }]}>Welcome to the new TrustifyX</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#0a0a0c',
    overflow: 'hidden',
    zIndex: 100,
  },
  ring: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    borderWidth: 6,
    borderColor: '#ffe600',
  },
  glow: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 520,
    height: 520,
    marginLeft: -260,
    marginTop: -260,
    borderRadius: 260,
    backgroundColor: '#ffe600',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(120px)' } as object) : null),
  },
  center: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 24,
    fontFamily: fonts.heading,
    color: '#ffffff',
    letterSpacing: -2,
    textAlign: 'center',
    marginTop: 24,
  },
  accent: {
    color: '#ffe600',
  },
  sub: {
    fontFamily: fonts.semibold,
    color: '#a9a9b0',
    letterSpacing: 0.4,
    marginTop: 14,
    textAlign: 'center',
  },
});
