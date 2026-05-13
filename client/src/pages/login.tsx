/*
    Formulario que solicita user_name y pass

    Boton para registrar cuenta

    Boton para volver a la pagina de inicio
*/
import { useState } from 'react';
import { Button } from '@/components/button';
 
const styles = `
  @keyframes spin-gradient {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
 
  .rainbow-border {
    position: relative;
    padding: 3px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 48px rgba(0,0,0,0.10);
    z-index: 1;
  }
 
  .rainbow-border::before {
    content: '';
    position: absolute;
    inset: -100%;
    background: conic-gradient(#2979ff, #7c3aed, #a855f7, #2979ff);
    animation: spin-gradient 3s linear infinite;
  }
 
  .rainbow-border-inner {
    position: relative;
    background: #ffffff;
    border-radius: 17px;
    padding: 2.5rem 2.25rem;
    width: 340px;
    display: flex;
    flex-direction: column;
  }
`;
 
export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async () => {
    if (!userName || !password) {
      setError('Completá todos los campos');
      return;
    }
    setLoading(true);
    setError(null);
 
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }
 
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{styles}</style>
 
      <div
        style={{
          minHeight: '100vh',
          background: '#f8f8f6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background dot pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
 
        {/* Back button */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
          <Button text="← Volver al inicio" href="/" />
        </div>
 
        {/* Title */}
        <h1
          style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '2rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Dynamic PFP Showcase
        </h1>
 
        {/* Animated border card */}
        <div className="rainbow-border">
          <div className="rainbow-border-inner">
            <h2
              style={{
                margin: '0 0 0.25rem',
                fontSize: '22px',
                fontWeight: 700,
                color: '#111',
                letterSpacing: '-0.02em',
              }}
            >
              Iniciar sesión
            </h2>
            <p style={{ margin: '0 0 1.75rem', fontSize: '13px', color: '#888' }}>
              Ingresá tus credenciales para continuar
            </p>
 
            {error && (
              <div
                style={{
                  background: '#fff0f0',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#b91c1c',
                  marginBottom: '1rem',
                }}
              >
                {error}
              </div>
            )}
 
            <label style={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="tu_usuario"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#7c3aed')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e5e5')}
            />
 
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              style={{ ...inputStyle, marginBottom: '1.5rem' }}
              onFocus={(e) => (e.target.style.borderColor = '#7c3aed')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e5e5')}
            />
 
            <div style={{ marginBottom: '0.875rem' }}>
              <Button
                text={loading ? 'Ingresando...' : 'Ingresar'}
                onClick={handleSubmit}
                disabled={loading}
              />
            </div>
 
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.875rem' }}>
              <div style={{ flex: 1, height: '1px', background: '#ebebeb' }} />
              <span style={{ fontSize: '12px', color: '#bbb' }}>o</span>
              <div style={{ flex: 1, height: '1px', background: '#ebebeb' }} />
            </div>
 
            <Button text="Crear cuenta" href="/register" />
          </div>
        </div>
      </div>
    </>
  );
}
 
const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#555',
  marginBottom: '6px',
  display: 'block',
};
 
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1.5px solid #e5e5e5',
  fontSize: '15px',
  color: '#111',
  outline: 'none',
  marginBottom: '1rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  background: '#fafafa',
};