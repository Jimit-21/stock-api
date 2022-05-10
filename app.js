import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path" ;
import bodyParser from 'body-parser';
import logger from "./config/logger.js";
import config from "./config/config.js";
import router from "./components/index.js";
import { scanner } from "./helpers/node-cron.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.send("Hello!!")
});

const pubpath = path.join(process.cwd().toString(), 'public');

app.use(express.static(pubpath));
app.use('/js', express.static(pubpath));
app.use('/css', express.static(pubpath));

app.set('views', path.join(process.cwd().toString(), '/views'));
app.set('view engine', 'ejs');
  
app.use("/api/v1", router);
  
  
app.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({ message: error.message });
});

app.listen(config.server.port, () => {
    logger.info(`server is running on ${config.server.port}`);
});