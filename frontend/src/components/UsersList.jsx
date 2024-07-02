import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [deleteUserId, setDeleteUserId] = useState(null); // State to store user ID being deleted
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage after login
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, config);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${deleteUserId}`, config);
      setUsers(users.filter(user => user._id !== deleteUserId));
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error(error);
    }
  };
  const openModal = (id) => {
    setDeleteUserId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="container mt-5">
      <h2>Users List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <img src={`${process.env.REACT_APP_API_URL}/${user.profilePicture}`} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.contactInfo}</td>
              <td>
                <Link to={`/update/${user._id}`} className="btn btn-warning btn-sm">Update</Link>
                <button onClick={() => openModal(user._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{justifyContent:"space-between"}}>
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={deleteUser}>Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UsersList;
