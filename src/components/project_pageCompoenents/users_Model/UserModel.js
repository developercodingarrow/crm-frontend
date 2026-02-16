"use client";
import React, { useState, useContext } from "react";
import styles from "./usersmodel.module.css";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { ProjectAssignmentContext } from "../../../_contextApi/ProjectAssignmentContext";

export default function UserModel(props) {
  const { users = [] } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { assignToUser, assignProjects } = useContext(ProjectAssignmentContext);

  // Mock users data - replace with actual data later
  // const users = [
  //   { id: 1, name: "Aarav Sharma", email: "aarav@example.com" },
  //   { id: 2, name: "Vivaan Singh", email: "vivaan@example.com" },
  //   { id: 3, name: "Aditya Patel", email: "aditya@example.com" },
  //   { id: 4, name: "Vihaan Gupta", email: "vihaan@example.com" },
  //   { id: 5, name: "Arjun Kumar", email: "arjun@example.com" },
  //   { id: 6, name: "Sai Reddy", email: "sai@example.com" },
  //   { id: 7, name: "Ananya Joshi", email: "ananya@example.com" },
  //   { id: 8, name: "Diya Malhotra", email: "diya@example.com" },
  //   { id: 9, name: "Ishaan Mehta", email: "ishaan@example.com" },
  //   { id: 10, name: "Kabir Choudhary", email: "kabir@example.com" },
  // ];

  // Filter users based on search
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Toggle user selection
  const toggleUser = (user) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle assign button click
  const handleAssign = () => {
    console.log("Assigning to users:", selectedUsers);
    assignProjects(selectedUsers);
    // Add your assign logic here
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Assign to Users</h3>
        <button className={styles.close_btn}>
          <FaTimes />
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.search_wrapper}>
        <FaSearch className={styles.search_icon} />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search_input}
        />
      </div>

      {/* Selected Users Preview */}
      {selectedUsers.length > 0 && (
        <div className={styles.selected_preview}>
          <span className={styles.selected_label}>Selected:</span>
          <div className={styles.selected_avatars}>
            {selectedUsers.map((user, index) => (
              <div key={user.id} className={styles.selected_avatar}>
                {getInitials(user.name)}
                <button
                  className={styles.remove_btn}
                  onClick={() => toggleUser(user)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users List */}
      <div className={styles.users_list}>
        {filteredUsers.map((user) => (
          <label key={user.id} className={styles.user_item}>
            <input
              type="checkbox"
              checked={selectedUsers.some((u) => u._id === user._id)}
              onChange={() => toggleUser(user)}
              className={styles.checkbox}
            />
            <div className={styles.avatar}>{getInitials(user.name)}</div>
            <div className={styles.user_info}>
              <div className={styles.user_name}>{user.name}</div>
              <div className={styles.user_email}>{user.email}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Bottom Assign Button */}
      {selectedUsers.length > 0 && (
        <div className={styles.bottom_btn_container}>
          <button className={styles.assign_btn} onClick={handleAssign}>
            Assign to {selectedUsers.length} User
            {selectedUsers.length > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
