import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        minLength: [3, "name must contain 3 character"],
        maxLength: [20, "name can't exceed 30 character"],
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        validate: [validator.isEmail, "please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "provide your ph no"],

    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minLength: [7, "name must contain 7 character"],
        maxLength: [32, "name can't exceed 33 character"],
        select:false,
    },
    role: {
        type: String,
        required: [true, "please provide your role"],
        enum: ["job seeker", "Employee"],
    },
    createdAT: {
        type: Date,
        default: Date.now,
    },
});

// HASING PASSWORD

userschema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// COMPARING PASSWORD
userschema.methods.comparepassword = async function (enterpassword) {
    return await bcrypt.compare(enterpassword, this.password);
}
//GENERATING A JWT FOR AUTHENTICATION
userschema.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

export const User = mongoose.model("User", userschema);