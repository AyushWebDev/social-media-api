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

exports.userSignupValidator=(req,res,next)=>{
    req.check('name','name is required').notEmpty();

    req.check('email','email is required').notEmpty();
    req.check('email','email must be between 4 to 100 characters').isLength({
        min: 4,
        max: 100
    })
    req.check('email').matches(/.+\@.+\..+/).withMessage('email is not correct');

    req.check('password','password is required').notEmpty();
    req.check('password').isLength({
        min: 6
    }).withMessage('password must contain atleast 6 characters');

    const errors=req.validationErrors();

    if(errors)
    {
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(404).json({
            error: firstError
        })
    }
    next();
}