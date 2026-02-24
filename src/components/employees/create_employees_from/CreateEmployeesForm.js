"use client";
import React, { useState } from "react";
import styles from "./createemployessform.module.css";
import { useForm } from "react-hook-form";
import { createNewTeam } from "../../../app/utils/employeeActions";

export default function CreateEmployeesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedRole, setSelectedRole] = useState("employee");

  const roles = [
    { id: "employee", label: "Employee", icon: "👤" },
    { id: "admin", label: "Admin", icon: "👑" },
    // { id: "manager", label: "Manager", icon: "📊" },
    // { id: "viewer", label: "Viewer", icon: "👁️" },
  ];

  const onSubmit = async (data) => {
    console.log("Form Data:", { ...data, role: selectedRole });
    const formData = {
      ...data,
      role: selectedRole,
    };
    try {
      const res = await createNewTeam(formData);
      console.log("create new team----", res);
    } catch (error) {}
    // Add your API call here
    reset();
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Add New Employee</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Name Field */}
        <div className={styles.formGroup}>
          <input
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            placeholder="Full name *"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <input
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="Email address *"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className={styles.formGroup}>
          <input
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            placeholder="Password *"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Role Selection - Tab Buttons */}
        <div className={styles.formGroup}>
          <div className={styles.roleTabs}>
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`${styles.roleTab} ${selectedRole === role.id ? styles.roleTabActive : ""}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <span className={styles.roleIcon}>{role.icon}</span>
                <span className={styles.roleLabel}>{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn}>
          Create Employee
        </button>
      </form>
    </div>
  );
}
