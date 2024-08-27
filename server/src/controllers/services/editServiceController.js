import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateServiceByIdService from '../../services/services/updateServiceByIdService.js';
import Joi from 'joi';

const editServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            date: Joi.date().min('now').required(),
            startTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
                .required(),
            hours: Joi.number().min(1).max(8).required(),
            comments: Joi.string().max(500).optional(),
            address: Joi.string().max(255).required(),
            city: Joi.string().max(40).required(),
            postCode: Joi.string().length(5).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { serviceId } = req.params;

        const { address, postCode, city, comments, date, hours, startTime } =
            req.body;

        const data = await updateServiceByIdService(
            serviceId,
            address,
            postCode,
            city,
            comments,
            date,
            hours,
            startTime
        );

        res.send({
            status: 'ok',
            message: 'Servicio actualizado correctamente',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default editServiceController;
