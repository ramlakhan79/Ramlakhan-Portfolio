import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-400 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {user.name}
              </h1>

              <p className="text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500 text-sm">
                Name
              </p>
              <p className="mt-1">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Username
              </p>
              <p className="mt-1">
                @{user.username}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>
              <p className="mt-1">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Role
              </p>

              <span className="inline-block mt-1 capitalize bg-gray-800 px-3 py-1 rounded-full text-sm">
                {user.role}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;