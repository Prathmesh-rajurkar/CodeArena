import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    user_id: { type: String, required: true },
    language: String,
    code: String,
    result: String,
    output: String,
  },
  { timestamps: true }
);

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
