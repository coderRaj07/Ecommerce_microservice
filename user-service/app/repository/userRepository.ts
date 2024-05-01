
import { ProfileInput } from "../models/dto";
import { UserModel, UserModelAttributes } from "../models/UserModel";
import { CRUDOperations } from "./dbOperation";
import { AddressRepository } from "./addressRepository";
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository extends CRUDOperations<UserModel> {

  constructor(private addressRepository: AddressRepository) {
    super(UserModel);
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

  async updateVerificationCode(userId: number, verificationCode: number, expiry: Date): Promise<void> {
    try {
      // update only if user not verified
      // else throw error user already verified
      // Once user verifed always verified, 
      // it is an OTP scene where the code is valid for a certain time 
      // (30 mins to 1 yr)
      const user = await this.find({ user_id: userId });
      if (user.verified) {
        throw new Error('User already verified');
      }

      await this.update(
        { user_id: userId },
        { verification_code: verificationCode, expiry }
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Could not update verification information: ${error.message}`);
    }
  }

  async updateVerifyUser(userId: number): Promise<void> {
    try {
      // check if user not verified
      // then verify
      // else throw error user already verified
      const user = await this.find({ user_id: userId });
      if (user.verified) {
        throw new Error('User already verified');
      }
      await this.update(
        { user_id: userId },
        { verified: true }
      );

    } catch (error) {
      console.error(error);
      throw new Error(`Could not update verification information: ${error.message}`);
    }
  }

  async updateUser(
    user_id: number,
    first_name: string,
    last_name: string,
    userType: "BUYER" | "SELLER",
  ) {
    try {
      await this.update(
        { user_id },
        { first_name, last_name, userType }
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Could not update user information: ${error.message}`);
    }
  }

  async createProfile(user_id: number, {
    firstName,
    lastName,
    userType,
    address: {
      addressLine1,
      addressLine2,
      city,
      country,
      postCode
    }
  }: ProfileInput) {

    await this.addressRepository.createAddress(
      user_id,
      addressLine1,
      addressLine2,
      city,
      country,
      postCode
    );

    const updatedUser = await this.updateUser(
      user_id,
      firstName,
      lastName,
      userType as "BUYER" | "SELLER",
    );
    return true;
  }

  async getUserProfile(user_id: number) {
    try {
      const user = await this.find({ user_id });
      if (!user) {
        throw new Error('User not found');
      }
      const { first_name, last_name, email, phone, userType, verified } = user;

      const address = await this.addressRepository.find({ user_id });
      return { first_name, last_name, email, phone, userType, verified, address };
    } catch (error) {
      console.error(error);
      throw new Error(`Could not get user profile: ${error.message}`);
    }
  }

  async editProfile(user_id: number,
    {
      firstName,
      lastName,
      userType,
      address: {
        addressLine1,
        addressLine2,
        city,
        country,
        postCode
      }
    }: ProfileInput) {
    try {
      await this.updateUser(
        user_id,
        firstName,
        lastName,
        userType as "BUYER" | "SELLER",
      );

      await this.addressRepository.update(
        { user_id },
        {
          address_line1: addressLine1,
          address_line2: addressLine2,
          city,
          country,
          post_code: postCode
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Could not update user profile: ${error.message}`);
    }
  }
}


