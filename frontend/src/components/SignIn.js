import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../auth/UseAuth.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login with", { email, password });
    try {
      const result = await login(email, password);
      if (result) {
        navigate("/notes", {state: {email:email}});
      } else {
        alert("Email atau Password Salah !");
      }

    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh", backgroundColor: "#1a1a1a", color: "white" }}
    >
      <div className="box" style={{ width: "320px", backgroundColor: "#2c2c2c" }}>
        <h2 className="title has-text-white has-text-centered">Sign In</h2>
        <input
          className="input mb-3"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button is-primary is-fullwidth mb-3" onClick={handleLogin}>
          Login
        </button>
        <p className="has-text-centered">
            Belum Punya Akun?{" "}
          <Link to="/signup" className="has-text-link">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;