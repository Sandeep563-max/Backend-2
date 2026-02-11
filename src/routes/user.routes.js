import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(
    // Change maxcount to maxCount
upload.fields([
    {
        name: "avatar",
        maxCount: 1 // Fixed capital C
    },
    {
        name: "coverImage",
        maxCount: 1 // Fixed capital C
    }
]),
    registerUser
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.routte("/refresh-Token").post(refreshAccessToken)



export default router