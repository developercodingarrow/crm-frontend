"use client";
import React from "react";
import styles from "./loginform.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../../../config";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("API Response:", result);
      if (result.status === "success") {
        document.cookie = `jwt=${result.token}; path=/; max-age=86400;`; // 1 day
        document.cookie = `user=${JSON.stringify(
          result.data._id,
        )}; path=/; max-age=86400;`;

        router.push("/"); // Redirect to dashboard
        router.refresh(); // Refresh server components if needed
      }
    } catch (error) {
      console.error("login error:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formHeading}>Login To CRM</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Email Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            placeholder="Enter your email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          />
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
