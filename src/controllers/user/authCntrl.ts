import express from "express";
import bcrypt from "bcrypt";
import userModel from "../../model/userModel.ts";
import { Session } from "express-session";

type UserDet = {
  id: string;
  name: string;
  email: string;
  password: string;
};

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      email: string;
    };
  }
}

class UserAuth {
  private sendResponse(res: express.Response, ok: boolean, msg: string, data: any = null) {
    res.json({ ok, msg, data });
  }

  renderLoginPage(req: express.Request, res: express.Response) {
    res.render("user/login");
  }

  async login(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    try {
      const user: UserDet | null = await userModel.findOne({ email });
      if (!user) {
        return this.sendResponse(res, false, "User not found.");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return this.sendResponse(res, false, "Invalid email or password.");
      }
      req.session.user = { id: user.id, email: user.email };
      this.sendResponse(res, true, "Login successful!");
    } catch (error) {
      this.sendResponse(res, false, "Server error.");
    }
  }

  renderHomePage(req: express.Request, res: express.Response) {
    res.render("user/home");
  }

  renderRegisterPage(req: express.Request, res: express.Response) {
    res.render("user/register");
  }

  async registerPost(req: express.Request, res: express.Response) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return this.sendResponse(res, false, "Email already registered.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ username, email, password: hashedPassword });
      await newUser.save();
      this.sendResponse(res, true, "Registration successful.");
    } catch (error) {
      this.sendResponse(res, false, "Internal server error.");
    }
  }
}

export default UserAuth;
