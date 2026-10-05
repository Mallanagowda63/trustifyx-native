import { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';

// Phones already scroll smoothly; this just animates programmatic jumps.
// The web version (smoothScroll.web.ts) adds eased wheel scrolling.
export function useSmoothScroll(_enabled = true) {
  const scrollRef = useRef<ScrollView | null>(null);
  const setRef = useCallback((instance: ScrollView | null) => {
    scrollRef.current = instance;
  }, []);
  const scrollTo = useCallback((y: number) => scrollRef.current?.scrollTo({ y, animated: true }), []);
  return { scrollRef, setRef, scrollTo };
}
