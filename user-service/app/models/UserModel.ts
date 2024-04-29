import { sequelize } from '../utility/databaseClient';
import { Model, DataTypes } from 'sequelize';

export interface UserModelAttributes {
  user_id?: number;
  phone: string;
  email: string;
  password: string;
  salt: string;
  userType: "BUYER" | "SELLER";
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  verification_code?: number;
  expiry?: Date;
  verified?: boolean;
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verification_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
