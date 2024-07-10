import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9999/users')
      .then((res) => {
        console.log('Users fetched from API:', res.data); // Log the fetched users
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log('Entered email:', email); // Log entered email
    console.log('Entered password:', password); // Log entered password

    const user = users.find(user => user.email === email && user.password === password);
    console.log('Found user:', user); // Log found user

    if (user) {
      // Store user information in sessionStorage or localStorage
      sessionStorage.setItem('userId', user.id);
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('role', user.role);

      // Redirect based on user role
      const role = parseInt(user.role, 10);
      if (role === 1) {
        navigate('/');
      } else if (role === 2) {
        navigate('/admin');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg col-md-8 col-lg-6">
        <h1 className="card-title text-center mb-4">Sign in</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email for Login</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="john@workemail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-dark w-100">Sign In</button>
        </form>
        <p className="text-center mt-3">
          Don't have an Account?{' '}
          <Link to="/signup" className="text-decoration-none">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

