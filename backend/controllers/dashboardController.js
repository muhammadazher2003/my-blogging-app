import Post from "../models/Post.js";

export const getDashboard = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId });

    res.json({
      totalPosts: posts.length,
      totalLikes: posts.reduce((sum, p) => sum + p.likes.length, 0),
      totalComments: posts.reduce((sum, p) => sum + p.comments.length, 0),
      posts: posts.map((p) => ({
        id: p._id,
        title: p.title,
        likes: p.likes.length,
        comments: p.comments.length,
        createdAt: p.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};