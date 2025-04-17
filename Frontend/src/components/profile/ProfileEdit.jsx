import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function EditUserProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: state.user.email,
    address: state.user.address || '',
    age: state.user.age || '',
    branch: state.user.branch || '',
    college: state.user.college || '',
  });
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('file', file);

    try {
      await axios.post('/api/addUserDetails', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      {['address', 'age', 'branch', 'college'].map(field => (
        <div key={field} className="mb-4">
          <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input
            type={field === 'age' ? 'number' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block font-semibold">Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Save</button>
    </form>
  );
}
