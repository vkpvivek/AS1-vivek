

import { useEffect } from 'react';
import { connectSocket, sendBinaryEvent } from '../utils/socket';

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
      setTimeout(() => {
        sendBinaryEvent('binary:event', { message: 'Hello server 🔐' });
      }, 3000);
    }
  }, []);

  return (
    <div className="container mt-5 text-center">
      <p>Dashboard</p>
      <h2>Socket Connected.</h2>
    </div>
  );
};


export default Dashboard;
