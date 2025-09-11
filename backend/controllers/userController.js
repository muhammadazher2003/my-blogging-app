import User from "../models/User.js";
import Post from "../models/Post.js";

// GET profile + blogs
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = req.body.bio || user.bio;
    user.avatar = req.body.avatar || user.avatar;
    user.socialLinks = { ...user.socialLinks, ...req.body.socialLinks };

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
