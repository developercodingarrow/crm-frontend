"use client";
import React, { useState } from "react";
import styles from "./createprojectlayout.module.css";
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import CreateProjectForm from "./create_project_form/CreateProjectForm";
import {
  GoCheck,
  GoRocket,
  GoStar,
  GoHeart,
  GoGraph,
  GoPeople,
} from "react-icons/go";

import { createNewProject } from "../../app/utils/projectActions";

export default function CreateProjectLayout() {
  const [projects, setProjects] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreatedProject, setLastCreatedProject] = useState(null);

  const handleProjectCreated = async (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setLastCreatedProject(newProject);
    setShowSuccess(true);
    const formData = {
      ...newProject,
    };
    try {
      const res = await createNewProject(formData);
    } catch (error) {
      console.log("error--", error);
    }

    // Auto-hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.page_header}>
        <HeaderTopBar
          pageTitle="Create Projects"
          pageSubtitle="Manage system Projects and Details"
          btnText="Save Project"
        />
      </div>
      <div className={styles.inner_container}>
        {/* Left Column - Project Preview/Success */}
        <div className={styles.project_column}>
          {showSuccess && lastCreatedProject ? (
            // Success Animation & Preview
            <div className={styles.success_container}>
              <div className={styles.success_animation}>
                <div className={styles.checkmark_circle}>
                  <GoCheck className={styles.checkmark} />
                </div>
              </div>

              <h3 className={styles.success_title}>
                Project Created Successfully! 🎉
              </h3>

              {/* Project Preview Card */}
              <div className={styles.preview_card}>
                <div className={styles.preview_badge}>NEW</div>
                <div className={styles.preview_header}>
                  <h4>{lastCreatedProject.propertyName}</h4>
                  <span className={styles.property_type}>
                    {lastCreatedProject.propertyType}
                  </span>
                </div>

                <div className={styles.preview_details}>
                  <div className={styles.preview_row}>
                    <span>🏗️ Builder</span>
                    <strong>{lastCreatedProject.builder}</strong>
                  </div>
                  <div className={styles.preview_row}>
                    <span>📍 Location</span>
                    <strong>
                      {lastCreatedProject.city}, {lastCreatedProject.state}
                    </strong>
                  </div>
                  <div className={styles.preview_row}>
                    <span>💰 Price Range</span>
                    <strong>
                      ₹{(lastCreatedProject.minPrice / 10000000).toFixed(2)}Cr -
                      ₹{(lastCreatedProject.maxPrice / 10000000).toFixed(2)}Cr
                    </strong>
                  </div>
                </div>

                <div className={styles.preview_actions}>
                  <button className={styles.view_btn}>View Details</button>
                  <button className={styles.share_btn}>Share</button>
                </div>
              </div>
            </div>
          ) : (
            // Empty State - Attractive placeholder
            <div className={styles.empty_state}>
              <GoRocket className={styles.empty_icon} />
              <h3>Ready to Create a Project?</h3>
              <p>
                Fill in the project details on the right to see a preview here
              </p>

              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <GoStar className={styles.feature_icon} />
                  <span>Premium properties</span>
                </div>
                <div className={styles.feature_item}>
                  <GoHeart className={styles.feature_icon} />
                  <span>Trusted builders</span>
                </div>
                <div className={styles.feature_item}>
                  <GoCheck className={styles.feature_icon} />
                  <span>Verified listings</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Create Project */}
        <div className={styles.create_projectColumn}>
          <CreateProjectForm onProjectCreated={handleProjectCreated} />
        </div>
      </div>
    </div>
  );
}
