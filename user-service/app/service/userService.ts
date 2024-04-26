import { SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class UserService {
    constructor() { }
    // User Creation, Validation & Login
    async CreateUser(event: APIGatewayProxyEventV2) {
        console.log(event)
        // const body = JSON.parse(event.body) // will be using middy for this
        // console.log(body)
        return SuccessResponse({message:"response from create user"})
    }

    async UserLogin(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from user login"})
    }

    async VerifyUser(event: APIGatewayProxyEventV2) { 
        return SuccessResponse({message:"response from verify user"})
    }

    // Profile Section
    async CreateProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from create user profie"})
    }

    async GetProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Get User Profie"})
    }

    async EditProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Edit User Profie"})
    }

    // Cart Section
    async CreateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from create user cart"})
    }

    async GetCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Get User Cart"})
    }

    async UpdateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Update User Cart"})
    }

    // Payment Section
    async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from create payment method"})
    }

    async GetPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Get payment method"})
    }

    async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message:"response from Update payment method"})
    }
}