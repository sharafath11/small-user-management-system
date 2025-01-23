import express from "express"
class verifyUser{
    constructor(){}
    userverfy(req:express.Request,res:express.Response,next:express.NextFunction):void{
       if(req.session.user) next();
       else  res.render("/")
    }
}
export default verifyUser