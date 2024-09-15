import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import errorhandler from '../middlewares/error.js'
import { User } from '../models/userschema.js'
import { sendToken } from '../utils/jwtToken.js'

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new errorhandler("please fill ful registration form"));
    }
    const isemail = await User.findOne({ email });
    if (isemail) {
        return next(new errorhandler("email already exists"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    })

    sendToken(user, 200, res, "User Registered succesfully")
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new errorhandler("please provide email password and role", 400)
        );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorhandler("Invalid email or password"));
    }
    const ispasswordmatch = await user.comparepassword(password);
    if (!ispasswordmatch) {
        return next(new errorhandler("Invalid password", 400));
    }
    if (user.role !== role) {
        return next(new errorhandler("User with this role not found", 400));
    }
    sendToken(user, 200, res, "User logged in succesfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
        .json({
            success: true,
            message: "User looged out succesfully!",
        });
});


export const getUser = catchAsyncError((req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,

    });
});
