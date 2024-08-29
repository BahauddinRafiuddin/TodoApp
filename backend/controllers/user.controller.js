import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.models.js'
import { asyncHandlers } from '../utils/AsyncHandler.js'


const generateRefreshTokenAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, "Error While Generating Token", error)
    }
}

const registerUser = asyncHandlers(async (req, res) => {
    const { username, email, password } = req.body

    if (!username) {
        throw new ApiError(400, "User name Is required!!")
    }
    if (!email) {
        throw new ApiError(400, "email Is required!!")
    }
    if (!password) {
        throw new ApiError(400, "password Is required!!")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "User Alredy Exists!!")
    }


    const user = await User.create({
        username,
        email,
        password
    })

    if (!user) {
        throw new ApiError(500, "Server Error While Registering User")
    }

    return res.status(200)
        .json(
            new ApiResponse(201, user, "User Registred Successfully")
        )
})


const loginUser = asyncHandlers(async (req, res) => {

    const { email, password } = req.body
    if (!email) {
        throw new ApiError(400, "email Is required!!")
    }
    if (!password) {
        throw new ApiError(400, "password Is required!!")
    }

    const user = await User.findOne({
        $or: [{ email }, { password }]
    })

    if (!user) {
        throw new ApiError(404, "User Not Exist!!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password, user.password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Creadentials!!")
    }

    const { refreshToken, accessToken } = await generateRefreshTokenAndAccessToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password ")

    // we need to create Options To Send Cookies ... 
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedUser, accessToken, refreshToken }, "User LogedIn Successfully")
        )

})

const logoutUser = asyncHandlers(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: null
            }
        }, { new: true }
    )

    // console.log('User updated');

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200,{},"Logout succesfull")
    )
})

const changeUserPassword = asyncHandlers(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword) {
        throw new ApiError(400, "Old Password Required!!")
    }
    if (!newPassword) {
        throw new ApiError(400, "New Password Required!!")
    }

    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldPassword, user.password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password!!")
    }

    user.password = newPassword
    await user.save()

    return res.status(200)
        .json(
            new ApiResponse(200, "Password Changed Succesfully!!")
        )
})

const getcurrentuser = asyncHandlers(async (req, res) => {
    const user = await User.findById(req.user?._id).select("-password -refreshToken -createdAt -updatedAt")
    if (!user) {
        throw new ApiError(404, "User Not Found!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, user, "Current User Fetched Successfully")
        )
})

const getAllUser = asyncHandlers(async (req, res) => {
    const allUser = await User.find().select("-password -refreshToken -createdAt -updatedAt")
    return res.status(200)
        .json(
            new ApiResponse(200, allUser, "All User Fetched Successfully")
        )
})

const updateUserDetails = asyncHandlers(async (req, res) => {
    const { username, email } = req.body
    if (!(username || email)) {
        throw new ApiError(400, "UserName And Email Are Required!!")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email
            }
        }, { new: true }
    ).select("-password -refreshToken -createdAt -updatedAt")

    if (!user) {
        throw new ApiError(400, "Cant Find User!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, user, " User Details Updated Successfully")
        )
})
export {
    registerUser,
    loginUser,
    logoutUser,
    changeUserPassword,
    getcurrentuser,
    getAllUser,
    updateUserDetails
}