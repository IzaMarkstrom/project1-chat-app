import { describe, expect, test } from "@jest/globals";
import { Response, Request } from "express";
import { authRegisterController } from "./services/auth";
import { UserModel } from "./models/user-db";

jest.mock("./models/user-db");

const mockRequest: any = {
  body: {
    username: "test_user",
    password: "test_password",
    email: "test_email",
  },
} as Request;

const mockResponse: any = {
  status: jest.fn(),
  json: jest.fn(),
};

it("should send a status code of 409 when user exists", async () => {
  UserModel.findOne = jest.fn().mockReturnValueOnce({ username: "test_user" });
  await authRegisterController(mockRequest, mockResponse);
  expect(mockResponse.status).toHaveBeenCalledWith(409);
  expect(mockResponse.json).toHaveBeenCalledWith("User already exists.");
});
