import { UserModel } from "../models/UserModel";

export class CRUDOperations<T> {
  async create(data: T): Promise<T> {
    try {
      const record = await UserModel.create(data);
      return record.toJSON() as T;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create record');
    }
  }

  async find(condition: any): Promise<T> {
    try {
      const record = await UserModel.findOne({ where: condition });
      if (!record) {
        throw new Error('Record does not exist with provided condition!');
      }
      return record.toJSON() as T;
    } catch (error) {
      throw new Error('Could not find record');
    }
  }
}
