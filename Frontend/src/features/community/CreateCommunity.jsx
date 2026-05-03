import React, { useState } from 'react';
import { createCommunity } from '../../api/community/api';

const CreateCommunity = ({ onCreated }) => {
  const [name,   setName]   = useState('');
  const [desc,   setDesc]   = useState('');
  const [tags,   setTags]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,  setError]  = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Name is required'); return; }
    setLoading(true);
    setError('');
    try {
      const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean);
      const community = await createCommunity({ name, description: desc, tags: tagArr });
      onCreated?.(community);
      setName(''); setDesc(''); setTags('');
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to create community');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl mb-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h2 className="text-[#00aaff] dark:text-blue-400 mb-4 text-xl font-bold">
        Create a Community
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Community name *"
        maxLength={80}
        className="w-full px-4 py-3 mb-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        rows={3}
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Short description…"
        maxLength={500}
        className="w-full px-4 py-3 mb-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        value={tags}
        onChange={e => setTags(e.target.value)}
        placeholder="Tags: AI, DevOps, React (comma separated)"
        className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2.5 bg-[#00aaff] hover:bg-[#008ecc] disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors"
      >
        {loading ? 'Creating…' : 'Create'}
      </button>
    </div>
  );
};

export default CreateCommunity;