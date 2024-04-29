import { Signup } from "../handler";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { LoginInput, SignupInput } from "../models/dto/index";
import { UserRepository } from "../repository/userRepository";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";
import { SendVerificationCode } from "../utility/notification";
import { GetHashedPassword, GetSalt, GetToken, ValidatePassword, VerifyToken } from "../utility/password";
import { GenerateAccessCode } from "../utility/notification";
import { VerificationInput } from "../models/dto/UpdateInput";
import { TimeDifference } from "../utility/dateHelper";

@autoInjectable()
export class UserService {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async ResponseWriteError(event: APIGatewayProxyEventV2) {
        return ErrorResponse(404, "Request Method is not supported")
    }

    async CreateUser(event: APIGatewayProxyEventV2) {
        try {
            // to transform a plain JavaScript object (event.body) 
            // into an instance of the SignupInput class
            const input = plainToClass(SignupInput, event.body);
            const error = await AppValidationError(input);
            if (error) return ErrorResponse(404, error);

            const salt = await GetSalt();
            const hashedPassword = await GetHashedPassword(input.password, salt);
            console.log(salt, hashedPassword, "SALT AND HASHED PASSWORD")
            const data = await this.repository.createAccount({
                email: input.email,
                password: hashedPassword,
                phone: input.phone,
                userType: "BUYER",
                salt: salt,
            });
            return SuccessResponse(data)

        } catch (error) {
            console.error(error, "from userService");
            return ErrorResponse(500, error);
        }
    }

    async UserLogin(event: APIGatewayProxyEventV2) {
        try {
            const input = plainToClass(LoginInput, event.body);
            const error = await AppValidationError(input);
            if (error) return ErrorResponse(404, error);

            const data = await this.repository.findAccount(input.email);
            const verified = await ValidatePassword(input.password, data.password, data.salt);
            if (!verified) { return ErrorResponse(404, "Invalid Password"); }
            if (!verified) {
                throw new Error("Invalid Password")
            }
            const token = GetToken(data);

            return SuccessResponse({ token })

        } catch (error) {
            console.error(error, "from userService Login");
            return ErrorResponse(500, error);
        }
    }

    async GetVerificationToken(event: APIGatewayProxyEventV2) {
        const token = event.headers.authorization;
        const payload = await VerifyToken(token);
        if (!payload) {
            return ErrorResponse(404, "Authorisation Failed")
        }
        const { code, expiry } = GenerateAccessCode();

        // save on DB to confirm verification
        await this.repository.updateVerificationCode(payload.user_id, code, expiry);
        
        // To be uncommented for production 
        // to send verification code to Phone
        // await SendVerificationCode(code, payload.phone);

        return SuccessResponse({ message: "Verification code is sent to the mobile number" })
    }

    async VerifyUser(event: APIGatewayProxyEventV2) {
        const token = event.headers.authorization;
        const payload = await VerifyToken(token);
        if (!payload) {
            return ErrorResponse(404, "Authorisation Failed")
        }

        const input = plainToClass(VerificationInput, event.body);
        const error = await AppValidationError(input);
        if (error) {
            return ErrorResponse(404, error);
        }

        // find the user account
        const { verification_code, expiry } = await this.repository.findAccount(payload.email);
        if (verification_code === parseInt(input.code)) {
            // check expiry 
            const currentTime = new Date();
            const diff = TimeDifference(expiry.toISOString(), currentTime.toISOString(), "m");
            if (diff > 0) {
                console.log(diff, "TIME DIFFERENCE")
                console.log("Verified Successfully")
                // update on db
                await this.repository.updateVerifyUser(payload.user_id);
            }
            else {
                return ErrorResponse(404, "Verification code has expired")
            }


        }

        return SuccessResponse({ message: "response from verify user" })
    }

    // Profile Section
    async CreateProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create user profie" })
    }

    async GetProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Get User Profie" })
    }

    async EditProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Edit User Profie" })
    }

    // Cart Section
    async CreateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create user cart" })
    }

    async GetCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Get User Cart" })
    }

    async UpdateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Update User Cart" })
    }

    // Payment Section
    async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create payment method" })
    }

    async GetPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Get payment method" })
    }

    async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from Update payment method" })
    }
}