"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Topic_1 = __importDefault(require("./Topic"));
const Tuit_1 = __importDefault(require("./Tuit"));
class Tuit2Topic {
    constructor() {
        this.topic = new Topic_1.default();
        this.tuit = new Tuit_1.default();
    }
}
exports.default = Tuit2Topic;
