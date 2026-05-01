import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from 'bcrypt';

async function crearUsuarios () {
    
    const db = await open ({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    console.log('Creando la db y los usuarios de prueba...');

    try {

        await db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                pass_hash TEXT UNIQUE NOT NULL,
                pfp_url TEXT,
                fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        for(let i = 1; i <= 10; i++) {
            const userName = `userPrueba${i}`;
            const email = `userPrueba${i}@prueba.com`;
            const passHash = await bcrypt.hash(`password${i}`, 10);
            const pfpUrl = `/uploads/user${i}.png`;

            await db.run(`
                INSERT OR IGNORE INTO usuarios (user_name, email, pass_hash, pfp_url)
                VALUES ($1, $2, $3, $4);
            `, [userName, email, passHash, pfpUrl]);
        }
    } catch (error) {
        console.error('Error al crear usuarios de prueba', error);
    } finally {
        await db.close();
    }

}

crearUsuarios();