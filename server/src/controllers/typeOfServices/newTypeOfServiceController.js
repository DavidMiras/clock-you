import Joi from 'joi';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertTypeOfServiceService from '../../services/typeOfServices/insertTypeOfServiceService.js';
import { savePictureUtil } from '../../utils/photoUtil.js';

const newTypeOfServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            type: Joi.string().max(30).required(),
            description: Joi.string().max(500).required(),
            city: Joi.string().max(30).required(),
            price: Joi.number().min(1).max(100).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { type, description, city, price } = req.body;

        const imageName = await savePictureUtil(req.files.image, 640, 480);

        await insertTypeOfServiceService(
            type,
            description,
            city,
            price,
            imageName
        );

        res.send({
            status: 'ok',
            message: 'Servicio creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default newTypeOfServiceController;
