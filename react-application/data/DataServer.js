const express = require('express')
const app = express()
const port = 3200
let crawler;
const getCrawler = async () => {
  if(!crawler) crawler = await require("./Crawler").getInstance()
  return crawler
}
getCrawler()

app.get('/', async (req, res) => {
  const crawler = await getCrawler()
  const rst = await crawler.getData(2, 3, {
    mealType : "ramen",
    mealPeriod : "CCS02.40"
  })
  console.log(rst)
  res.send(rst)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})