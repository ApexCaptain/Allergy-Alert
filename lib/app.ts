import express from 'express'
import {
  name, config
} from "../package.json"
import indexRouter from "./view/index/index.router"
import { KoconutArray } from "koconut"
const allergyAlertApplication = express()
allergyAlertApplication.use("/", indexRouter)
allergyAlertApplication.listen(config.port, async () => {
  console.log(
    `${
      await KoconutArray.from(name.split('-'))
        .map(eachString => `${eachString.charAt(0).toUpperCase()}${eachString.slice(1)}`)
        .join(" ")
        .yield()
    } Application is successfully initiated at local host, port number ${config.port}`
  )
})
