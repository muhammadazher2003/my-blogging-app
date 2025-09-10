import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {id:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },name:String},
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);