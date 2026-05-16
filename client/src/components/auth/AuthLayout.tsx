import { Button } from '@/components/button';
import { useTheme } from '@/context/ThemeContext';
 
const borderAnimation = `
  @keyframes spin-gradient {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animated-border {
    position: relative;
    padding: 3px;
    border-radius: 20px;
    overflow: hidden;
  }
  .animated-border::before {
    content: '';
    position: absolute;
    inset: -100%;
    background: conic-gradient(#2979ff, #7c3aed, #a855f7, #2979ff);
    animation: spin-gradient 3s linear infinite;
  }
`;
 
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
 
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {

    const { theme } = useTheme();

    const isDark = theme === 'dark';

    const backgroundImage = isDark ? 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)' : 'radial-gradient(circle, #2c2c2c 1px, transparent 1px)'

  return (
    <>
      <style>{borderAnimation}</style>
 
      <div className="min-h-screen bg-[#f8f8f6] dark:bg-gray-950 flex flex-col items-center justify-center font-sans relative overflow-hidden transition-colors duration-300">
 
        {/* Background dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage,
            backgroundSize: '28px 28px',
          }}
        />
 
        {/* Back button */}
        <div className="absolute top-8 left-8 w-40">
          <Button text="Volver al inicio" href="/" />
        </div>
 
        {/* App title */}
        <h1 className="text-[13px] font-semibold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-8 relative z-10">
          Dynamic PFP Showcase
        </h1>
 
        {/* Animated border wrapper */}
        <div className="animated-border shadow-xl z-10">
          <div className="relative bg-white dark:bg-gray-900 rounded-[17px] p-10 w-[340px] flex flex-col transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              {title}
            </h2>
            <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-7">
              {subtitle}
            </p>
 
            {children}
          </div>
        </div>
 
      </div>
    </>
  );
}