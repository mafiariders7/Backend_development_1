class ErrorHandler extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode;
  }
}

export const errormiddleWare = (err,req,res,next)=>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
    return res
      .status(err.statusCode)
      .json({
          success: false,
          // message: "Invalid Id"'
          message:err.message
      })
  }

export default ErrorHandler;