import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const email = ""; // Replace with actual logged-in user's email

  useEffect(() => {
    axios.post('/api/getUser', { email }).then(res => {
      setUser(res.data);
    }).catch(console.error);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border shadow rounded-lg">
      <img src={user.profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
      <div className="text-center">
        <h2 className="text-xl font-bold">{user.email}</h2>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
        <p><strong>College:</strong> {user.college}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/edit-profile', { state: { user } })}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
