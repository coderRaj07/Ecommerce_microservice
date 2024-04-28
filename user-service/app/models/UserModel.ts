import { sequelize } from '../utility/databaseClient';
import { Model, DataTypes } from 'sequelize';

export interface UserModelAttributes {
  user_id?: number;
  phone: string;
  email: string;
  password: string;
  salt: string;
  userType: "BUYER" | "SELLER";
}

export class UserModel extends Model<UserModelAttributes> { }

UserModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);