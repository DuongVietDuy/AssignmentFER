import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const regexNumber = /^[0-9]*$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [formRegister, setFormRegister] = useState({
    number: "",
    username: "",
    email: "",
    password: "",
    role: "1",
  });
  const [successMsg, setSuccessMsg] = useState(""); // State cho thông báo thành công

  useEffect(() => {
    axios
      .get("http://localhost:9999/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!regexNumber.test(formRegister.number)) errors.number = "Number must be numeric.";
    if (!regexEmail.test(formRegister.email)) errors.email = "Invalid email format.";

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear error message when input changes
    });
  };

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert("Please enter the form fields correctly.");
      return;
    }

    const newId =
      users.length > 0
        ? Math.max(...users.map((user) => parseInt(user.id))) + 1
        : 1;

    axios.post("http://localhost:9999/users", {
        id: newId.toString(),
        ...formRegister,
      })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        setSuccessMsg("Sign Up thành công!"); // Cập nhật thông báo thành công
      })
      .catch((error) => console.error("Registration failed:", error));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg col-md-8 col-lg-6">
        {successMsg ? (
          <div className="text-center">
            <p className="text-success font-weight-bold">{successMsg}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/signin")}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="card-title text-center mb-4">Create your account</h1>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Phone Number</label>
              <input
                name="number"
                type="text"
                className="form-control"
                placeholder="008801234567891"
                value={formRegister.number}
                onChange={handleInputChange}
              />
              {errors.number && (
                <div className="text-danger">{errors.number}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="john_doe"
                value={formRegister.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email for Login</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="john@workemail.com"
                value={formRegister.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Create password"
                value={formRegister.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Create Account</button>
            <p className="text-center mt-3">
              Do have an Account?{" "}
              <Link to="/signin" className="text-decoration-none">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
