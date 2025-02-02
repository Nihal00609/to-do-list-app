import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTask(res.data);
    };
    fetchTask();
  }, [id]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        { title: task.title, content: task.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Task updated successfully.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating task.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Edit Task
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4 rounded-md p-4 shadow-lg">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Update title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Content"
            value={task.content}
            onChange={(e) => setTask({ ...task, content: e.target.value })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <button
          onClick={handleEdit}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTask;
