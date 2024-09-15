import mongoose from "mongoose";
import validator from "validator";
// import isEmail from "validator/lib/isEmail";

const applicationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name must"],
        minLength: [2, "name must be minimum 2 character"],
        maxLength: [30, "name can't execed 30 character"]
    },
    email:{
        type:String,
        // validator:[validator.isEmail,"please provide a valid email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email."
        },

        required:[true,"please provide your email"],
        
    },
    coverletter:{
        type:String,
        required:[true,"please write about your cover Letter"]
    },
    phone:{
        type:Number,
        required:[true,"provide your contact number"]
    },
    address:{
        type:String,
        required:[true,"provide your address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["job seeker"]
        }
    },
    employeerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["Employee"]
        }

    }
});

export const Application = mongoose.model("Application",applicationschema);