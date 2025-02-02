import React, { act, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CreateTask from "./CreateTask";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  let userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login to view tasks.");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(res.data);
        console.log(res.data);
      } catch (error) {
        alert(error.response?.data?.task || "Error fetching task.");
      }
    };

    fetchTask();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted.");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting Task.");
    }
  };

  const handleOnDrop = ( position) => {
    console.log(`${activeTask}  Position: ${position}`);
    if(activeTask == null || activeTask == undefined) return;

    const taskToMove = tasks[activeTask];
   const updatedTask =  tasks.filter((task,index) => index!== activeTask);
   updatedTask.splice(position, 0, taskToMove);
   setTasks(updatedTask)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {localStorage.getItem("token") ? (
          <div className="flex justify-end pt-5">
            <span className="text-gray-700 font-medium py-1 px-3">
              Welcome {userDetails.name}
            </span>
            <button
              className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-end pt-5">
            <Link
              to="/login"
              className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
            >
              Register
            </Link>
          </div>
        )}
        <h2 className="text-2xl font-bold my-5 text-center">To Do List</h2>
        <div className="grid grid-cols-3 gap-4">
          {tasks?.map((task,index) => (
            <>
              <div
                key={task._id}
                className="bg-white p-4 mb-4 shadow-md rounded cursor-grab"
                draggable
                onDragStart={() => setActiveTask(task._id)}
                onDragEnd={() => setActiveTask(null)}
                onDrop={() => handleOnDrop(index+1)}
              >
                <strong>{task.title}</strong>
                <p>{task.content}</p>
                <div className="flex flex-wrap gap-2 justify-between mt-2">
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex w-auto justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
        <h3 className="text-lg font-bold mt-6">Add a New Task</h3>
        <CreateTask />
      </div>
    </>
  );
};

export default Tasks;
