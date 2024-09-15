export const sendToken = (user,statuscode,res,message) =>{
    const token = user.getJWTtoken();
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 *1000
        ),
        httpOnly: true,
    };
    res.status(statuscode).cookie("token",token,option).json({
        success:true,
        user,
        message,
        token
    });
};