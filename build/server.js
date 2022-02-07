"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l3k3n.mongodb.net/TUITER?retryWrites=true&w=majority`;
const local = 'mongodb://127.0.0.1:27017/tuiter';
const dbURL = local || connectionString;
mongoose_1.default.connect(dbURL);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = new UserController_1.default(app, UserDao_1.default.getInstance());
const tuitController = new TuitController_1.default(app, TuitDao_1.default.getInstance());
const PORT = 4000;
app.listen(process.env.PORT || PORT);
