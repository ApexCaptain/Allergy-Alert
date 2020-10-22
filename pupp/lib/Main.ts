import {
    Crawler
} from "./Crawler"

import {
    WeekDay, HallNumber, MealPeriod, MealType
} from "./Enum"

const main = async () => {
    const cr = await Crawler.getInstance()
    
    
    var mon = await cr.getData(
        HallNumber.Second,
        WeekDay.MON,
        {
            mealPeriod : MealPeriod.Launch
        }
    )
    console.log(mon)
    

    var tue = await cr.getData(
        HallNumber.First,
        WeekDay.MON,
        {
            mealType : MealType.Ramen
        }
    )
    console.log(tue)

}
main()