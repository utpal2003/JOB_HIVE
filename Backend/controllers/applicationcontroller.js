import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import errorhandler from '../middlewares/error.js'
import { Application } from '../models/applicationschema.js'
import cloudinary from 'cloudinary'
import { jobpostportal } from '../models/jobschema.js';


// -- Employer check all application-----------
export const EmployeerGetallAplication = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "job seeker") {
      return next(new errorhandler("job seeker is not allowed to check application", 400));
   }
   const { _id } = req.user;
   const application = await Application.find({ "employeerID.user": _id });
   res.status(200).json({
      success: true,
      application
   })
});


// -----job seeker check his application----
export const jobseekerGetallAplication = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "Employee") {
      return next(new errorhandler("Employeer can't check other application", 400));
   }
   const { _id } = req.user;
   const application = await Application.find({ "applicantID.user": _id });
   res.status(200).json({
      success: true,
      application
   })
})


// ------ job seeker can delet their apllication here----
export const jobseekerdeleteapplication = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "Employee") {
      return next(new errorhandler("Employeer can't delete job seeker application", 400));
   }
   const { id } = req.params;
   const application = await Application.findById(id);
   if (!application) {
      return next(new errorhandler("Opps! application not found", 404));
   }
   await application.deleteOne();
   res.status(200).json({
      success: true,
      message: "Application deleted succesfully",
   })
});


// ----- Post resume or upload resume---------
// export const postApplication = catchAsyncError(async (req, res, next) => {
//    const role = req.user.role;
//    if (role === "Employee") {
//       return next(new errorhandler("Employeer can't post any application", 400));
//    }
//    if (!req.files || Object.keys(req.files).length === 0) {
//       return next(new errorhandler("Please upload your resume"))
//    }
//    const { resume } = req.files;

//    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp']; // Corrected variable name and file formats
//    if (!allowedFormats.includes(resume.mimetype)) {
//       return next(new errorhandler("Invalid file type. Accepted only png, jpeg, webp formats", 400)); // Added status code 400
//    }
//    try {
//       const cloudinaryRes = await cloudinary.uploader.upload(resume.tempFilePath); // Corrected syntax for cloudinary upload
//       if (!cloudinaryRes || cloudinaryRes.error) {
//          console.error("Cloudinary Error"); // Corrected syntax for console.error
//          return next(new errorhandler("Failed to upload resume", 500));
//       }
//       // Handle successful upload
//       res.status(200).json({ cloudinaryRes });
//    } catch (error) {
//       console.error("Cloudinary Error:", error); // Log the error
//       return next(new errorhandler("Failed to upload resume", 500));
//    }

//    const { name, email, coverletter, phone, address, jobId } = req.body;
//    const applicantID = {
//       user: req.user._id,
//       role: "job seeker"
//    };
//    if (!jobId) {
//       return next(new errorhandler("JOb not found", 404));
//    }
//    const jobdetails = await jobId.findById(jobId);
//    if (!jobdetails) {
//       return next(new errorhandler("JOb not found", 404));
//    }

//    const employeerID = {
//       user: jobdetails.postedBy,
//       role: "Employee",
//    };

//    if (
//       !name ||
//       !email ||
//       !coverletter ||
//       !phone ||
//       !address ||
//       !applicantID ||
//       !employeerID ||
//       !resume) {
//       return next(new errorhandler("Please fill full details", 400));
//    }
//    const application = await Application.create({
//       name,
//       email,
//       coverletter,
//       phone,
//       address,
//       applicantID,
//       employeerID,
//       resume: {
//          public_id: cloudinaryRes.public_id,
//          url: cloudinaryRes.secure_url,
//       }
//    });
//    res.status(200).json({
//       success: true,
//       message: "Application submited succesfully",
//       application
//    })
// });
////////////////////
export const postApplication = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "Employee") {
      return next(new errorhandler("Employeer can't post any application", 400));
   }
   if (!req.files || Object.keys(req.files).length === 0) {
      return next(new errorhandler("Please upload your resume", 400)); // Added status code 400
   }

   // Parsing req.body
   const { name, email, coverletter, phone, address, jobId } = req.body;
   const applicantID = {
      user: req.user._id,
      role: "job seeker"
   };
   if (!jobId) {
      return next(new errorhandler("Job not found", 404));
   }
   const jobdetails = await jobpostportal.findById(jobId);
   if (!jobdetails) {
      return next(new errorhandler("Job not found", 404));
   }

   const employeerID = {
      user: jobdetails.postedBy,
      role: "Employee",
   };

   if (!name || !email || !coverletter || !phone || !address || !applicantID || !employeerID) {
      return next(new errorhandler("Please fill full details", 400));
   }

   const { resume } = req.files;

   const allowedFormats = ['image/png', 'image/jpeg', 'image/webp']; // Corrected variable name and file formats
   if (!allowedFormats.includes(resume.mimetype)) {
      return next(new errorhandler("Invalid file type. Accepted only png, jpeg, webp formats", 400)); // Added status code 400
   }

   try {
      const cloudinaryRes = await cloudinary.uploader.upload(resume.tempFilePath); // Corrected syntax for cloudinary upload
      if (!cloudinaryRes || cloudinaryRes.error) {
         console.error("Cloudinary Error"); // Corrected syntax for console.error
         return next(new errorhandler("Failed to upload resume", 500));
      }
      // Handle successful upload
      const application = await Application.create({
         name,
         email,
         coverletter,
         phone,
         address,
         applicantID,
         employeerID,
         resume: {
            public_id: cloudinaryRes.public_id,
            url: cloudinaryRes.secure_url,
         }
      });
      res.status(200).json({
         success: true,
         message: "Application submitted successfully",
         application
      });
   } catch (error) {
      console.error("Cloudinary Error:", error); // Log the error
      return next(new errorhandler("Failed to upload resume", 500));
   }
});
