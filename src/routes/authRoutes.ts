import { Router } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

// Google OAuth
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req: any, res) => {
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );
    const frontendUrl = (process.env.ORIGIN || "http://localhost:5173").replace(/\/$/, "");
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

// GitHub OAuth
authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"], session: false }));
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  (req: any, res) => {
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );
    const frontendUrl = (process.env.ORIGIN || "http://localhost:5173").replace(/\/$/, "");
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

export default authRouter;
