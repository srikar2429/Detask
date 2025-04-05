import Task from "../models/Task.js";
import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status, projectId } = req.body;

  const project = await Project.findById(projectId);
  if (!project || !project.members.includes(req.user._id)) {
    throw createHttpError(403, "You are not a member of this project");
  }

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    status,
    userId: req.user._id,
    projectId,
  });

  const created = await task.save();
  res.status(201).json(created);
});

// @desc    Get all tasks for a project
// @route   GET /api/tasks/project/:projectId
// @access  Private
const getTasksByProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project || !project.members.includes(req.user._id)) {
    throw createHttpError(403, "Access denied");
  }

  const tasks = await Task.find({ projectId: req.params.projectId });
  res.status(200).json(tasks);
});

// @desc    Get all tasks assigned to the user
// @route   GET /api/tasks/my
// @access  Private
const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.status(200).json(tasks);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw createHttpError(404, "Task not found");

  if (
    task.userId.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw createHttpError(403, "You can't update this task");
  }

  const { title, description, dueDate, priority, status } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.priority = priority || task.priority;
  task.status = status || task.status;

  const updated = await task.save();
  res.status(200).json(updated);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw createHttpError(404, "Task not found");

  if (
    task.userId.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw createHttpError(403, "You can't delete this task");
  }

  await task.deleteOne();
  res.status(200).json({ message: "Task deleted" });
});

export {
  createTask,
  getTasksByProject,
  getMyTasks,
  updateTask,
  deleteTask,
};