import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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


export default router