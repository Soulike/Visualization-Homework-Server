const Router = require('koa-router');
const router = new Router();
const {readXlsxAsync} = require('./functions');
const xlsx = require('xlsx');

router.get('/getCO2Data', async (ctx, next) =>
{
    try
    {
        const sheets = await readXlsxAsync('./Data/CO2.xls');

        const sheet = sheets.Sheets[sheets.SheetNames[0]];
        const sheetData = xlsx.utils.sheet_to_json(sheet);

        const options = [];
        let maxValue = 0;
        const YEAR_START = 1960;
        const YEAR_END = 2014;

        for (let i = YEAR_START; i <= YEAR_END; i++)
        {
            const data = [];
            for (const row of sheetData)
            {
                if (row[i.toString()] !== undefined)
                {
                    data.push({name: row['Country Name'], value: parseFloat(row[i.toString()])});
                    if (parseFloat(row[i.toString()]) > maxValue)
                    {
                        maxValue = parseFloat(row[i.toString()]);
                    }
                }
            }
            options.push({
                title: {
                    text: `全球二氧化碳排放分布（${i} 年）`
                },
                visualMap: {
                    max: maxValue,
                },
                series: [{
                    data
                }]
            });
            maxValue = 0;
        }

        ctx.body = {
            code: 200,
            data: {
                YEAR_START,
                YEAR_END,
                options
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