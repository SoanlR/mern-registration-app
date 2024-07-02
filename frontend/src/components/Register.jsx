import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!contactInfo.trim()) {
      newErrors.contactInfo = 'Contact Info is required';
    } else if (!/^\d{10}$/.test(contactInfo)) {
      newErrors.contactInfo = 'Invalid phone number (must be exactly 10 digits)';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!profilePicture) {
      newErrors.profilePicture = 'Profile Picture is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('contactInfo', contactInfo);
      formData.append('password', password);
      formData.append('profilePicture', profilePicture);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formData, config);
        localStorage.setItem('token', data.token);
        navigate('/users');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={submitHandler} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className={`form-control ${errors.username && 'is-invalid'}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="contactInfo" className="form-label">Contact Info</label>
          <input type="text" className={`form-control ${errors.contactInfo && 'is-invalid'}`} id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
          {errors.contactInfo && <div className="invalid-feedback">{errors.contactInfo}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input type="file" className={`form-control ${errors.profilePicture && 'is-invalid'}`} id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
          {errors.profilePicture && <div className="invalid-feedback">{errors.profilePicture}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
