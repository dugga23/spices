import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import userRoute from "./routes/userRoute.js";
import { jwtoken } from "./middleware/jwtMiddleware.js";

export const app = express();

config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.use("/api/v1", userRoute);
