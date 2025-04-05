import Project from "../models/Project.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const project = new Project({
    title,
    description,
    owner: req.user._id,
    members: [req.user._id],
  });

  const createdProject = await project.save();
  req.user.projects.push(createdProject._id);
  await req.user.save();

  res.status(201).json(createdProject);
});

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ members: req.user._id });
  res.status(200).json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "username email")
    .populate("members", "username email");

  if (!project || !project.members.includes(req.user._id)) {
    throw createHttpError(403, "You are not authorized to access this project");
  }

  res.status(200).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    throw createHttpError(403, "Only the owner can update this project");
  }

  project.title = title || project.title;
  project.description = description || project.description;

  const updated = await project.save();
  res.status(200).json(updated);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    throw createHttpError(403, "Only the owner can delete this project");
  }

  await project.deleteOne();
  res.status(200).json({ message: "Project deleted" });
});

// @desc    Add members to project
// @route   POST /api/projects/:id/members
// @access  Private
const addProjectMembers = asyncHandler(async (req, res) => {
  const { memberIds } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    throw createHttpError(403, "Only the owner can add members");
  }

  memberIds.forEach((id) => {
    if (!project.members.includes(id)) project.members.push(id);
  });

  await project.save();
  res.status(200).json({ message: "Members added", project });
});

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:memberId
// @access  Private
const removeProjectMember = asyncHandler(async (req, res) => {
  const { id: projectId, memberId } = req.params;

  const project = await Project.findById(projectId);
  if (!project || project.owner.toString() !== req.user._id.toString()) {
    throw createHttpError(403, "Only the owner can remove members");
  }

  if (project.owner.toString() === memberId) {
    throw createHttpError(400, "Cannot remove the project owner");
  }

  project.members = project.members.filter(
    (m) => m.toString() !== memberId
  );
  await project.save();

  await Task.updateMany(
    { projectId, userId: memberId },
    { $unset: { userId: "" }, status: "unassigned" }
  );

  res.status(200).json({ message: "Member removed and tasks unassigned" });
});

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMembers,
  removeProjectMember
};