
// Formulario que solicita email, user_name y pass

// Boton para iniciar sesión

// Boton para volver a inicio

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm, FieldConfig } from '@/components/auth/AuthForm';
import { ThemeToggle } from '@/components/ThemeToggle';
 
const FIELDS: FieldConfig[] = [
  { key: 'email',    label: 'Email',              type: 'email',    placeholder: 'tu@email.com' },
  { key: 'userName', label: 'Nombre de usuario',  type: 'text',     placeholder: 'tu_usuario'   },
  { key: 'password', label: 'Contraseña',          type: 'password', placeholder: '••••••••'     },
];
 
export default function Register() {
  const [values, setValues] = useState({ email: '', userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
 
  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };
 
  const handleSubmit = async () => {
    if (!values.email || !values.userName || !values.password) {
      setError('Completá todos los campos');
      return;
    }
    setLoading(true);
    setError(null);
 
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }
 
      // Registro exitoso, redirigir al login
      window.location.href = '/login';
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <AuthLayout title="Crear cuenta" subtitle="Completá los datos para registrarte">
      <AuthForm
        fields={FIELDS}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText="Registrarse"
        loading={loading}
        error={error}
        secondaryLink={{ label: 'Ya tengo cuenta', href: '/pages/login' }}
      />
      <ThemeToggle/>
    </AuthLayout>
  );
}