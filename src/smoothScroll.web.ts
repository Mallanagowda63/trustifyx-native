import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

type Scrollable = ScrollView & { getScrollableNode?: () => HTMLElement };

// Eased mouse-wheel scrolling and gliding jumps for the website, via Lenis.
// Skipped for visitors who ask their system for reduced motion.
// Attach with `ref={setRef}`: the ScrollView can mount after this hook first runs
// (the safe-area wrapper waits for measurements), so we track the node in state.
export function useSmoothScroll(enabled = true) {
  const scrollRef = useRef<ScrollView | null>(null);
  const [node, setNode] = useState<Scrollable | null>(null);
  const lenis = useRef<Lenis | null>(null);

  const setRef = useCallback((instance: ScrollView | null) => {
    scrollRef.current = instance;
    setNode(instance as Scrollable | null);
  }, []);

  useEffect(() => {
    const wrapper = node?.getScrollableNode?.();
    const content = wrapper?.firstElementChild;
    if (!enabled || !wrapper || !content) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // react-native-web replaces the node's scrollTo with RN's ({ x, y, animated }) version,
    // but Lenis calls the DOM form ({ top, behavior }). Route DOM-style calls to the browser.
    const rnScrollTo = wrapper.scrollTo;
    wrapper.scrollTo = function (this: HTMLElement, ...args: unknown[]) {
      const [arg] = args;
      if (arg && typeof arg === 'object' && ('top' in arg || 'left' in arg)) {
        return (HTMLElement.prototype.scrollTo as (options: ScrollToOptions) => void).call(this, arg as ScrollToOptions);
      }
      return (rnScrollTo as (...a: unknown[]) => void).apply(this, args);
    } as HTMLElement['scrollTo'];

    const instance = new Lenis({ wrapper, content, lerp: 0.1, smoothWheel: true, autoRaf: true });
    lenis.current = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
      wrapper.scrollTo = rnScrollTo;
    };
  }, [node, enabled]);

  const scrollTo = useCallback((y: number) => {
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1.1 });
    else scrollRef.current?.scrollTo({ y, animated: true });
  }, []);

  return { scrollRef, setRef, scrollTo };
}
