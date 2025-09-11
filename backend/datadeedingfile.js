// seedPosts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/Post.js"; // <-- make sure Post.js exists and exports Post model

dotenv.config();

// Your real user IDs
const authors = [
  new mongoose.Types.ObjectId("68c27eaa415ff79dac2d5599"),
  new mongoose.Types.ObjectId("68c27c886ac531f90894d5db"),
];

const posts = [
  {
    title: "The Future of Web Development: MERN Stack",
    content: `
Excerpt:
The MERN stack (MongoDB, Express.js, React, Node.js) continues to dominate modern web development. Its ability to integrate back-end and front-end seamlessly makes it an unbeatable choice for developers worldwide.

Content Outline:

Introduction: Overview of why full-stack JavaScript is trending.
Point 1: How MongoDB's schema flexibility accelerates prototyping.
Point 2: Express.js for building scalable REST/GraphQL APIs.
Point 3: React’s component-driven UI architecture.
Point 4: Node.js enabling real-time apps with event-driven design.
Point 5: The rise of serverless and cloud-native MERN deployments.
Conclusion: Why MERN remains the future for startups and enterprises.
    `,
    author: authors[0],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // coding workspace
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Understanding React 18 Features",
    content: `
Excerpt:
React 18 introduced game-changing features like concurrent rendering and automatic batching, making apps faster and more responsive.

Content Outline:

Introduction: The evolution of React since hooks.
Point 1: Concurrent rendering explained simply.
Point 2: The useTransition hook for smoother UIs.
Point 3: Automatic batching for optimized renders.
Point 4: React Server Components – the new paradigm.
Point 5: Migration tips for upgrading safely.
Conclusion: React 18 as the foundation for future innovation.
    `,
    author: authors[1],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159", // React logo style
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Why MongoDB is Perfect for Scalable Applications",
    content: `
Excerpt:
MongoDB has become the database of choice for modern applications due to its flexible document structure and ability to scale horizontally.

Content Outline:

Introduction: Challenges of scaling traditional SQL databases.
Point 1: Schema-less design and agile development.
Point 2: Sharding for high availability.
Point 3: Real-world examples: e-commerce and IoT platforms.
Point 4: Indexing and performance optimization tips.
Point 5: Integrations with cloud providers like Atlas.
Conclusion: MongoDB as a future-proof solution.
    `,
    author: authors[0],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475", // database server racks
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Top 5 Security Practices for Node.js Developers",
    content: `
Excerpt:
Security is non-negotiable. Node.js developers must adopt best practices to protect apps from common vulnerabilities.

Content Outline:

Introduction: The importance of secure coding in Node.js.
Tip 1: Validate all user input to prevent injection attacks.
Tip 2: Use environment variables for sensitive data.
Tip 3: Enable HTTPS and secure cookies.
Tip 4: Implement rate limiting and request sanitization.
Tip 5: Keep dependencies updated and audit regularly.
Conclusion: Security as a continuous responsibility.
    `,
    author: authors[1],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7rRwFxngvgtuEc-cHhVEFoHMz741p8EdNw&s", // cyber security
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "The Power of Tailwind CSS in Modern UI Design",
    content: `
Excerpt:
Tailwind CSS is reshaping front-end workflows by making responsive UI development faster and more maintainable.

Content Outline:

Introduction: CSS challenges before Tailwind.
Point 1: Utility-first approach vs traditional CSS.
Point 2: Building responsive layouts with ease.
Point 3: Dark mode, theming, and customization.
Point 4: Why startups love Tailwind for MVPs.
Point 5: Scaling design systems with Tailwind + Storybook.
Conclusion: Tailwind CSS as the standard for modern UIs.
    `,
    author: authors[0],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d", // colorful UI/UX design
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "How to Optimize API Performance in Express.js",
    content: `
Excerpt:
APIs are the backbone of modern apps. Optimizing performance in Express.js ensures scalability and smooth user experiences.

Content Outline:

Introduction: Why API performance matters.
Point 1: Using caching layers like Redis.
Point 2: GZIP compression for faster responses.
Point 3: Efficient database queries with indexing.
Point 4: Load balancing and clustering in Node.js.
Point 5: Monitoring and profiling with tools like PM2.
Conclusion: Building APIs that scale gracefully.
    `,
    author: authors[1],
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80", // API concept
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Deploying Applications with Docker and Kubernetes",
    content: `
Excerpt:
Modern DevOps is incomplete without Docker and Kubernetes. Together, they bring scalability, resilience, and automation.

Content Outline:

Introduction: The shift from VMs to containers.
Point 1: Why Docker simplifies packaging.
Point 2: Kubernetes orchestration fundamentals.
Point 3: Scaling apps automatically with K8s.
Point 4: Networking, secrets, and config management.
Point 5: CI/CD pipelines with Docker + Kubernetes.
Conclusion: The DevOps future powered by containers.
    `,
    author: authors[0],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", // devops servers
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "GraphQL vs REST: Which Should You Choose?",
    content: `
Excerpt:
Choosing between GraphQL and REST is a common dilemma. Both have strengths, but the right choice depends on your use case.

Content Outline:

Introduction: The API landscape in 2025.
Point 1: REST simplicity and wide adoption.
Point 2: GraphQL flexibility and single-query efficiency.
Point 3: Performance considerations.
Point 4: Real-world adoption stories.
Point 5: Hybrid approaches for complex systems.
Conclusion: Choosing based on project requirements.
    `,
    author: authors[1],
    image: "https://www.myratechnolabs.com/wp-content/uploads/2024/05/GraphQL-vs-REST-APIs-in-Laravel.jpg", // GraphQL REST concept
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Mastering JavaScript ES2025 Features",
    content: `
Excerpt:
JavaScript continues to evolve rapidly. ES2025 brings powerful new features to make code cleaner and more expressive.

Content Outline:

Introduction: JavaScript’s journey from ES5 to ES2025.
Point 1: Pipeline operators for cleaner chaining.
Point 2: Pattern matching for concise logic.
Point 3: Enhanced async and await features.
Point 4: Developer productivity with modern syntax.
Point 5: Why keeping up with ECMAScript matters.
Conclusion: Future-proofing skills as JS evolves.
    `,
    author: authors[0],
    image: "https://images.unsplash.com/photo-1505238680356-667803448bb6", // JavaScript code
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Building Scalable Authentication with JWT",
    content: `
Excerpt:
Authentication is the backbone of user security. JWTs provide a lightweight, stateless solution for scalable authentication.

Content Outline:

Introduction: The challenge of managing sessions.
Point 1: How JWTs work and their structure.
Point 2: Benefits of stateless authentication.
Point 3: Securing JWTs with best practices.
Point 4: Role-based access control with JWTs.
Point 5: Common mistakes to avoid.
Conclusion: JWTs as a long-term standard for APIs.
    `,
    author: authors[1],
    image: "https://miro.medium.com/v2/resize:fit:1400/1*MwB2kKVn8V0eXqt-rIwhqA.png", // authentication / lock
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];



const seedPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Post.deleteMany();
    const inserted = await Post.insertMany(posts);
    console.log(`✅ Successfully inserted ${inserted.length} posts`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding posts:", err);
    process.exit(1);
  }
};

seedPosts();
