import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Badge from './Badge';
import { CONTACT_EMAIL, GOOGLE_REVIEW_FALLBACK, GOOGLE_REVIEW_URL } from '../data/company';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const RATING_WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

function Star({ filled, size = 18, color = '#ffe600', empty = '#4a4a50' }: { filled: boolean; size?: number; color?: string; empty?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={STAR} fill={filled ? color : 'none'} stroke={filled ? color : empty} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

// Google review card on the left; a private feedback form (sent to our inbox) on the right.
export default function ReviewsSection() {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const pad = isWide ? 64 : 16;

  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  // No backend yet: the feedback is handed to the visitor's email app, pre-filled.
  const submit = () => {
    if (!rating) return setError('Please choose a star rating.');
    if (!name.trim() || !message.trim()) return setError('Please add your name and feedback.');
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    const body = [
      `Rating: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5 – ${RATING_WORDS[rating]})`,
      `Name: ${name.trim()}`,
      `Email: ${email.trim() || '—'}`,
      '',
      message.trim(),
    ].join('\n');
    Linking.openURL(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website feedback: ${rating}/5 from ${name.trim()}`)}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  return (
    <View style={[styles.section, { paddingVertical: isWide ? 80 : 56 }]}>
      <View style={[styles.container, { paddingHorizontal: pad }]}>
        <Badge label="Reviews & Feedback" />
        <Text style={[styles.title, { fontSize: isWide ? 36 : isPhone ? 26 : 30, lineHeight: isWide ? 42 : isPhone ? 32 : 36 }]}>
          Worked with us? Tell the world.
        </Text>
        <Text style={styles.paragraph}>
          Clients, interns and partners — your honest review helps others find and trust TrustifyX,
          and every piece of feedback goes straight to our team.
        </Text>

        <View style={[isWide ? styles.row : styles.column, { marginTop: isWide ? 36 : 28 }]}>
          {/* Google review */}
          <View style={[styles.googleCard, isWide && { flex: 1 }]}>
            <View style={styles.googleTop}>
              <View style={styles.gBadge}>
                <Text style={styles.gLetter}>G</Text>
              </View>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled size={20} />
                ))}
              </View>
            </View>
            <Text style={styles.googleTitle}>Review us on Google</Text>
            <Text style={styles.googleBody}>
              Takes 30 seconds. Your Google review appears when people search for TrustifyX, and helps
              us reach more clients and students.
            </Text>
            <Pressable
              onPress={() => Linking.openURL(GOOGLE_REVIEW_URL || GOOGLE_REVIEW_FALLBACK)}
              style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => [styles.googleBtn, (hovered || pressed) && styles.googleBtnActive]}
              accessibilityRole="link"
            >
              <Text style={styles.googleBtnText}>Write a Google review</Text>
              <Svg width={14} height={14} viewBox="0 0 24 24">
                <Path d="M7 17L17 7M8 7h9v9" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
            </Pressable>
          </View>

          {/* Private feedback */}
          <View style={[styles.form, isWide && { flex: 1.25 }]}>
            <Text style={styles.formTitle}>Share your feedback</Text>

            <View style={styles.field}>
              <Text style={styles.label}>YOUR RATING</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Pressable
                    key={i}
                    onPress={() => setRating(i)}
                    hitSlop={4}
                    accessibilityRole="button"
                    accessibilityLabel={`${i} star${i > 1 ? 's' : ''}`}
                    accessibilityState={{ selected: rating === i }}
                  >
                    <Star filled={i <= rating} size={30} empty={colors.muted} />
                  </Pressable>
                ))}
                {!!rating && <Text style={styles.ratingWord}>{RATING_WORDS[rating]}</Text>}
              </View>
            </View>

            <View style={isPhone ? styles.pairStacked : styles.pair}>
              <View style={[styles.field, styles.flex]}>
                <Text style={styles.label}>YOUR NAME</Text>
                <TextInput style={styles.input} placeholder="Jane Doe" placeholderTextColor={colors.placeholder} value={name} onChangeText={setName} />
              </View>
              <View style={[styles.field, styles.flex]}>
                <Text style={styles.label}>EMAIL (OPTIONAL)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>YOUR FEEDBACK</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="What did you like? What could we do better?"
                placeholderTextColor={colors.placeholder}
                multiline
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {!!error && <Text style={styles.error}>{error}</Text>}
            {sent && !error && <Text style={styles.success}>Thank you! Your email app should open with your feedback ready to send.</Text>}

            <Pressable style={styles.submit} onPress={submit} accessibilityRole="button">
              <Text style={styles.submitText}>SEND FEEDBACK</Text>
              <Svg width={14} height={14} viewBox="0 0 24 24">
                <Path d="M5 12h14M13 6l6 6-6 6" stroke={colors.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const makeStyles = (colors: Palette) =>
  StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  container: {
    width: '100%',
    maxWidth: MAX_WIDTH + 128,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    letterSpacing: -0.5,
    color: colors.black,
    marginTop: 16,
    marginBottom: 14,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    maxWidth: 600,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 28,
  },
  column: {
    gap: 20,
  },
  flex: {
    flex: 1,
  },

  // Google card — always dark so the yellow stars pop in both modes
  googleCard: {
    backgroundColor: '#111114',
    borderWidth: 1,
    borderColor: '#2a2a30',
    borderRadius: 16,
    padding: 28,
    justifyContent: 'center',
  },
  googleTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  gBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gLetter: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: '#4285F4',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  googleTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: '#ffffff',
    marginTop: 22,
  },
  googleBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#a9a9b0',
    marginTop: 10,
    maxWidth: 420,
  },
  googleBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.yellow,
  },
  googleBtnActive: {
    backgroundColor: '#fff27a',
  },
  googleBtnText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#111111',
  },

  // Feedback form
  form: {
    backgroundColor: colors.section,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 26,
    gap: 16,
  },
  formTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.black,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.3,
    color: colors.subtle,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingWord: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.black,
    marginLeft: 8,
  },
  pair: {
    flexDirection: 'row',
    gap: 12,
  },
  pairStacked: {
    gap: 16,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black,
    minHeight: 42,
  },
  textarea: {
    minHeight: 96,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: '#c62828',
  },
  success: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: '#2e7d32',
  },
  submit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.black,
    borderRadius: 6,
    paddingVertical: 13,
  },
  submitText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },
});
