import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import Sidebar from '../../components/admin/Sidebar';
import AdminTopBar from '../../components/admin/AdminTopBar';
import UsersTable from '../../components/admin/UsersTable';

function UserManagement() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [is480, setIs480] = useState(window.innerWidth <= 480);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    const handleResize = () => setIs480(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    fetchUsers();
    return () => window.removeEventListener('resize', handleResize);
  }, [token, user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        location={location}
        is480={is480}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <AdminTopBar handleSidebarToggle={handleSidebarToggle} is480={is480} />

        {/* User Management Content */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          <UsersTable users={users} fetchUsers={fetchUsers} token={token} />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;