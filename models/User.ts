import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  image: string;
  solvedQuestions?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  streak?: number;
  maxStreak?: number;
  lastSolved?: Date;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: String,
    solvedQuestions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    ],
    streak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    lastSolved: { type: Date, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
