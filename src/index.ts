import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.connect()
    .then(() => console.log('✅ Conectado exitosamente a la db Neon'))
    .catch((error) => console.error('❌ Error de conexión a la db', error));

// Registro
app.post('/api/auth/register', async (req: Request, res: Response): Promise<any> => {

    const { email, user_name, password } = req.body;

    if (!email || !user_name || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Formato de email no válido' });
    }

    try {

        // 10 son los "salt rounds": indica el costo algorítmico. 
        const password_hash = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO usuarios (user_name, email, pass_hash)
            VALUES ($1, $2, $3)
            RETURNING id, user_name, email, fecha_registro
        `;

        const values = [user_name, email, password_hash];

        const result = await pool.query(query, values);

        const nuevoUsuario = result.rows[0];

        res.status(201).json({
            mensaje: 'Usuario registrado con exito en neon :DDD',
            usuario: nuevoUsuario
        })

    } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        
        if(error.code === '23505') {
            res.status(400).json({ error: 'email y/o user_name ya existe/n' });
        }

        res.status(500).json({ error: 'Error interno del servidor al comunicarse con la db :(' });
    }
});

// Devuelve los usuarios registrados
app.get('/api/users', async (req: Request, res: Response) => {
    
    try {
        const query = `
            SELECT id, user_name, pfp_url
            FROM usuarios
            ORDER BY id ASC;
        `;
        
        const result = await pool.query(query);

        res.json(result.rows);

    } catch(error) {
        console.error('No se pudo fetchear los usuarios de la db', error);
        res.status(500).json({ error: 'Error al consultar la db' });
    }
    
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});