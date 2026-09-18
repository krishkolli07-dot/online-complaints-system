import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      login(
        response.data.user,
        response.data.token
      );

      if (
        response.data.user.role ===
        "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
          "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to manage your complaints.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="primary-button full-button"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create account
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;