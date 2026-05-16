import { UserModel, UserDocument } from '../models/user.model';
import { User } from '../entities/user.entity';
import { DatabaseErrorMapper } from '../utils/db.error.mapper';

//===INTERFACE (PORT)====
export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
}

//===MONGODB IMPLEMENTATION (ADAPTER)====
export class MongoUserRepository implements UserRepository {
    private mapToEntity(doc: UserDocument): User {
        return {
            id: (doc._id as any).toString(),
            name: doc.name,
            email: doc.email,
            mobileNo: doc.mobileNo,
            password: doc.password,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const doc = await UserModel.findOne({ email }).exec();
            return doc ? this.mapToEntity(doc) : null;
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to find user by email");
        }
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const doc = await UserModel.create(userData);
            return this.mapToEntity(doc);
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to create user account");
        }
    }
}
