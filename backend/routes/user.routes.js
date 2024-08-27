import { Router } from "express";
import {
    changeUserPassword,
    getAllUser,
    getcurrentuser,
    loginUser,
    logoutUser,
    registerUser,
    updateUserDetails
} from "../controllers/user.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/change-password').post(verifyJwt, changeUserPassword)
router.route('/getcurrentuser').get(verifyJwt,getcurrentuser)
router.route('/getAllUser').get(verifyJwt,getAllUser)
router.route('/updateUserDetails').patch(verifyJwt,updateUserDetails)
export default router