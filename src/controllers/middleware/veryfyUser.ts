import express from "express"
class verifyUser{
    constructor(){}
    userverfy(req:express.Request,res:express.Response,next:express.NextFunction):void{
       if(req.session.user) next();
       else  res.render("/")
    }
    adminVerify(req:express.Request,res:express.Response,next:express.NextFunction){
        console.log("grjshbjirtg",req.session.user)
        if(req.session.user?.admin==true) next()
            else res.redirect("/")
    }
}
export default verifyUser