import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import errorhandler from '../middlewares/error.js'
import { jobpostportal } from '../models/jobschema.js'


//----------- get all jobs that posted by Employee--------
export const getalljobs = catchAsyncError(async (req, res, next) => {
   const jobs = await jobpostportal.find({ expire: false });
   res.status(200).json({
      success: true,
      jobs,
   });
});

// ------- job post by employee--------------
export const postjob = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   //  const {role} = req.user; 
   if (role === "job seeker") {
      return next(new errorhandler("job seeker is not allowed to post job", 400));
   }
   const { tittle, description, category, country, city, location, fixedsalary, salaryFrom, salaryTo } = req.body;
   if (!tittle || !description || !category || !country || !city || !location) {
      return next(new errorhandler("please provide full details about your job", 400));
   }
   if ((!salaryFrom || !salaryTo) && !fixedsalary) {
      return next(new errorhandler("Please provide range salary or fixed salary"));
   }
   if (salaryFrom && salaryTo && fixedsalary) {
      return next(new errorhandler("You can't provide both salary"));
   }

   const postedBy = req.user._id;
   const job = await jobpostportal.create({
      tittle,
      description,
      category,
      country,
      city,
      location,
      fixedsalary,
      salaryFrom,
      salaryTo,
      postedBy
   })
   res.status(200).json({
      success: true,
      message: "job posted succesfully",
      job
   })
});


//---use to check employeer all posted job-----
export const getmyJobs = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "job seeker") {
      return next(new errorhandler("job seeker is not allowed to post job", 400));
   }
   const myjobs = await jobpostportal.find({ postedBy: req.user._id });
   res.status(200).json({
      success: true,
      myjobs
   })
});


// ----------update to a posted job--------
export const updatejob = catchAsyncError(async (req, res, next) => {
   const role = req.user.role;
   if (role === "job seeker") {
      return next(new errorhandler("job seeker is not allowed to post job", 400));
   }
   // use to update a specific job////
   const {id } = req.params;
   let job = await jobpostportal.findById(id);
   if (!job) {
      return next(new errorhandler("Oops! job not found", 404));

   }
   job = await jobpostportal.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   })
   res.status(200).json({
      success:true,
      job,
      message:"your job is updated succesfully"

   })
});

// -----------Delete job----------
export const deletejob = catchAsyncError(async(req,res,next)=>{
   const role = req.user.role;
   if (role === "job seeker") {
      return next(new errorhandler("job seeker is not allowed to post job", 400));
   }
   const { id } = req.params;
   let job = await jobpostportal.findById(id);
   if (!job) {
      return next(new errorhandler("Oops! job not found", 404));

   }
   await job.deleteOne();
   res.status(200).json({
      success:true,
      message:"you succesfully deleted yor job"
   })
});

export const getsinglejob = catchAsyncError(async(req,res,next)=>{
   const {id} = req.params;
   try{
      const job = await jobpostportal.findById(id);
      if(!job){
         return next(new errorhandler("Oops! job not found", 404));
      }
      res.status(200).json({
         success:true,
         job
      })
   }
   catch(error){
      return next(new errorhandler("Invalid Id or cast error", 400));
   }
})