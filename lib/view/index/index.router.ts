import express, { Request, Response, NextFunction, Router } from "express"

const indexRouter = Router()

indexRouter.get("/", (req : Request, res : Response) => {
    res.send("hello")
})

export = indexRouter