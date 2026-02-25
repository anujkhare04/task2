
const errorHandler=(err,req,res,next)=>{

    let statuscode=err.statuscode || 500;
    
    
    res.status(statuscode).json({
        success:false,
        message:err.message || "internal server error"
    })

}

module.exports=errorHandler

