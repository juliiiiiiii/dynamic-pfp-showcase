import { useEffect, useState, useRef } from 'react';
import { fetchUsers, User } from '@/services/userService';
import { UserProfileCard } from '@/components/userProfileCard';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Lógica para el carrusel infinito
  const [currentIndex, setCurrentIndex] = useState(0);

  // Duplicamos el inicio y el final de la lista para simular infinitud
  const usersToDisplay = users.length > 0 
    ? [...users, ...users.slice(0, 5)] 
    : [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (usersToDisplay.length - 10));
  };

  useEffect(() => {
    if (usersToDisplay.length > 10) {
      const interval = setInterval(handleNext, 3000); // Cambia cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [usersToDisplay]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex items-center justify-between pb-8 border-b border-gray-800">
        <h1 className="text-4xl font-bold">Dynamic PFP Showcase 🚀</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver mi PFP
        </button>
      </header>

      <main className="pt-8">
        <h2 className="text-2xl font-semibold mb-8">Todos los usuarios</h2>
        <div className="relative overflow-hidden w-full h-auto p-4 bg-gray-800 rounded-xl shadow-inner">
          <motion.div
            className="flex gap-4"
            ref={containerRef}
            initial={false}
            animate={{ x: `-${currentIndex * (20 + 16)}%` }} // 20% width + 16px gap
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
          >
            <AnimatePresence initial={false}>
              {usersToDisplay.map((user, index) => (
                <div 
                  key={`${user.id}-${index}`} 
                  className="w-[20%] flex-shrink-0" // Cada tarjeta ocupa un 20% del contenedor
                >
                  <UserProfileCard
                    id={user.id}
                    username={user.user_name}
                    pfp={user.pfp_url}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;