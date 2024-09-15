class errorhandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

export const errormiddleware = (err,req,res,next) =>{
    err.message = err.message || "internal server error";
    err.statuscode = err.statuscode || 500;
     if(err.name === "CaseError"){
        const message = `Resource not found.invalid ${err.path}`;
        err = new errorhandler(message,400)
     }
     
     if(err.name === 11000){
        const message = `Duplicate ${object.keys(err.keyValue)} entered`;
        err = new errorhandler(message,400)
     }

     if(err.name === "jsonWebTokenError"){
        const message = `json web token is invalid Try again`;
        err = new errorhandler(message,400)
     }

     if(err.name === "TokenExpiredError"){
        const message = `json web token is exrired please try agai`;
        err = new errorhandler(message,400)
     }
     return res.status(err.statuscode).json({
        success: false,
        message:err.message,
     });

    
};

export default errorhandler;