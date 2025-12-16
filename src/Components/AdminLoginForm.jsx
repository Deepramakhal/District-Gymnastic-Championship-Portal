/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiConfig";

function AdminLoginForm({ onSuccess }) {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/admin/login", {
        secret: secret,
      });

      // assuming backend sends { token: "JWT_TOKEN" }
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("admin_token_secret21122025", res.data.token);

        if (onSuccess) onSuccess(); // close modal if needed
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid secret code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-center">
        Admin Login
      </h2>

      <input
        type="password"
        placeholder="Enter Admin Secret Code"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-md
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
        required
      />

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-indigo-600
          text-white
          py-2
          rounded-md
          hover:bg-indigo-700
          disabled:opacity-60
        "
      >
        {loading ? "Verifying..." : "Submit"}
      </button>
    </form>
  );
}

export default AdminLoginForm;
