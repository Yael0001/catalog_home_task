import express, { NextFunction, Request, Response }  from "express"
import "dotenv/config"
import catalogRouter from "./routes/catalogRoute"
import createHttpError, { isHttpError } from "http-errors"

const app = express()

app.use(express.json())

app.use("/api/catalog", catalogRouter)

app.use((req, res, next) => {
    next(createHttpError(404, "endpoint not found"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = 'Error occurred'
    let status = 500
    if(isHttpError(error)){    
        status = error.status
        errorMessage = error.message
    }
    res.status(status).json({message: errorMessage})
})

export default app