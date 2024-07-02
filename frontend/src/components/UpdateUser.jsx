import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        console.log(id);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile/${id}`, config);
        setName(data.name);
        setEmail(data.email);
        setUsername(data.username);
        setContactInfo(data.contactInfo);
      } catch (error) {
        setError(error.response.data.message || 'Error fetching user data');
      }
    };

    fetchUser();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('contactInfo', contactInfo);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile/${id}`, formData, config);
      console.log(data);
      navigate('/users');
    } catch (error) {
      setError(error.response.data.message || 'Error updating user data');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contactInfo" className="form-label">Contact Info</label>
          <input type="text" className="form-control" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input type="file" className="form-control" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
