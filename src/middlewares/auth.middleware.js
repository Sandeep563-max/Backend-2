import { User } from "../models/user.model.js"; // Added .js
import { ApiError } from "../utils/ApiError.js";   // Added .js
import { asyncHandler } from "../utils/asyncHandler.js"; // Added .js
import jwt from "jsonwebtoken"; // No .js needed for npm packages

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Logic now sits safely outside the 'if(!token)' block but inside the 'try'
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();

    } catch (error) {
        // As requested: catching any verification errors here
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});