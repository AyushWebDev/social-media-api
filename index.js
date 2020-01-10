exports.createPostValidator=(req,res,next)=>{
    req.check("title","Write A Title").notEmpty();
    req.check("title","length of Title should be between 4 to 150").isLength({
        min: 4,
        max: 150
    })
    req.check("body","Write The Body").notEmpty();
    req.check("body","length of the Body should be between 4 to 150").isLength({
        min: 4,
        max: 150
    })

    const errors=req.validationErrors();
    //to display first error as they occur
    if(errors)
    {
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }

    next();
}