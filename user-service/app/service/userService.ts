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

@autoInjectable()
export class UserService {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
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
            if(!verified){
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
        if (payload) {
            const {code, expiry} = GenerateAccessCode();
            // save on DB to confirm verification
            const response = await SendVerificationCode(code, payload.phone);
            return SuccessResponse(payload)
        }
        return SuccessResponse({ message: "response from verify user" })
    }

    async VerifyUser(event: APIGatewayProxyEventV2) {
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