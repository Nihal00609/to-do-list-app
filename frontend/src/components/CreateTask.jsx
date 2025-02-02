import axios from 'axios';
import React, { useState } from 'react';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateTask = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to login first.');
          return;
        }
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(res.data.message || 'Task added.');
        setContent('');
        setTitle('');
        window.location.reload()
      } catch (error) {
        alert(error.response?.data?.message || 'Error adding task.');
      }
  };

  return (
    <div className="bg-white flex flex-col p-4 mt-4 shadow-md rounded space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-auto p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-auto p-2 border rounded"
      />
      <button onClick={handleCreateTask} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Create Task</button>
    </div>
  );
}

export default CreateTask;
