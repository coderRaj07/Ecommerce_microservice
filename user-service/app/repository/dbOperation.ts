import { UserModel } from "../models/UserModel";

export class CRUDOperations<T> {
    async create(data: T): Promise<T> {
        const record = await UserModel.create(data);
        return record.toJSON() as T;
    }

    async find(condition: any): Promise<T> {
        const record = await UserModel.findOne({ where: condition });
        if (!record) {
            throw new Error('Record does not exist with provided condition!');
        }
        return record.toJSON() as T;
    }

    async update(condition: any, data: Partial<T>): Promise<T> {
        const [, [updatedRecord]] = await UserModel.update(data, {
            where: condition,
            returning: true,
        });
        return updatedRecord.toJSON() as T;
    }

    async delete(condition: any): Promise<void> {
        await UserModel.destroy({ where: condition });
    }
}
