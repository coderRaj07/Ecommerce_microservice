import { Signup } from "../handler";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { UserRepository } from "../repository/userRepository";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";
import { GetHashedPassword, GetSalt } from "../utility/password";

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
        return SuccessResponse({ message: "response from user login" })
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