import { UserModelAttributes } from 'app/models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const APP_SECRET = "our_app_secret";


export const GetSalt = async () => {
    return await bcrypt.genSalt();
}

export const GetHashedPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
) => {
    const hashedPassword = await GetHashedPassword(enteredPassword, salt);
    return hashedPassword === savedPassword;
}

export const GetToken = ({ email, id, phone, userType }: UserModelAttributes) => {
    return jwt.sign({ email, id, phone, userType }, APP_SECRET, { expiresIn: '1y' });
}

export const VerifyToken = async (token: string): Promise<UserModelAttributes | false> => {
    try {
        if (token !== "") {
            const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
            return payload as UserModelAttributes;
        }
        return false
    }
    catch (error) {
        console.error(error);
        return false;
    }
}