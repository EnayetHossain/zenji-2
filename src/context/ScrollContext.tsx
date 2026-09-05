import { createContext, useContext, useState, useEffect } from "react";

interface ScrollContextType {
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ scrolled: false });

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <ScrollContext.Provider value={{ scrolled }}>{children}</ScrollContext.Provider>;
}

export const useScroll = () => useContext(ScrollContext);
