import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
      console.log("Registration Response:", response.data);
      navigate("/signin");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh", backgroundColor: "#1a1a1a", color: "white" }}
    >
      <div className="box" style={{ width: "384px", backgroundColor: "#2c2c2c" }}>
        <h2 className="title has-text-white has-text-centered">Sign Up</h2>
        <input
          className="input mb-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input mb-3"
          type="email"
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
        <button className="button is-success is-fullwidth mb-3" onClick={handleSignUp}>
          Register
        </button>
        <p className="has-text-centered">
          Sudah Punya Akun?{" "}
          <Link to="/signin" className="has-text-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;