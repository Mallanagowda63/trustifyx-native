import { useRef, useState } from 'react';
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
import { Internship } from './src/data/careers';
import { ThemeProvider, useTheme } from './src/themeContext';

// Page order on the single scrolling site; links without a section are ignored.
const SECTIONS: Page[] = ['Home', 'About Us', 'Services', 'Products', 'Careers', 'Contact Us'];

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}

function Site() {
  const { colors, scheme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Partial<Record<Page, number>>>({});
  const [active, setActive] = useState<Page>('Home');
  // When set, the internship application page replaces the scrolling site.
  const [internship, setInternship] = useState<Internship | null>(null);
  // Section to jump to once the site re-mounts after leaving the internship page.
  const pendingSection = useRef<Page | null>(null);
  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: colors.white }} />;
  }

  const scrollTo = (page: Page) => {
    if (internship) {
      if (!SECTIONS.includes(page)) return;
      pendingSection.current = page;
      setActive(page);
      setInternship(null);
      return;
    }
    const y = offsets.current[page];
    if (y === undefined) return;
    setActive(page);
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  // Highlight the last section whose top has passed the upper part of the viewport.
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y + 120;
    let current: Page = 'Home';
    for (const page of SECTIONS) {
      const top = offsets.current[page];
      if (top !== undefined && y >= top) current = page;
    }
    if (current !== active) setActive(current);
  };

  const content: Record<string, React.ReactNode> = {
    Home: <HomeScreen onExploreServices={() => scrollTo('Services')} />,
    'About Us': <AboutScreen onOurServices={() => scrollTo('Services')} />,
    Services: <ServicesScreen />,
    Products: <ProductsScreen />,
    Careers: (
      <CareersScreen
        onExplorePositions={(offsetY) =>
          scrollRef.current?.scrollTo({ y: (offsets.current.Careers ?? 0) + offsetY, animated: true })
        }
        onApplyInternship={(item) => {
          setActive('Careers');
          setInternship(item);
        }}
      />
    ),
    'Contact Us': <ContactScreen />,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Navbar active={active} onNavigate={scrollTo} />
        {internship ? (
          <ScrollView key="internship">
            <InternshipApplyScreen internship={internship} />
            <Footer onNavigate={scrollTo} />
          </ScrollView>
        ) : (
          <ScrollView key="site" ref={scrollRef} onScroll={onScroll} scrollEventThrottle={16}>
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
            <Footer onNavigate={scrollTo} />
          </ScrollView>
        )}
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
