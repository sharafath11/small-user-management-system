import express from "express";
import userModel from "../../model/userModel.ts";

class AdminHandler {
    private sendResponse(res: express.Response, ok: boolean, msg: string, data: any = null) {
        res.json({ ok, msg, data });
    }

    loginPageRender(req: express.Request, res: express.Response) {
        res.render("admin/login");
    }

    loginHandler(req: express.Request, res: express.Response) {
        const { name, password } = req.body;
        try {
            if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
                req.session.user.admin=true
                this.sendResponse(res, true, "Login successful :)");
              
                
                console.log(req.session.user)
            } else {
                this.sendResponse(res, false, "Invalid password or name");
            }
        } catch (error) {
            this.sendResponse(res, false, "Server error");
        }
    }

    async dashboardRender(req: express.Request, res: express.Response) {
        const userDetails = await userModel.find();
        res.render("admin/dashboard", { users: userDetails });
    }

    async editTheUser(req: express.Request, res: express.Response) {
        const { currentUserId, newName } = req.body;
        try {
            const updatedUser = await userModel.findByIdAndUpdate(currentUserId, { username: newName }, { new: true });
            if (updatedUser) {
                this.sendResponse(res, true, "Updated successfully :)");
            } else {
                this.sendResponse(res, false, "User not found");
            }
        } catch (error) {
            this.sendResponse(res, false, "An error occurred, please try again later");
        }
    }
    async delete(req: express.Request, res: express.Response) {
        const { userId } = req.body;
        
        if (!userId) {
            return this.sendResponse(res, false, "User ID is required");
        }
    
        try {
            const user = await userModel.findByIdAndDelete(userId);
            if (user) {
                return this.sendResponse(res, true, "User deleted successfully");
            } else {
                return this.sendResponse(res, false, "User not found");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return this.sendResponse(res, false, "An error occurred while deleting the user. Please try again later.");
        }
    }
    logout(req: express.Request, res: express.Response): void {
        req.session.user.admin=false
        this.sendResponse(res,true,"noting man")
     }
    
}

export default AdminHandler;
