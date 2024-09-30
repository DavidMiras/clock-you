import getPool from '../../db/getPool.js';

const selectShiftRecordsService = async (typeOfService, employeeId) => {
    const pool = await getPool();

    let sqlQuery = `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.rating, se.status, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
            TIMESTAMPDIFF(HOUR, s.clockIn, s.clockOut) AS hoursWorked,
            MOD(TIMESTAMPDIFF(MINUTE, s.clockIn, s.clockOut), 60) AS minutesWorked
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId
            WHERE 1=1
            `;

    let sqlValues = [];

    if (typeOfService) {
        sqlQuery += ' AND t.type = ?';
        sqlValues.push(typeOfService);
    }

    if (employeeId) {
        sqlQuery += ' AND s.employeeId = ?';
        sqlValues.push(employeeId);
    }

    sqlQuery += ' ORDER BY se.createdAt DESC';

    const [shiftRecord] = await pool.query(sqlQuery, sqlValues);

    return shiftRecord;
};

export default selectShiftRecordsService;
