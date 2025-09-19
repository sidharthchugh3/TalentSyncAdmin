import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { setToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });

    // ✅ Correct token path
    setToken(res.data.data.accessToken);

    console.log("Stored token:", localStorage.getItem("token")); // should print your JWT

    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
