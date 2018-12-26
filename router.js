const Router = require('koa-router');
const router = new Router();
const {readXlsxAsync} = require('./functions');
const xlsx = require('xlsx');

router.get('/server/getCO2Data', async (ctx, next) =>
{
    try
    {
        const sheets = await readXlsxAsync('./Data/CO2.xls');

        const sheet = sheets.Sheets[sheets.SheetNames[0]];
        const sheetData = xlsx.utils.sheet_to_json(sheet);
        const YEAR_START = 1960;
        const YEAR_END = 2014;


        ctx.body = {
            code: 200,
            data: {
                sheetData,
                YEAR_START,
                YEAR_END
            }
        };
    }
    catch (e)
    {
        ctx.body = {
            code: 500
        };
        console.error(e.stack);
    }
    finally
    {
        await next();
    }
});


module.exports = router;