exports. pageNotFound=(res,req,next)=>{
    const error= new Error('the page is  not found');
    error.status=404;
    next(error);
}

exports.ErrorCghout=(error,req,res,next)=>{
    res.status(error.status||500);
    res.json(
        {
            error:{
                message:error.message,
            },
        })
}    
