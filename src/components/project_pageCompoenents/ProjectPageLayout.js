"use client";
import React, { useContext, useState } from "react";
import styles from "./projectpagelayout.module.css";
import SearchProjectElement from "./searchprojects/SearchProjectElement";
import ProjectCard from "./project_card/ProjectCard";
import useFillters from "../../_custome_hooks/useFillters";
import FillterBar from "./Fillter_bar/FillterBar";
import UserModel from "./users_Model/UserModel";
import { CiFilter } from "react-icons/ci";
import { ProjectAssignmentContext } from "../../_contextApi/ProjectAssignmentContext";
export default function ProjectPageLayout(props) {
  const { apiData, usersData } = props;

  const {
    visibleRows,
    filterByPropertyType,
    propertyTypeFilter,
    filterByBuilder,
    builderFilter,
    filterByPrice,
    priceRange,
    searchByLocation,
    locationSearch,
    searchByPropertyName, // ✅ Get property name search function
    propertyNameSearch,

    getUniqueBuilders,
    getPriceLimits,
  } = useFillters(apiData);
  const { selectedProjects, getSelectedCount, clearAllProjects } = useContext(
    ProjectAssignmentContext,
  );
  return (
    <div className={styles.main_container}>
      <section className={styles.page_headerSection}>page header</section>
      <div className={styles.inner_container}>
        <div className={styles.fillter_wrapper}>
          <FillterBar
            filterByPropertyType={filterByPropertyType}
            propertyTypeFilter={propertyTypeFilter}
            filterByBuilder={filterByBuilder}
            builderFilter={builderFilter}
            filterByPrice={filterByPrice}
            priceRange={priceRange}
            searchByLocation={searchByLocation}
            locationSearch={locationSearch}
            getUniqueBuilders={getUniqueBuilders}
            getPriceLimits={getPriceLimits}
          />
        </div>
        <div className={styles.page_elements_wrapper}>
          <div className={styles.top_bar}>
            <div className={styles.searchBar_wrapper}>
              <SearchProjectElement onSearch={searchByPropertyName} />
            </div>
            <div className={styles.filtter_btn}>
              <CiFilter />
            </div>
          </div>
          {/* Show selected count */}
          {getSelectedCount() > 0 && (
            <div className={styles.selection_header}>
              <span>{getSelectedCount()} selected project(s)</span>
              <button onClick={clearAllProjects}>Clear</button>
            </div>
          )}
          <div className={styles.project_card_wrapper}>
            {visibleRows.map((item, index) => {
              return <ProjectCard key={index} item={item} />;
            })}
          </div>
        </div>
        <div className={styles.users_wrapper}>
          <UserModel users={usersData?.users} />
        </div>
      </div>
    </div>
  );
}
