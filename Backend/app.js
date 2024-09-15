import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import userrouter from './routes/Userrouter.js'
import applicationrouter from './routes/applicationrouter.js'
import jobrouter from './routes/jobrouter.js'
import {dbconnection} from './database/dbconnection.js'
import {errormiddleware} from './middlewares/error.js'


const app = express()
dotenv.config({ path: './config/config.env' })

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','DELETE','PUT'],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir :"/tmp/"
}));




app.use("/api/v1/user",userrouter);
app.use("/api/v1/application",applicationrouter);
app.use("/api/v1/alljobs",jobrouter);

dbconnection();

app.use(errormiddleware);


export default app