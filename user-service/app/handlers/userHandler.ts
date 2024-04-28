import { container } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { UserService } from "../service/userService"
import { ErrorResponse } from "../utility/response";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";

const service = container.resolve(UserService);


export const Signup = middy((event: APIGatewayProxyEventV2) => {
    return service.CreateUser(event);
}).use(bodyParser());


export const Login = middy((event: APIGatewayProxyEventV2) => {
    return service.UserLogin(event);
}).use(bodyParser());

export const Verify = async (event: APIGatewayProxyEventV2) => {
    return service.VerifyUser(event);
}

export const Profile = async (event: APIGatewayProxyEventV2) => {
    // get // put // post
    const httpMethod = event.requestContext.http.method.toUpperCase();
    if (httpMethod === "GET") {
        return service.GetProfile(event);
    }
    else if (httpMethod === "POST") {
        return service.CreateProfile(event);
    }
    else if (httpMethod === "PUT") {
        return service.EditProfile(event);
    }
    else {
        return ErrorResponse(404, "request method is not supported!")
    }
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
    // get // put // post
    const httpMethod = event.requestContext.http.method.toUpperCase();
    if (httpMethod === "GET") {
        return service.GetCart(event);
    }
    else if (httpMethod === "POST") {
        return service.CreateCart(event);
    }
    else if (httpMethod === "PUT") {
        return service.UpdateCart(event);
    }
    else {
        return ErrorResponse(404, "request method is not supported!")
    }
}

export const Payment = async (event: APIGatewayProxyEventV2) => {
    // get // put // post
    const httpMethod = event.requestContext.http.method.toUpperCase();
    if (httpMethod === "GET") {
        return service.GetPaymentMethod(event);
    }
    else if (httpMethod === "POST") {
        return service.CreatePaymentMethod(event);
    }
    else if (httpMethod === "PUT") {
        return service.UpdatePaymentMethod(event);
    }
    else {
        return ErrorResponse(404, "request method is not supported!")
    }
}