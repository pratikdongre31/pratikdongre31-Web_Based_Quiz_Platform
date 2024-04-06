import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userAlreadyExist = (msg) => {
  return msg === "User Already Registered";
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reenterPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationMessage, setRegistrationMessage] = useState(null); 
  const navigate = useNavigate();
  useEffect(()=>{
    // Check if passwords match when either password or reenterPassword changes
    if ((formData.reenterPassword !=='' && formData.password !== '')) {
      const updatedisPswCheck = formData.password === formData.reenterPassword;
      console.log('first',updatedisPswCheck)
      setPasswordsMatch(updatedisPswCheck);
    }
  },[formData])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.reenterPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      setRegistrationMessage(response.data.message);

        if(!userAlreadyExist(response.data.message)){
          navigate('/login')
        }
      setFormData({
        name: "",
        email: "",
        password: "",
        reenterPassword: "",
      });
      setPasswordsMatch(true);

    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className="div" id="main-content">
      <h2 className="heading">Registration Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="div">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="username"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="div">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="div">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&?])[A-Za-z\d#$@!%&?]{8,15}$"
            title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="div">
          <input
            type="password"
            id="reenterPassword"
            name="reenterPassword"
            placeholder="Re-enter Password"
            value={formData.reenterPassword}
            onChange={handleChange}
            required
          />
          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords do not match. Please re-enter.</p>
          )}
        </div>
        {registrationMessage && (
          <p style={{ color: userAlreadyExist(registrationMessage) ? "red" : "green" }}>
            {registrationMessage}
          </p>
        )}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;