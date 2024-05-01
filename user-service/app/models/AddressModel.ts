import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utility/databaseClient";

export interface AddressModelAttributes {
    id: number;
    user_id: number;
    address_line1: string;
    address_line2: string;
    city: string;
    country: string;
    post_code: string;
}

export class AddressModel extends Model<AddressModelAttributes> implements AddressModelAttributes {
    declare id: number;
    declare user_id: number;
    declare address_line1: string;
    declare address_line2: string;
    declare city: string;
    declare country: string;
    declare post_code: string;
}

AddressModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id',
            },
        },
        address_line1: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address_line2: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        post_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Address',
        tableName: 'Addresses',
        timestamps: false,
    }
);