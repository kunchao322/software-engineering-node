import FollowDaoI from "../interfaces/FollowDaoI";
import User from "../models/User";
import FollowModel from "../mongoose/Follows/FollowModel";
import LikeModel from "../mongoose/Likes/LikeModel";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null  = null;
    public static getInstance = (): FollowDao =>{
        if(FollowDao.followDao == null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }


   async findAllFolloweesOfUser(uid: string): Promise<User[]> {
        return FollowModel.find({follower: uid}).populate("blogger");
    }

    async findAllFollowersOfUser(uid: string): Promise<User[]> {
        return FollowModel.find({blogger: uid}).populate("follower");
    }

    async countFollowees(uid: string): Promise<number> {
        return FollowModel.find({follower: uid}).populate("blogger").count();
    }

    async countFollowers(uid: string): Promise<number> {
        return FollowModel.find({blogger: uid}).populate("follower").count();
    }

    async userAFollowB(uidA: string, uidB: string): Promise<any> {
        return FollowModel.create({follower: uidA, blogger: uidB});
    }

    async userAUnfollowB(uidA: string, uidB: string): Promise<any> {
        return FollowModel.deleteOne({follower: uidA, blogger: uidB});
    }
}