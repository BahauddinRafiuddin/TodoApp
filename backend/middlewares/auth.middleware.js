import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlers } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandlers(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized Request!!")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("Token received:", token);
        // console.log("Decoded token:", decodedToken);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!!")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Inavlid Access Token", error)
    }
}) 