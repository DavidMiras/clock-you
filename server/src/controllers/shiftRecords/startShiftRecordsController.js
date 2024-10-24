import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId, location, clockIn } = req.body;

        const startDateTime = new Date(clockIn);

        await startShiftRecordService(shiftRecordId, location, startDateTime);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
