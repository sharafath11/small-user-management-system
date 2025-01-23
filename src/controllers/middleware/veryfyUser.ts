import express from "express"
class verifyUser{
    constructor(){}
    veryfyUser(req:express.Request,res:express.Response,next:express.NextFunction):void{
       let user=req.session.user
    }
}