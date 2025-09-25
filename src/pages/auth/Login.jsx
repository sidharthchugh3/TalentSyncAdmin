import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      if (res?.user) {
        toast.success("Login successful!", { autoClose: 3000 }); // ✅ Toast on success
        navigate('/');
      }
    } catch (error) {
      console.log(error, "loginerrr");
      toast.error(error?.message || "Invalid username or password", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          TalentSync Admin
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Login to manage your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} TalentSync. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
