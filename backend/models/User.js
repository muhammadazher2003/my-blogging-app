import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  socialLinks: {
    website: { type: String, default: "" },
    twitter: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  username: { type: String, unique: true, required: true }, // 👈 added
}, { timestamps: true });

export default mongoose.model("User", userSchema);