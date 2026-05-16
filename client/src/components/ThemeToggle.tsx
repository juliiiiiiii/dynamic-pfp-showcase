import { useTheme } from '@/context/ThemeContext';
 
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
 
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
      title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
    >
      {theme === 'light' ? (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1"  x2="12" y2="3"  />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1"  y1="12" x2="3"  y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}