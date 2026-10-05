import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import Badge from '../components/Badge';
import { CONTACT_EMAIL, FAQS, INQUIRY_TYPES, PHONE } from '../data/company';
import { Palette, fonts, MAX_WIDTH, WIDE_BREAKPOINT } from '../theme';
import { useThemed } from '../themeContext';

const iconStroke = (stroke: string) => ({ stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' });

function Chevron({ up = false }: { up?: boolean }) {
  const { colors } = useThemed(makeStyles);
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path d={up ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} {...iconStroke(colors.black)} strokeWidth={2.5} />
    </Svg>
  );
}

function InfoIcon({ name }: { name: 'mail' | 'phone' }) {
  const { colors, styles } = useThemed(makeStyles);
  return (
    <View style={styles.infoIcon}>
      <Svg width={16} height={16} viewBox="0 0 24 24">
        {name === 'mail' && (
          <>
            <Rect x={2} y={4} width={20} height={16} rx={2} {...iconStroke(colors.black)} />
            <Path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" {...iconStroke(colors.black)} />
          </>
        )}
        {name === 'phone' && (
          <Path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            {...iconStroke(colors.black)}
          />
        )}
      </Svg>
    </View>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: object }) {
  const { colors, styles } = useThemed(makeStyles);
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ContactForm({ twoColumns }: { twoColumns: boolean }) {
  const { colors, styles } = useThemed(makeStyles);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiry, setInquiry] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const pair = twoColumns ? styles.pair : styles.pairStacked;

  // No backend yet: the inquiry is handed to the visitor's email app, pre-filled.
  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email address and message.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim() || '—'}`,
      `Inquiry type: ${inquiry}`,
      '',
      message.trim(),
    ].join('\n');
    Linking.openURL(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Inquiry: ${inquiry}`)}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Send Us a Message</Text>

      <View style={pair}>
        <Field label="YOUR FULL NAME" style={styles.flex}>
          <TextInput style={styles.input} placeholder="Jane Doe" placeholderTextColor={colors.placeholder} value={name} onChangeText={setName} />
        </Field>
        <Field label="YOUR EMAIL ADDRESS" style={styles.flex}>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Field>
      </View>

      <View style={pair}>
        <Field label="PHONE NUMBER" style={styles.flex}>
          <TextInput
            style={styles.input}
            placeholder="+91 98765 43210"
            placeholderTextColor={colors.placeholder}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </Field>
        <Field label="INQUIRY TYPE" style={styles.flex}>
          <Pressable
            style={[styles.input, styles.select]}
            onPress={() => setMenuOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityState={{ expanded: menuOpen }}
          >
            <Text style={styles.selectText} numberOfLines={1}>{inquiry}</Text>
            <Chevron up={menuOpen} />
          </Pressable>
          {menuOpen && (
            <View style={styles.menu}>
              {INQUIRY_TYPES.map((type) => (
                <Pressable
                  key={type}
                  style={[styles.menuItem, type === inquiry && styles.menuItemActive]}
                  onPress={() => {
                    setInquiry(type);
                    setMenuOpen(false);
                  }}
                >
                  <Text style={styles.selectText}>{type}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </Field>
      </View>

      <Field label="MESSAGE DETAILS">
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Tell us about your specific technical requirements or target launch date..."
          placeholderTextColor={colors.placeholder}
          multiline
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />
      </Field>

      {!!error && <Text style={styles.error}>{error}</Text>}
      {sent && !error && (
        <Text style={styles.success}>Your email app should open with the message ready to send.</Text>
      )}

      <Pressable style={styles.submit} onPress={submit} accessibilityRole="button">
        <Text style={styles.submitText}>SUBMIT INQUIRY</Text>
        <Svg width={14} height={14} viewBox="0 0 24 24">
          <Path d="M5 12h14M13 6l6 6-6 6" stroke={colors.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </Svg>
      </Pressable>
    </View>
  );
}

export default function ContactScreen() {
  const { colors, styles } = useThemed(makeStyles);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const isPhone = width < 600;
  const pad = isWide ? 64 : 16;
  const [openFaqs, setOpenFaqs] = useState<boolean[]>(FAQS.map(() => true));

  const info = [
    { icon: 'mail' as const, label: 'EMAIL ADDRESS', value: CONTACT_EMAIL, url: `mailto:${CONTACT_EMAIL}` },
    { icon: 'phone' as const, label: 'DIRECT TECH HOTLINE', value: PHONE, url: `tel:${PHONE.replace(/\s/g, '')}` },
  ];

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { paddingHorizontal: pad, paddingTop: isWide ? 70 : 44, paddingBottom: isWide ? 90 : 56 }]}>
        {/* ---------- Hero ---------- */}
        <Badge label="24/7 Availability" />
        <Text style={[styles.title, { fontSize: isWide ? 42 : isPhone ? 30 : 36, lineHeight: isWide ? 48 : isPhone ? 35 : 42 }]}>
          Get in Touch. Let's Build Something Trusted Together.
        </Text>
        <Text style={styles.paragraph}>
          Have questions about custom enterprise applications, product architecture cycles, or our
          rigorous developer cohort paths? Reach our team directly.
        </Text>

        {/* ---------- Form + details ---------- */}
        <View style={[isWide ? styles.row : styles.column, { marginTop: isWide ? 40 : 28 }]}>
          <View style={isWide ? { flex: 1.15 } : undefined}>
            <ContactForm twoColumns={!isPhone} />
          </View>

          <View style={isWide ? { flex: 1 } : undefined}>
            <View style={styles.infoList}>
              {info.map((item) => (
                <Pressable key={item.label} style={styles.infoRow} onPress={() => Linking.openURL(item.url)}>
                  <InfoIcon name={item.icon} />
                  <View style={styles.flexShrink}>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* ---------- FAQ ---------- */}
      <View style={[styles.gray, { paddingVertical: isWide ? 80 : 56 }]}>
        <View style={[styles.container, { paddingHorizontal: pad }]}>
          <View style={styles.faqHead}>
            <Badge label="Intellectual Queries" style={{ alignSelf: 'center' }} />
            <Text style={[styles.faqTitle, { fontSize: isWide ? 30 : 24 }]}>Frequently Answered Questions</Text>
          </View>
          <View style={styles.faqs}>
            {FAQS.map((faq, i) => (
              <Pressable
                key={faq.q}
                style={styles.faq}
                onPress={() => setOpenFaqs((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                accessibilityRole="button"
                accessibilityState={{ expanded: openFaqs[i] }}
              >
                <View style={styles.faqQuestionRow}>
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <Chevron up={openFaqs[i]} />
                </View>
                {openFaqs[i] && <Text style={styles.faqAnswer}>{faq.a}</Text>}
              </Pressable>
            ))}
          </View>
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
    alignItems: 'flex-start',
    gap: 52,
  },
  column: {
    gap: 36,
  },
  flex: {
    flex: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  gray: {
    backgroundColor: colors.section,
  },

  // Hero
  title: {
    fontFamily: fonts.heading,
    letterSpacing: -0.5,
    color: colors.black,
    maxWidth: 620,
    marginTop: 18,
    marginBottom: 18,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    maxWidth: 560,
  },

  // Form
  form: {
    backgroundColor: colors.section,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    padding: 26,
    gap: 16,
  },
  formTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.black,
    marginBottom: 4,
  },
  pair: {
    flexDirection: 'row',
    gap: 12,
  },
  pairStacked: {
    gap: 16,
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
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  selectText: {
    flexShrink: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black,
  },
  menu: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingVertical: 4,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  menuItemActive: {
    backgroundColor: colors.badge,
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
    marginTop: 6,
  },
  submitText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.white,
  },

  // Contact details
  infoList: {
    gap: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.section,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontFamily: fonts.semibold,
    fontSize: 9.5,
    letterSpacing: 0.3,
    color: colors.subtle,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.black,
  },

  // FAQ
  faqHead: {
    alignItems: 'center',
    marginBottom: 32,
  },
  faqTitle: {
    fontFamily: fonts.heading,
    color: colors.black,
    textAlign: 'center',
    marginTop: 14,
  },
  faqs: {
    width: '100%',
    maxWidth: 820,
    alignSelf: 'center',
    gap: 12,
  },
  faq: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 16,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 14.5,
    color: colors.black,
  },
  faqAnswer: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.text,
    marginTop: 10,
  },
});
