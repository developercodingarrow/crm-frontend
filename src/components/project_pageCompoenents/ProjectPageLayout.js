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
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import FillterModel from "../models/FillterModel";
import { FillterContext } from "../../_contextApi/FillterContextProvider";
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

  const { handelopenFillter } = useContext(FillterContext);
  const { selectedProjects, getSelectedCount, clearAllProjects } = useContext(
    ProjectAssignmentContext,
  );
  return (
    <div className={styles.main_container}>
      <FillterModel
        locationSearch={locationSearch}
        searchByLocation={searchByLocation}
        filterByPropertyType={filterByPropertyType}
        propertyTypeFilter={propertyTypeFilter}
        filterByPrice={filterByPrice}
        filterByBuilder={filterByBuilder}
        builderFilter={builderFilter}
        getUniqueBuilders={getUniqueBuilders}
        getPriceLimits={getPriceLimits}
      />
      <section className={styles.page_header}>
        <HeaderTopBar
          pageTitle="Project Management"
          pageSubtitle=" Manage and track your Project efficiently"
        />
      </section>
      <div className={styles.inner_container}>
        <div className={styles.sidefillter_wrapper}>
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
        <div className={styles.project_wrapper}>
          <div className={styles.search_wrapper}>
            <div className={styles.searbar_wrapper}>
              <SearchProjectElement onSearch={searchByPropertyName} />
            </div>
            <div className={styles.filtter_btn} onClick={handelopenFillter}>
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
        {/* <div className={styles.users_wrapper}>
          <UserModel users={usersData?.users} />
        </div> */}
      </div>
    </div>
  );
}
