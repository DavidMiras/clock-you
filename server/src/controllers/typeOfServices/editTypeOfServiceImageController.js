import selectTypeOfServiceByIdService from '../../services/typeOfServices/selectTypeOfServiceByIdService.js';
import updateTypeOfServiceImageService from '../../services/typeOfServices/updateTypeOfServiceImageService.js';
import { deletePictureUtil, savePictureUtil } from '../../utils/photoUtil.js';

const editTypeOfserviceImageController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const type = await selectTypeOfServiceByIdService(typeOfServiceId);

        if (type.image) await deletePictureUtil(type.image);

        const imageName = await savePictureUtil(req.files.image, 640, 480);

        await updateTypeOfServiceImageService(imageName, typeOfServiceId);

        res.send({
            status: 'ok',
            message: 'Imágen actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editTypeOfserviceImageController;
