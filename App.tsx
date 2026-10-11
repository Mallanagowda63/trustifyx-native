import { useCallback, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Navbar, { Page } from './src/components/Navbar';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import CareersScreen from './src/screens/CareersScreen';
import InternshipApplyScreen from './src/screens/InternshipApplyScreen';
import ContactScreen from './src/screens/ContactScreen';
import Footer from './src/components/Footer';
import ComingSoonScreen from './src/screens/ComingSoonScreen';
import { LAUNCH_AT } from './src/data/company';
import { Internship } from './src/data/careers';
import { LegalId } from './src/data/legal';
import LegalScreen from './src/screens/LegalScreen';
import { ThemeProvider, useTheme } from './src/themeContext';
import { useSmoothScroll } from './src/smoothScroll';

// Page order on the single scrolling site; links without a section are ignored.
const SECTIONS: Page[] = ['Home', 'About Us', 'Services', 'Products', 'Careers', 'Contact Us'];

export default function App() {
  return (
    <ThemeProvider>
      <FontGate />
    </ThemeProvider>
  );
}

function FontGate() {
  const { colors } = useTheme();
  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [launched, setLaunched] = useState(() => Date.now() >= LAUNCH_AT);
  const onLaunch = useCallback(() => setLaunched(true), []);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: launched ? colors.white : '#0a0a0c' }} />;
  }
  return launched ? <Site /> : <ComingSoonScreen onLaunch={onLaunch} />;
}

function Site() {
  const { colors, scheme } = useTheme();
  const offsets = useRef<Partial<Record<Page, number>>>({});
  const [active, setActive] = useState<Page>('Home');
  const activeRef = useRef<Page>('Home');
  // When set, the internship application page replaces the scrolling site.
  const [internship, setInternship] = useState<Internship | null>(null);
  // When set, a legal page (privacy, terms, compliance) replaces the scrolling site.
  const [legalDoc, setLegalDoc] = useState<LegalId | null>(null);
  const awayRef = useRef(false);
  awayRef.current = !!internship || !!legalDoc;
  // Section to jump to once the site re-mounts after leaving the internship page.
  const pendingSection = useRef<Page | null>(null);
  const { scrollRef, setRef, scrollTo: smoothScrollTo } = useSmoothScroll(!internship && !legalDoc);

  // Only the navbar depends on `active`; the sections below are memoized, so
  // crossing a section boundary while scrolling doesn't re-render the whole page.
  const highlight = useCallback((page: Page) => {
    activeRef.current = page;
    setActive(page);
  }, []);

  const scrollTo = useCallback(
    (page: Page) => {
      if (awayRef.current) {
        if (!SECTIONS.includes(page)) return;
        pendingSection.current = page;
        highlight(page);
        setInternship(null);
        setLegalDoc(null);
        return;
      }
      const y = offsets.current[page];
      if (y === undefined) return;
      highlight(page);
      smoothScrollTo(y);
    },
    [highlight, smoothScrollTo],
  );

  // Highlight the last section whose top has passed the upper part of the viewport.
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y + 120;
      let current: Page = 'Home';
      for (const page of SECTIONS) {
        const top = offsets.current[page];
        if (top !== undefined && y >= top) current = page;
      }
      if (current !== activeRef.current) highlight(current);
    },
    [highlight],
  );

  const content = useMemo<Record<string, React.ReactNode>>(
    () => ({
      Home: <HomeScreen onExploreServices={() => scrollTo('Services')} />,
      'About Us': <AboutScreen onOurServices={() => scrollTo('Services')} />,
      Services: <ServicesScreen />,
      Products: <ProductsScreen onRequestDemo={() => scrollTo('Contact Us')} />,
      Careers: (
        <CareersScreen
          onExplorePositions={(offsetY) => smoothScrollTo((offsets.current.Careers ?? 0) + offsetY)}
          onApplyInternship={(item) => {
            highlight('Careers');
            setInternship(item);
          }}
        />
      ),
      'Contact Us': <ContactScreen />,
    }),
    [scrollTo, smoothScrollTo, highlight],
  );

  const footer = useMemo(
    () => (
      <Footer
        onNavigate={scrollTo}
        onOpenLegal={(doc) => {
          setInternship(null);
          setLegalDoc(doc);
        }}
      />
    ),
    [scrollTo],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Navbar active={active} onNavigate={scrollTo} />
        {legalDoc ? (
          <ScrollView key={`legal-${legalDoc}`}>
            <LegalScreen doc={legalDoc} onSelect={setLegalDoc} />
            {footer}
          </ScrollView>
        ) : internship ? (
          <ScrollView key="internship">
            <InternshipApplyScreen internship={internship} />
            {footer}
          </ScrollView>
        ) : (
          <ScrollView key="site" ref={setRef} onScroll={onScroll} scrollEventThrottle={16}>
            {SECTIONS.map((page) => (
              <View
                key={page}
                onLayout={(e) => {
                  const y = e.nativeEvent.layout.y;
                  offsets.current[page] = y;
                  if (pendingSection.current === page) {
                    pendingSection.current = null;
                    scrollRef.current?.scrollTo({ y, animated: false });
                  }
                }}
              >
                {content[page]}
              </View>
            ))}
            {footer}
          </ScrollView>
        )}
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
