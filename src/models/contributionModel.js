const mongoose = require("mongoose");
const contributionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    topic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topics",
    },
    topic_name: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    submit_date: {
      type: Date,
      required: true,
    },
    document: {
      type: [String],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contribution", contributionSchema);
