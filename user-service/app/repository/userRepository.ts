// import { UserModel } from "app/models/UserModel";

// export class UserRepository {
//     constructor() { }

//     async createAccount({ email, password, salt, phone, userType }: UserModel) {
//         const client = await DBClient();
//         await client.connect();
//         const queryString =
//             "INSERT INTO users(email,password,salt,phone,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
//         const values = [email, password, salt, phone, userType];
//         const result = await client.query(queryString, values);
//         await client.end();
//         if (result.rowCount > 0) {
//             return result.rows[0] as UserModel;
//         }
//     }

// }

import { UserModel, UserModelAttributes } from "../models/UserModel";

export class UserRepository {
  async createAccount(userData: UserModelAttributes) {
    try {
      const user = await UserModel.create(userData);
      return user.toJSON() as UserModelAttributes;
    } catch (error) {
        console.error(error);
      throw new Error('Could not create user account');
    }
  }

  async findAccount(email: string) {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        throw new Error('User does not exist with provided email id!');
      }
      return user.toJSON() as UserModelAttributes;
    } catch (error) {
      throw new Error('Could not find user account');
    }
  }
}
