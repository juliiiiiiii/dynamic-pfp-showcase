import { useEffect, useState } from 'react';
import { fetchUsers, User } from '@/services/userService';
import { UserProfileCard } from '@/components/userProfileCard';
import { AnimatePresence } from 'framer-motion';

const VISIBLE_COUNT = 7;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (users.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % users.length);
    }, 1500);
    return () => clearInterval(interval);

  }, [users]);

  // Build the window of cards to render: VISIBLE_COUNT cards centered on currentIndex
  const getVisibleUsers = () => {
    if(users.length === 0) return [];

    const half = Math.floor(VISIBLE_COUNT / 2);
    return Array.from({ length: VISIBLE_COUNT }, (_, i) => {
      const offset = i - half;
      const idx = ((currentIndex + offset) % users.length + users.length) % users.length;

      return { user: users[idx], offset };
    })
  }

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

  const visibleUsers = getVisibleUsers();

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

        <div className="relative w-full h-[320px] flex items-end content-center">

          <AnimatePresence>
            {visibleUsers.map(({ user, offset }) => (
              <UserProfileCard
                key={`${user.id}`} 
                id={user.id}
                username={user.user_name}
                pfp={user.pfp_url}
                offset={offset}
              />
            ))}
          </AnimatePresence>
          
        </div>
      </main>
    </div>
  );
}

export default App;