const puppeteer = require('puppeteer');
const moment = require('moment')

const login = async (browser) => {
    try {
        const page = await browser.newPage();
        //login
        await page.goto('https://affiliate.tradetracker.com/user/login');
        await page.screenshot({path: 'example.png'});
        const form = await page.$('form[name="LoginUserCustomer"]');
        await page.type('#username', 'julian.bertsch42');
        await page.type('#password', 'roleMiddleware2004!');
        await form.evaluate(form => form.submit());
        await page.waitForTimeout(2000)
        const moment = require('moment')
        // go to campaigns page
        await page.goto('https://affiliate.tradetracker.com/affiliateCampaign/list');
        await page.waitForTimeout(5000)

        do {
            // download csv
            await page.screenshot({path: 'campaigns.png'});
            await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './reports'})
            await page.click('a[title="In CSV-Datei exportieren"]')
            await page.waitForTimeout(60000);
            const fs = require('fs');
            const fileNames = fs.readdirSync('./reports');
            console.log(fileNames[0])
            const timestamp = moment().format('DD-MM-YYY-HH:mm:ss')
            fs.renameSync(`./reports/report.csv`, `./reports/report-${timestamp}.csv`);
            await page.click('.pagination :last-child a')
            await page.waitForTimeout(60000);
            fs.unlink(`./reports/report.csv`);
            console.log(await page.$eval('.pagination :last-child a', el => el))
        } while(true)
    } catch (e) {
        console.log('!!! error !!!', e)
    }
}

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {
                width: 1920,
                height: 2000
            },
            args: ['--window-size=1920,1080']
        });
        await login(browser)

        await browser.close();
    } catch (e) {
        console.log(e)
    }
})();