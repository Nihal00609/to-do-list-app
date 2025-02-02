import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './components/Login';
import Register from "./components/Register";
import EditTask from './components/EditTasks';
import Tasks from "./components/Tasks";

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Tasks />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
