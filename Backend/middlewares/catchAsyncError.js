export const catchAsyncError = (solve) =>{
    return (req,res,next)=>{
        Promise.resolve(solve(req,res,next)).catch(next);
    };
};