import { Model, ModelStatic } from 'sequelize';

export class CRUDOperations<T extends Model> {
    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: any): Promise<T> {
        const record = await this.model.create(data);
        return record.toJSON() as T;
    }

    async find(condition: any): Promise<T> {
        const record = await this.model.findOne({ where: condition });
        if (!record) {
            return null;
        }
        return record.toJSON() as T;
    }

    async update(condition: any, data: Partial<any>): Promise<T> {
        const [, [updatedRecord]] = await this.model.update(data, {
            where: condition,
            returning: true,
        });
        return updatedRecord.toJSON() as T;
    }

    async delete(condition: any): Promise<void> {
        await this.model.destroy({ where: condition });
    }
}
