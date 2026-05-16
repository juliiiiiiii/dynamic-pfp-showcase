import { createContext, useContext, useState, useEffect } from 'react';
 
type Theme = 'light' | 'dark';
 
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
 
const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});
 
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  });
 
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
 
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
 
export function useTheme() {
  return useContext(ThemeContext);
}