import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import UserModel from "../models/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "temp",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "temp",
      callbackURL: `${(process.env.BACKEND_URL || "http://localhost:3000").replace(/\/$/, "")}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          // Check if user exists with this email
          const email = profile.emails?.[0].value;
          user = await UserModel.findOne({ email });
          
          if (user) {
            user.googleId = profile.id;
            user.avatar = user.avatar || profile.photos?.[0].value;
            await user.save();
          } else {
            user = await UserModel.create({
              name: profile.displayName,
              email: email,
              googleId: profile.id,
              avatar: profile.photos?.[0].value,
            });
          }
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "temp",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "temp",
      callbackURL: `${(process.env.BACKEND_URL || "http://localhost:3000").replace(/\/$/, "")}/api/auth/github/callback`,
    },
    async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
      try {
        let user = await UserModel.findOne({ githubId: profile.id });
        if (!user) {
          const email = profile.emails?.[0].value || `${profile.username}@github.com`;
          user = await UserModel.findOne({ email });

          if (user) {
            user.githubId = profile.id;
            user.avatar = user.avatar || profile.photos?.[0].value;
            await user.save();
          } else {
            user = await UserModel.create({
              name: profile.displayName || profile.username,
              email: email,
              githubId: profile.id,
              avatar: profile.photos?.[0].value,
            });
          }
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
