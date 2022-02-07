import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null){
            TuitDao.tuitDao = new TuitDao();
        }
        return  TuitDao.tuitDao;
    }
    private constructor() {}

    createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({tid});
    }

    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid);
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

}
