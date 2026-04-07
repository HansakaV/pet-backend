import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  avatar?: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String },
    githubId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

userSchema.pre<User>("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (this: User, password: string) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;
