const fs = require('fs');
const xlsx = require('xlsx');

async function readXlsxAsync(path)
{
    return new Promise((resolve, reject) =>
    {
        const buffers = [];
        let workbook = null;
        const readStream = fs.createReadStream(path);
        readStream.on('data', data =>
        {
            buffers.push(data);
        });

        readStream.on('end', () =>
        {
            const buffer = Buffer.concat(buffers);
            workbook = xlsx.read(buffer, {type: 'buffer'});
            resolve(workbook);
        });

        readStream.on('error', e =>
        {
            reject(e);
        });
    });
}

module.exports = {
    readXlsxAsync
};