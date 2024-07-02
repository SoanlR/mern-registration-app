import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import UsersList from './components/UsersList';
import UpdateUser from './components/UpdateUser';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} exact />
          <Route path="/users" element={<UsersList />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
