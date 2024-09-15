import mongoose from "mongoose";
// import { stripLow } from "validator";
const jobschema = new mongoose.Schema({
    tittle: {
        type: String,
        required: [true, "Please provide job tittle"],
        minLength: [2, "tittle minimum contain 2 character"],
        maxLength: [40, "job tittle contain maximum 40 character"],
    },
    description: {
        type: String,
        required: [true, "Please provide job description"],
        minLength: [5, "tittle minimum contain 5 character"],
        maxLength: [400, "job tittle contain maximum 400 character"],
    },
    category: {
        type: String,
        required: [true, "job category must required"],
    },
    country: {
        type: String,
        required: [true, "please mention the country"],

    },
    city: {
        type: String,
        required: [true, "city must be described"],
    },
    location: {
        type: String,
        required: [true, "Please provide your exact location"],
    },
    fixedsalary: {
        type: Number,
        minLength: [4, "minmum salay is too low"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "minmum salay is too low"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "minmum salay is too low"],
    },
    expire: {
        type: Boolean,
        default: false,
    },
    jobpostdate: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        refernce:"User",
        required:true,
    }

})
export const jobpostportal = mongoose.model("jobpostportal",jobschema)