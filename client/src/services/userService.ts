const BACK_URL = 'http://localhost:3000'; 

export interface User {
  id: number;
  user_name: string;
  pfp_url: string | null; // El backend envía null si no hay pfp
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BACK_URL}/api/users`);
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios');
  }
  return response.json();
};

export const getPfpUrl = (pfpUrl: string | null): string => {

  if(!pfpUrl) {
    return 'public/assets/default_pfp.png'; // en caso de recien crear el perfil, se le asigna imagen default
  }

  const path = pfpUrl.startsWith('.')
    ? pfpUrl.substring(1)
    : pfpUrl;

  return `${BACK_URL}${path}`
};