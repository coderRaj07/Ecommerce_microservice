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


import { UserModelAttributes } from "../models/UserModel";
import { CRUDOperations } from "./dbOperation";

export class UserRepository extends CRUDOperations<UserModelAttributes> {
  constructor() {
    super();
  }

  async createAccount(userData: UserModelAttributes) {
    try {
      return await this.create(userData);
    } catch (error) {
      console.error('Error creating account:', error);
      throw new Error(`Could not create account: ${error.message}`);
    }
  }

  async findAccount(email: string) {
    try {
      return await this.find({ email });
    } catch (error) {
      console.error('Error finding account:', error);
      throw new Error(`Could not find account: ${error.message}`);
    }
  }

  async updateVerification(userId: number, verificationCode: number, expiry: Date): Promise<void> {
    try {
      await this.update(
        { user_id: userId },
        { verification_code: verificationCode, expiry }
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Could not update verification information: ${error.message}`);
    }
  }
}


