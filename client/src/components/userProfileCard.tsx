import { motion } from 'framer-motion';
import { getPfpUrl } from '@/services/userService';
import { useTheme } from '@/context/ThemeContext';

interface UserProfileCardProps {
  id: number;
  username: string;
  pfp: string | null;
  offset: number; // -3 to +3: 0 = center (front), ±1, ±2, ±3 = sides (back)
}

// Arc layout: offset drives scale, opacity, vertical position, and z-index
function getArcStyle(offset: number) {
  const abs = Math.abs(offset);
 
  // Scale: center is biggest, sides shrink
  const scale = 1 - abs * 0.13;
 
  // Opacity: center is fully visible, outer cards fade out
  const opacity = 1 - abs * 0.22;
 
  // Vertical lift: center is at the bottom, outer cards rise (creating arc)
  const yOffset = (abs * abs); // quadratic arc: 0, -10, -40, -90
 
  // Horizontal spacing between card centers (px)
  const xSpacing = 100;
  const xOffset = offset * xSpacing;
 
  // Z-index: center card is on top
  const zIndex = 10 - abs;
 
  return { scale, opacity, yOffset, xOffset, zIndex };
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ username, pfp, offset }) => {
  const pfpUrl = getPfpUrl(pfp);
  const { scale, opacity, yOffset, xOffset, zIndex } = getArcStyle(offset);
  const { theme } = useTheme();

  const isCenter = offset === 0;
  const isDark = theme === 'dark';

  // Tamaño de la UserProfileCard visible, antes de escalar transformar
  const baseSize = 120;

  const textColor = isCenter
    ? isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
    : isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.55)';

  const borderStyle = isCenter
    ? isDark ? '3px solid rgba(255, 255, 255, 0.9)' : '3px solid rgba(0, 0, 0, 0.15)'
    : isDark ? '3px solid rgba(255, 255, 255, 0.2)' : '3px solid rgba(0, 0, 0, 0.08)';

  const boxShadow = isCenter
    ? isDark ? '0 0 24px rgba(255, 255, 255, 0.15)' : '0 0 24px rgba(0, 0, 0, 0.10)'
    : 'none';

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        zIndex,
        transformOrigin: 'bottom center'
      }}
      initial={{
        x: (xOffset - 150),
        y: yOffset - 30,
        scale: scale,
        opacity: 0
      }}
      animate={{
        x: xOffset - baseSize / 2,
        y: yOffset,
        scale,
        opacity
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 28
      }}
      exit={{
        x: (xOffset),
        y: -(yOffset),
        scale: scale,
        opacity: 0
      }}
    >
    <div
      style={{
        width: baseSize,
        height: baseSize,
        borderRadius: '50%',
        overflow: 'hidden',
        border: borderStyle,
        boxShadow
      }}
    >
      <img
        className='w-full h-full object-cover display-block'
        src={pfpUrl}
        alt={`PFP de ${username}`}
      />
    </div>
    <p
      style={{
        marginTop: 10,
        color: textColor,
        fontSize: isCenter ? 15 : 13,
        fontWeight: isCenter ? 600 : 400,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        transition: 'color 0.3s'
      }}
    >
      {username}
    </p>
  </motion.div>
  );
};