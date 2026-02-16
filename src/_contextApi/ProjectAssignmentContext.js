// contexts/ProjectAssignmentContext.jsx
"use client";
import React, { createContext, useState, useContext } from "react";
import { assignMultipleProjectsToMultipleEmployees } from "../app/utils/assignActions";
export const ProjectAssignmentContext = createContext();

export const ProjectAssignmentProvider = ({ children }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [assignmentDate, setAssignmentDate] = useState(new Date());

  // Toggle project selection
  const toggleProjectSelection = (project) => {
    setSelectedProjects((prev) => {
      const isSelected = prev.some((p) => p._id === project._id);
      if (isSelected) {
        return prev.filter((p) => p._id !== project._id);
      } else {
        return [...prev, { ...project, selectedDate: new Date() }];
      }
    });
  };

  // Select/deselect all projects
  const selectAllProjects = (projects) => {
    setSelectedProjects(
      projects.map((p) => ({ ...p, selectedDate: new Date() })),
    );
  };

  const clearAllProjects = () => {
    setSelectedProjects([]);
  };

  // Check if project is selected
  const isProjectSelected = (projectId) => {
    return selectedProjects.some((p) => p._id === projectId);
  };

  // Get selected projects count
  const getSelectedCount = () => {
    return selectedProjects.length;
  };

  // Assign projects to user
  const assignToUser = (userId) => {
    setSelectedUserId(userId);
    // Here you would typically make an API call to save the assignment
    console.log("Assigning projects:", selectedProjects, "to user:", userId);
  };

  // Assign projects to user
  const assignProjects = async (selectedUser) => {
    if (selectedProjects.length === 0 || !selectedUser) {
      console.log("No projects or user selected");
      return;
    }

    // Extract only project IDs from selectedProjects array of objects
    const projectIDs = selectedProjects.map((project) => project._id);
    const employeeIDs = selectedUser.map((user) => user._id);

    try {
      const formData = {
        employeeIds: employeeIDs, // Convert single user to array
        projectIds: projectIDs,
      };

      console.log("formData--", formData);

      const result = await assignMultipleProjectsToMultipleEmployees(formData);

      console.log("Assignment result:", result);
    } catch (error) {
      setAssignmentResult({
        success: false,
        message: error.message || "Assignment failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedProjects([]);
    setSelectedUserId(null);
    setAssignmentDate(new Date());
  };

  const value = {
    selectedProjects,
    selectedUserId,
    assignmentDate,
    toggleProjectSelection,
    selectAllProjects,
    clearAllProjects,
    isProjectSelected,
    getSelectedCount,
    assignToUser,
    resetSelection,
    assignProjects,
  };

  return (
    <ProjectAssignmentContext.Provider value={value}>
      {children}
    </ProjectAssignmentContext.Provider>
  );
};
