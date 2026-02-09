import  {asyncHandler}  from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser =  asyncHandler( async (req, res) => {
   // get user details from frontend
   //validation - like (not empty)
   //check if user already exist: can do using username as well as email
   //check for images,check for avatars
   //upload them to cloudinary,avatar
   //create user object - create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return res
   

   const {fullName,email,username,password} = req.body
   console.log("email: ",email);

   if(
    [fullName, email, username, password].some((field) =>
    field?.trim() === "")
   ) {
       throw new ApiError(400,"All field are required")
   }
   const existedUser = await User.findOne({
    $or: [{username} ,{email}]
   })

   if(existedUser) {
    throw new ApiError(409, "User with email or username already exists")
   }
// Add the '?' before [0] in the avatar line to prevent crashes
const avatarLocalPath = req.files?.avatar?.[0]?.path; 
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

   console.log("Avatar Local Path:", avatarLocalPath); 

   const avatar = await uploadOnCloudinary(avatarLocalPath);

  let coverImage;
if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
}

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }

    const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering a user");
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
   )

})


export {registerUser}