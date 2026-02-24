"use client";
import React from "react";
import styles from "./createprojectform.module.css";

export default function CreateProjectForm({ onProjectCreated }) {
  const [formData, setFormData] = React.useState({
    propertyName: "",
    propertyType: "",
    city: "",
    state: "",
    address: "",
    minPrice: "",
    maxPrice: "",
    builder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (onProjectCreated) {
      onProjectCreated(formData);
    }
    // Add your submit logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.project_form}>
        <h2 className={styles.form_title}>Project Details</h2>

        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="propertyName">
            Property Name *
          </label>
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Enter property name"
            className={styles.form_input}
            required
          />
        </div>

        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="propertyType">
              Property Type *
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={styles.form_select}
              required
            >
              <option value="">Select type</option>
              <option value="affordable">Affordable</option>
              <option value="luxury">Luxury</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="builder">
              Builder *
            </label>
            <input
              type="text"
              id="builder"
              name="builder"
              value={formData.builder}
              onChange={handleChange}
              placeholder="Enter builder name"
              className={styles.form_input}
              required
            />
          </div>
        </div>

        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="city">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={styles.form_input}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="state">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className={styles.form_input}
              required
            />
          </div>
        </div>

        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="address">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete address"
            rows="3"
            className={styles.form_textarea}
            required
          />
        </div>

        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="minPrice">
              Min Price (₹) *
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              placeholder="Min price"
              min="0"
              className={styles.form_input}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label} htmlFor="maxPrice">
              Max Price (₹) *
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              placeholder="Max price"
              min="0"
              className={styles.form_input}
              required
            />
          </div>
        </div>

        <div className={styles.form_actions}>
          <button type="button" className={styles.cancel_btn}>
            Cancel
          </button>
          <button type="submit" className={styles.submit_btn}>
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
