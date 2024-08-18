import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertAdminService = async (email, password, userName) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if (user.length) {
        generateErrorUtil('El email ya se encuentra registrado', 409);
    }

    const [name] = await pool.query(
        `
            SELECT id FROM users WHERE userName = ?
        `,
        [userName]
    );

    if (name.length) {
        generateErrorUtil(
            'El nombre de usuario ya se encuentra registrado',
            409
        );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await pool.query(
        `
            INSERT INTO users (id, email, password, userName, role )
            VALUES (?,?,?,?,?)
        `,
        [uuid(), email, hashPassword, userName, role]
    );

    await pool.query(
        `
            UPDATE users SET active=1
        `
    );
};

export default insertAdminService;