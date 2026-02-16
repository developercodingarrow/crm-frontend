// Updated component
import React from "react";
import styles from "./projectdetailsbox.module.css";
import { FaMapMarkerAlt, FaBuilding, FaRupeeSign } from "react-icons/fa";

export default function ProjectDetailsBox({ projectData }) {
  // Example data structure
  const data = projectData || {
    propertyName: "Royal Gardens",
    propertyType: "luxury",
    builder: "Godrej Properties",
    minPrice: 7500000,
    maxPrice: 15000000,
    address: "Sector 62, Golf Course Extension Road",
    city: "Gurgaon",
    state: "Haryana",
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?"
    );
  };

  const details = [
    {
      label: "Property Name",
      value: data.propertyName,
      icon: "🏢",
    },
    {
      label: "Property Type",
      value: data.propertyType,
      className: `property_type ${data.propertyType}`,
      format: (val) => val.charAt(0).toUpperCase() + val.slice(1),
    },
    {
      label: "Builder",
      value: data.builder,
      icon: true,
      format: (val) => (
        <div className={styles.field_value_builder}>
          <span className={styles.builder_avatar}>{getInitials(val)}</span>
          <span>{val}</span>
        </div>
      ),
    },
    {
      label: "Price Range",
      value: data,
      format: (val) => (
        <div className={styles.price_range}>
          <span className={styles.price}>{formatPrice(val.minPrice)}</span>
          <span className={styles.separator}>-</span>
          <span className={styles.price}>{formatPrice(val.maxPrice)}</span>
        </div>
      ),
    },
    {
      label: "Location",
      value: data,
      className: "full_width",
      format: (val) => (
        <div className={styles.location_value}>
          <FaMapMarkerAlt className={styles.location_icon} />
          <span>{val.address}</span>
          <span className={styles.city_state}>
            | {val.city}, {val.state}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.box_header}>Project Details</div>
      <div className={styles.details_grid}>
        {details.map((detail, index) => (
          <div
            key={index}
            className={`${styles.detail_item} ${detail.className ? styles[detail.className] : ""}`}
            style={{ "--item-index": index }}
          >
            <div className={styles.field_label}>
              {detail.icon && typeof detail.icon === "string"
                ? detail.icon
                : null}
              {detail.label}
            </div>
            <div
              className={`${styles.field_value} ${detail.className ? styles[detail.className] : ""}`}
            >
              {detail.format ? detail.format(detail.value) : detail.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
