import express, { application } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import dbConnect from "./database/db.js";
import { authRouter } from "./routes/AuthRoute.js";


const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/auth', authRouter);

app.listen(3001, () => { console.log('Server listening on port 3001');});