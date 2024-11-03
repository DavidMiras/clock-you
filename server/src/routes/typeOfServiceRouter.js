import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import authUser from '../middleware/authUser.js';
import typeOfServiceExists from '../middleware/typeOfServiceExists.js';

import {
    newTypeOfServiceController,
    editTypeOfServiceController,
    listTypeOfServicesController,
    deleteTypeOfServiceController,
    detailTypeOfServicesController,
    editTypeOfServiceImageController,
} from '../controllers/typeOfServices/index.js';

const router = express.Router();

router.get('/typeOfServices', listTypeOfServicesController);

router.get(
    '/typeOfServices/:typeOfServiceId',
    typeOfServiceExists,
    detailTypeOfServicesController
);

router.post('/typeOfServices', authUser, isAdmin, newTypeOfServiceController);

router.patch(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExists,
    editTypeOfServiceImageController
);

router.put(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExists,
    editTypeOfServiceController
);

router.delete(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExists,
    deleteTypeOfServiceController
);

export default router;
