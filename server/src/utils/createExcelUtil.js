import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { UPLOADS_DIR } from '../../env.js';

const createExcelUtil = async (data, columns, fileName) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.columns = columns;

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        const directoryPath = path.resolve(`${UPLOADS_DIR}/documents`);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const filePath = path.resolve(directoryPath, fileName);

        await workbook.xlsx.writeFile(filePath);

        return filePath;
    } catch (error) {
        console.error('Error creating Excel file:', error);
        throw new Error('Error creating Excel file');
    }
};

export default createExcelUtil;
