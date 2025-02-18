import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api";

import "./styles.css";
import logoImage from "../../assets/images/buzz.svg.png";
<<<<<<< HEAD

function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
=======
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    birthday: null,
    password: "",
  });
>>>>>>> 9f78de84 (Fixing myreviews with custom movies)

  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
=======
  const handleDateChange = (date) => {
    setFormData({ ...formData, birthday: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
>>>>>>> 9f78de84 (Fixing myreviews with custom movies)

    try {
      const response = await registerUser(formData);
      if (response.success) {
        alert(response.message);
        navigate("/login");
      } else {
        setError(response.message || "Registration failed, try again");
      }
    } catch (error) {
      setError(
        "An error occurred during registration. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginBox">
      <h1> Sign Up </h1>
      <img src={logoImage} className="logo" alt="Buzz Logo" />

<<<<<<< HEAD
            <form className = "form" onSubmit = {handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
                <div> Already have an account? <Link to = "/login"> Sign In </Link> </div>
            </form>
        </div> 
    )
=======
      {error && (
        <p style={{ color: "red" }}>
          {error.includes("Email already exists")
            ? "Email already exists"
            : error.includes("Registration failed")
            ? "Registration failed. Please check if you've filled in all the fields correctly."
            : "Registration failed. Please try again"}
        </p>
      )}

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
        {/* <DatePicker
                    selected={formData.birthday}
                    onChange={handleDateChange}
                    name="birthday"
                    placeholderText="Select your birthday"
                    dateFormat="yyyy/MM/dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    showMonthDropdown
                    required
                /> */}
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        <div>
          {" "}
          Already have an account? <Link to="/login"> Sign In </Link>{" "}
        </div>
      </form>
    </div>
  );
>>>>>>> 9f78de84 (Fixing myreviews with custom movies)
}

export default SignUp;
