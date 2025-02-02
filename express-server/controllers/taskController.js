import { Task } from "../database/Models/Task.js";

export const createTaskController = async (req, res) => {
  const { title, content } = req.body;
  const creator = req.user.id;
  try {
    const task = new Task({ title, content, creator });
    await task.save();
    res.status(201).json({ message: "Task created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating Task.", error });
  }
};

export const getTaskController = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await Task.find({
      $or: [{ creator: userId }],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Task!!", error });
  }
};

export const getTaskByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id).select("-password");
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task.", error });
  }
};

export const editTaskController = async (req, res) => {
  const { title, content } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task.", error });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task.", error });
  }
};
