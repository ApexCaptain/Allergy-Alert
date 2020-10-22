const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


(async () => {
    
    const browser = await puppeteer.launch({
        headless : false,
        devtools: true
    })

    const page = await browser.newPage()
    await page.setViewport({
        width : 1366,
        height : 768
    })

    await page.goto("http://cnuis.cnu.ac.kr/jsp/etc/weekMenuFrame.jsp", {
        waitUntil : "domcontentloaded"
    })

    const elementHandle = await page.$('html > frameset > frame:nth-child(1)')

    const frame = await elementHandle.contentFrame()
    await frame.$eval('head > title', el => {
        console.log(el)
    })

})()