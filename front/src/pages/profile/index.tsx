import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../types";

export default function Profile() {
  const user = {
    name: "Hovsep Avagyan",
    username: "hovsep_01",
    bio: "Computer Science student • Full-Stack Developer • Passionate about AI & Cloud",
    location: "Glendale, CA",
    joined: "Jan 2025",
    followers: 318,
    followings: 127,
    posts: 42,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Hovsep",
  };

    const { account } = useOutletContext<IContext>();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl hover:shadow-blue-900/20 transition-shadow duration-300">
        {/* Cover */}
        <div className="relative h-40 w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-fuchsia-700">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,white,transparent_60%)]" />
        </div>

        {/* Avatar */}
        <div className="relative -mt-16 flex justify-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="h-28 w-28 rounded-2xl border-4 border-gray-900 shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-white">{account.firstName} {account.lastName}</h1>
          <p className="text-sm text-gray-400">@{account.username}</p>

          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            {user.bio}
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-gray-800/70 p-3">
              <p className="text-lg font-bold text-white">{user.posts}</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
            <div className="rounded-xl bg-gray-800/70 p-3">
              <p className="text-lg font-bold text-white">{user.followers}</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div className="rounded-xl bg-gray-800/70 p-3">
              <p className="text-lg font-bold text-white">{user.followings}</p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-6 flex justify-center gap-3 text-xs text-gray-400">
            <span>📍 {user.location}</span>
            <span>•</span>
            <span>Joined {user.joined}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
