import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    const post = await Post.create({
      title,
      content,
      image,
      tags,
      author: req.userId,
    });
    const populatedPost = await post.populate("author", "name");
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found");

  if (post.likes.includes(req.userId)) {
    post.likes.pull(req.userId);
  } else {
    post.likes.push(req.userId);
  }

  await post.save();
  res.json(post);
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    const user = await User.findById(req.userId);  
    if (!user) return res.status(404).send("User not found");

    post.comments.push({
      user: { id: user._id, name: user.name },
      text: req.body.text,
    });

    await post.save();

    res.json(post);
  } catch (err) {
    console.error("❌ Error adding comment:", err.message);
    res.status(500).send("Server error");
  }
};


export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const { title, content, tags, image } = req.body;
    post.title = title;
    post.content = content;
    post.image = image;
    post.tags = tags;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};