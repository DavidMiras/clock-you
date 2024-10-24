import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateServiceService = async (validationCode) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
        SELECT id FROM services WHERE validationCode = ?
        `,
        [validationCode]
    );

    if (!service.length)
        generateErrorUtil('El código de validacion no existe', 401);

    await pool.query(
        `
        UPDATE services SET status='confirmed', validationCode = null WHERE validationCode = ?
        `,
        [validationCode]
    );
};

export default updateServiceService;
