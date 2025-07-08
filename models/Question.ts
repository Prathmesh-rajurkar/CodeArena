import mongoose from "mongoose";

const StarterCodeSchema = new mongoose.Schema({
  language: { type: String, required: true }, // e.g. "python", "cpp", "javascript"
  code: { type: String, required: true },
});

const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expected_output: { type: String, required: true },
  is_sample: { type: Boolean, default: false },
});

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    function_name: String,
    language: String,
    starter_code: [StarterCodeSchema],
    test_cases: [TestCaseSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
