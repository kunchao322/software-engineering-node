import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import UserDao from "./daos/UserDao";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l3k3n.mongodb.net/TUITER?retryWrites=true&w=majority`;
// const local = 'mongodb://127.0.0.1:27017/tuiter'
// const dbURL = local || connectionString;
// mongoose.connect(dbURL);
mongoose.connect(connectionString);

const app = express();

app.use(bodyParser.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const  userController = new UserController(app, UserDao.getInstance());
const  tuitController = new TuitController(app, TuitDao.getInstance());

const PORT = 4000;
app.listen(process.env.PORT || PORT);