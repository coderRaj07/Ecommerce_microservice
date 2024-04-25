"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Cart = exports.Profile = exports.Verify = exports.Login = exports.Signup = void 0;
const userService_1 = require("../service/userService");
const response_1 = require("../utility/response");
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const core_1 = __importDefault(require("@middy/core"));
const service = new userService_1.UserService();
exports.Signup = (0, core_1.default)((event) => {
    return service.CreateUser(event);
}).use((0, http_json_body_parser_1.default)());
const Login = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return service.UserLogin(event);
});
exports.Login = Login;
const Verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return service.VerifyUser(event);
});
exports.Verify = Verify;
const Profile = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        return (0, response_1.ErrorResponse)(404, "request method is not supported!");
    }
});
exports.Profile = Profile;
const Cart = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        return (0, response_1.ErrorResponse)(404, "request method is not supported!");
    }
});
exports.Cart = Cart;
const Payment = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        return (0, response_1.ErrorResponse)(404, "request method is not supported!");
    }
});
exports.Payment = Payment;
//# sourceMappingURL=userHandler.js.map