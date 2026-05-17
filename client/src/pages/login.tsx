/*
    Formulario que solicita user_name y pass

    Boton para registrar cuenta

    Boton para volver a la pagina de inicio
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm, FieldConfig } from '@/components/auth/AuthForm';
import { ThemeToggle } from '@/components/ThemeToggle';
 
const FIELDS: FieldConfig[] = [
  { key: 'userName', label: 'Nombre de usuario', type: 'text', placeholder: 'tu_usuario' },
  { key: 'password', label: 'Contraseña', type: 'password', placeholder: '********' },
];

export default function Login() {
  const [values, setValues] = useState({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!values.userName || !values.password) {
      setError('Completá todos los campos');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
 
      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      login(data.token);
      navigate('/');

    } catch(error) {
      console.error('Error en el login', error);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Iniciar sesión" subtitle="Ingresá tus credenciales para continuar">
      <AuthForm
        fields={FIELDS}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText="Ingresar"
        loading={loading}
        error={error}
        secondaryLink={{ label: 'Crear cuenta', href: '/pages/register' }}
      />
      <ThemeToggle/>
    </AuthLayout>
  );
}