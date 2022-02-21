"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
class TuitDao {
    constructor() { }
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.create(tuit);
        });
    }
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteOne({ tid });
        });
    }
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find();
        });
    }
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid).populate("postedBy").exec();
        });
    }
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid });
        });
    }
    findAllTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid });
        });
    }
    createTuitByUser(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
