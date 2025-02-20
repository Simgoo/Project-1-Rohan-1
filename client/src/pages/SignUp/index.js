import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api";

import "./styles.css";
import logoImage from "../../assets/images/buzz.svg.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    birthday: null,
    password: "",
  });

  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthday: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        birthday: formData.birthday,
      };

      await registerUser(payload);
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      navigate("/login");
      setIsLoading(false);
    }
  };

  return (
    <div className="loginBox">
      <h1> Sign Up </h1>
      <img src={logoImage} className="logo" alt="Buzz Logo" />

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="birthday"
          name="birthday"
          placeholder="month you were born"
          onChange={handleSubmit}
          required
        />
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        <div>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
