import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  description:string;
  _id?: mongoose.Types.ObjectId;
  image: string;
  solvedQuestions?: {
    questionId: mongoose.Types.ObjectId;
    solvedAt: Date;
  }[];
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
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    // Updated: solvedQuestions contains timestamps for tracking
    solvedQuestions: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        solvedAt: { type: Date, default: Date.now },
      },
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

// Password Hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Virtual: Total solved problems
userSchema.virtual("totalSolved").get(function () {
  return this.solvedQuestions?.length || 0;
});

// Optional: You can use aggregation to calculate solved per month dynamically

const User = models?.User || model<IUser>("User", userSchema);
export default User;
