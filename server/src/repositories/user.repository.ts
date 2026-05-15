import { UserModel, UserDocument } from '../models/user.model';
import { DatabaseErrorMapper } from '../utils/db.error.mapper';

//===INTERFACE====
export interface UserRepository {
    findByEmail(email: string): Promise<UserDocument | null>;
    create(userData: Partial<UserDocument>): Promise<UserDocument>;
}

//===MONGODB IMPLEMENTATION====
export class MongoUserRepository implements UserRepository {
    async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            return await UserModel.findOne({ email }).exec();
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to find user by email");
        }
    }

    async create(userData: Partial<UserDocument>): Promise<UserDocument> {
        try {
            return await UserModel.create(userData);
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to create user account");
        }
    }
}
