
import puppeteer from 'puppeteer'

import {
    HallNumber, WeekDay, MealPeriod, MealType
} from "./Enum"

const staticMenu = new Map<MealType, Array<[String, number]>>(
    [
        [MealType.Ramen, [
            ["일반라면", 2000],
            ["떡만두라면", 2500],
            ["치즈라면", 2500],
            ["해장라면", 3000],
            ["가락우동", 2000],
            ["꼬치어묵우동", 3000],
            ["새우튀김우동", 3000],
            ["꼬치어묵", 1500],
            ["공기밥", 500],
            ["고기만두", 1500],
            ["김치만두", 1500],
            ["떡볶이", 2000],
            ["라볶이", 3000],
            ["치즈라볶이", 3500],
            ["야채김밥", 1800],
            ["소고기김밥", 2500],
            ["참치김밥", 2500],
            ["돈까스김밥", 3000],
            ["추억의도시락", 3000]
        ]],
        [MealType.Western, [
            ["돈까스", 4000],
            ["치즈돈까스", 4500],
            ["치킨스테이크", 4000],
            ["새우튀김오므라이스", 3500],
            ["불닭오므라이스", 3500],
            ["토마토 해물 파스타", 4000]
        ]],
        [MealType.Snack, [
            ["별리달리 알밥", 3900],
            ["떡갈비 추가", 800],
            ["수제 떡갈비 버거(단품)", 3500],
            ["수제 떡갈비 버거(세트)\n<버거+감자튀김+콜라>", 4500],
            ["콜라/사이다", 600],
            ["콜팝치킨", 2600],
            ["치킨커리 샌드위치", 3000],
            ["크리스피 치킨텐더(6PCS)", 3700],
            ["크리스피 치킨텐더(세트)\n<치킨텐더+감자튀김+음료>", 4700],
            ["순살 후라이드 치킨(세트)", 8400],
            ["순살 양념치킨(세트)", 9400],
            ["순살 반반치킨(세트)", 9400]
        ]],
        [MealType.Korean, [
            ["바지락된장찌개", 4000],
            ["불고기비빔밥", 4700],
            ["해물순두부찌개", 4200],
            ["돈육김치찌개", 4200],
            ["부대찌개", 5000],
            ["뚝불고기", 4500]
        ]],
        [MealType.Japanese, [
            ["치킨마요덮밥(미니우동)", 3900],
            ["제육덮밥(미니우동)", 4200],
            ["카츠돈부리(미니우동)", 4200],
            ["치킨돈부리(미니우동)", 4200],
            ["김치카츠라이스(미니우동)", 4500],
            ["카라아게카레(미니우동)", 4700],
            ["카츠카레(미니우동)", 4700]
        ]],
        [MealType.Chinese, [
            ["옛날짜장", 3900],
            ["짜장곱배기", 4500],
            ["해물짬뽕", 4200],
            ["짬뽕곱배기", 4700],
            ["짬짜면", 4700],
            ["짬짜면곱배기", 5200],
            ["볶음밥", 4500],
            ["볶음밥곱배기+소스", 5000],
            ["탕수육", 5800],
            ["군만두", 3200],
            ["공기밥(중식)", 500]
        ]]
    ]
)

interface CrawalingOption {
    mealType? : MealType
    mealPeriod? : MealPeriod
}

export class Crawler {
    private static instance : Crawler
    private static url = "http://cnuis.cnu.ac.kr/jsp/etc/weekMenuFrame.jsp"

    private page : puppeteer.Page
    private currentMealPeriod : MealPeriod = MealPeriod.Launch

    private constructor() {
    }
    private async initialize() {
        const browser = await puppeteer.launch({
            headless : false
        })
        this.page = await browser.newPage()
        await this.page.setViewport({
            width : 1366,
            height : 768
        })
        await this.page.goto(Crawler.url)
    }
    static async getInstance() : Promise<Crawler> {
        if(!Crawler.instance) {
            Crawler.instance = new Crawler()
            await Crawler.instance.initialize()
        }
        return Crawler.instance
    }

    async getData(
        hallNumber : HallNumber,
        weekDay : WeekDay,
        optins : CrawalingOption = {
            mealType : MealType.Ramen,
            mealPeriod : MealPeriod.Launch
        }
    ) : Promise<Array<{menu : Array<String>, price : number}>> {
        switch(hallNumber) {
            case HallNumber.First :
                return staticMenu.get(optins.mealType!!)?.map(eachPair => {
                    return {
                        menu : [eachPair[0]],
                        price : eachPair[1]
                    }
                })!!
            case HallNumber.Second :
                return await this.crawl(weekDay, optins.mealPeriod!!)
        }
    }

    async changeMealPeriod(
        mealPeriod : MealPeriod
    ) {
        return new Promise(async resolve => {
            if(this.currentMealPeriod != mealPeriod) {
                const inputFrame = await (await this.page.$('html > frameset > frame:nth-child(1)'))?.contentFrame()
                await inputFrame?.select('body > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(4) > select', mealPeriod)
                await inputFrame?.click('body > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(8) > input[type=button]')
                this.currentMealPeriod = mealPeriod
                setTimeout(() => {
                    resolve()
                }, 500)
            } else resolve()
        })
    }

    async crawl(
        weekDay : WeekDay,
        mealPeriod : MealPeriod
    ) {

        await this.changeMealPeriod(mealPeriod)

        const tableFrame = await (await this.page.$('html > frameset > frame:nth-child(2)'))?.contentFrame()

        let menu = await tableFrame?.evaluate((weekDay) => {
            const rst = Array.from(document.querySelectorAll(`body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(${weekDay + 2}) > td:nth-child(${weekDay == 1 ? 4 : 3}) > table > tbody > tr > td`))
            return rst.map(rst => (rst as any).innerText as string).filter(eachMenu => !eachMenu.includes('included'))
        }, weekDay)

        let price : number = 0
        if(mealPeriod == MealPeriod.Launch) {
            price = menu?.length == 0 ? 0 : await tableFrame?.$eval(`body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(${weekDay + 2}) > td:nth-child(${weekDay == 1 ? 5 : 4})`, el => {
                return parseInt(el.innerHTML.trim())
            })!!
        } else {
            price = parseInt(menu!![1])
            menu = [menu!![0]]
        }

        return [{
            menu : menu ? menu : [],
            price : price
        }]
    }
    

}