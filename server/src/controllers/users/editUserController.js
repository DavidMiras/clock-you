import Joi from 'joi';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserService from '../../services/users/updateUserService.js';

const editUserController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        const schema = Joi.object().keys({
            firstName: Joi.string().max(25).required(),
            lastName: Joi.string().max(40).required(),
            phone: Joi.string()
                .pattern(/^\d{9}$/)
                .required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { firstName, lastName, phone } = req.body;

        await updateUserService(userId, firstName, lastName, phone);

        res.send({
            status: 'ok',
            message: 'Datos actualizados correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
