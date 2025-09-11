// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Profile() {
//   const { username } = useParams();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${username}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, [username]);

//   if (!profile) return <p className="text-white">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex items-center space-x-4">
//           <img src={profile.user.avatar} alt="avatar" className="w-20 h-20 rounded-full" />
//           <div>
//             <h2 className="text-2xl font-bold">{profile.user.name}</h2>
//             <p className="text-gray-400">@{profile.user.username}</p>
//             <p className="mt-2">{profile.user.bio}</p>
//           </div>
//         </div>

//         <h3 className="mt-8 text-xl font-semibold">Blogs</h3>
//         <div className="space-y-4 mt-4">
//           {profile.posts.map((p) => (
//             <div key={p._id} className="bg-gray-900 p-4 rounded-lg">
//               <h4 className="text-lg font-bold">{p.title}</h4>
//               <p className="text-gray-400">{p.content.substring(0, 150)}...</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(res.data.user);
        setBlogs(res.data.posts); // backend returns `posts`
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [username]);

  if (!user) return <p className="text-center text-gray-400">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* User Info */}
      <div className="max-w-3xl mx-auto text-center">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt={user.name}
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600 shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-400">@{user.username}</p>
        <p className="text-gray-300 mt-3 max-w-xl mx-auto">{user.bio || "This user has no bio yet."}</p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4">
          {user.socialLinks?.website && (
            <a href={user.socialLinks.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              🌐 Website
            </a>
          )}
          {user.socialLinks?.twitter && (
            <a href={user.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              🐦 Twitter
            </a>
          )}
          {user.socialLinks?.github && (
            <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              💻 GitHub
            </a>
          )}
          {user.socialLinks?.linkedin && (
            <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              🔗 LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* User Blogs */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-600 pl-3">
          Blogs by {user.name}
        </h2>
        {blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                image={post.image}
                title={post.title}
                summary={post.content.substring(0, 120) + "..."}
                postId={post._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No blogs published yet.</p>
        )}
      </div>
    </div>
  );
}
