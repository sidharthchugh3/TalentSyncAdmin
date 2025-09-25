import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { logout } from "../../store/slices/authSlice"; // ✅ import logout

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const handleLogout = () => {
    // ✅ clear redux state
    dispatch(logout());
    // ✅ remove token from localStorage
    localStorage.removeItem("accessToken");
    // ✅ redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
            {profile.name?.charAt(0) || "U"}
          </div>
          <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
          <p className="text-gray-500">{profile.role || "Admin"}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="flex items-center border-b pb-3">
            <User className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center border-b pb-3">
            <Mail className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center border-b pb-3">
            <Shield className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{profile.roles || "Admin"}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium">
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {/* <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Edit Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
