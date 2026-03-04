"use client";

import React, { useState } from "react";
import styles from "./homedashbord.module.css";
import {
  GoGraph,
  GoPeople,
  GoProject,
  GoCheckCircle,
  GoClock,
  GoCalendar,
  GoStar,
  GoEye,
  GoArrowUp,
  GoArrowDown,
} from "react-icons/go";
import { MdOutlineLeaderboard, MdOutlineTrendingUp } from "react-icons/md";

export default function HomeDashbord() {
  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h1>Welcome back, Admin! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e6f0ff", color: "#3b82f6" }}
          >
            <GoProject />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>24</span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +12%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e0f7e9", color: "#10b981" }}
          >
            <GoPeople />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>156</span>
            <span className={styles.statLabel}>Total Leads</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +8%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#fff3e0", color: "#f59e0b" }}
          >
            <GoCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>42</span>
            <span className={styles.statLabel}>Converted</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowDown /> -3%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#fee9e9", color: "#ef4444" }}
          >
            <GoClock />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>18</span>
            <span className={styles.statLabel}>Follow-ups</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +5%
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsRow}>
        {/* Lead Status Distribution */}
        <div className={styles.chartCard}>
          <h3>Lead Status</h3>
          <div className={styles.statusList}>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>
                <span
                  className={styles.dot}
                  style={{ background: "#3b82f6" }}
                ></span>
                New
              </span>
              <span className={styles.statusValue}>45</span>
              <span className={styles.statusBar}>
                <div style={{ width: "45%", background: "#3b82f6" }}></div>
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>
                <span
                  className={styles.dot}
                  style={{ background: "#f59e0b" }}
                ></span>
                Follow-up
              </span>
              <span className={styles.statusValue}>32</span>
              <span className={styles.statusBar}>
                <div style={{ width: "32%", background: "#f59e0b" }}></div>
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>
                <span
                  className={styles.dot}
                  style={{ background: "#10b981" }}
                ></span>
                Interested
              </span>
              <span className={styles.statusValue}>28</span>
              <span className={styles.statusBar}>
                <div style={{ width: "28%", background: "#10b981" }}></div>
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>
                <span
                  className={styles.dot}
                  style={{ background: "#8b5cf6" }}
                ></span>
                Converted
              </span>
              <span className={styles.statusValue}>42</span>
              <span className={styles.statusBar}>
                <div style={{ width: "42%", background: "#8b5cf6" }}></div>
              </span>
            </div>
          </div>
        </div>

        {/* Lead Source Distribution */}
        <div className={styles.chartCard}>
          <h3>Lead Sources</h3>
          <div className={styles.sourceList}>
            <div className={styles.sourceItem}>
              <span>Website</span>
              <span className={styles.sourcePercentage}>45%</span>
              <span className={styles.sourceBar}>
                <div style={{ width: "45%", background: "#3b82f6" }}></div>
              </span>
            </div>
            <div className={styles.sourceItem}>
              <span>Referral</span>
              <span className={styles.sourcePercentage}>25%</span>
              <span className={styles.sourceBar}>
                <div style={{ width: "25%", background: "#10b981" }}></div>
              </span>
            </div>
            <div className={styles.sourceItem}>
              <span>Walk-in</span>
              <span className={styles.sourcePercentage}>15%</span>
              <span className={styles.sourceBar}>
                <div style={{ width: "15%", background: "#f59e0b" }}></div>
              </span>
            </div>
            <div className={styles.sourceItem}>
              <span>Social Media</span>
              <span className={styles.sourcePercentage}>10%</span>
              <span className={styles.sourceBar}>
                <div style={{ width: "10%", background: "#8b5cf6" }}></div>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Performers */}
      <div className={styles.bottomRow}>
        {/* Recent Activity */}
        <div className={styles.activityCard}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <GoPeople />
              </div>
              <div className={styles.activityContent}>
                <p>
                  New lead assigned to <strong>Rahul Sharma</strong>
                </p>
                <span className={styles.activityTime}>5 min ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <GoCheckCircle />
              </div>
              <div className={styles.activityContent}>
                <p>
                  Lead <strong>Priya Patel</strong> converted
                </p>
                <span className={styles.activityTime}>1 hour ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <GoClock />
              </div>
              <div className={styles.activityContent}>
                <p>
                  Follow-up scheduled with <strong>Amit Kumar</strong>
                </p>
                <span className={styles.activityTime}>2 hours ago</span>
              </div>
            </div>
          </div>
          <a href="#" className={styles.viewAllLink}>
            View all activity →
          </a>
        </div>

        {/* Top Performing Employees */}
        <div className={styles.performersCard}>
          <h3>Top Performers</h3>
          <div className={styles.performerList}>
            <div className={styles.performerItem}>
              <div className={styles.performerRank}>1</div>
              <div className={styles.performerInfo}>
                <span className={styles.performerName}>Neha Gupta</span>
                <span className={styles.performerStats}>42 conversions</span>
              </div>
              <span className={styles.performerBadge}>+28%</span>
            </div>
            <div className={styles.performerItem}>
              <div className={styles.performerRank}>2</div>
              <div className={styles.performerInfo}>
                <span className={styles.performerName}>Sonia Reddy</span>
                <span className={styles.performerStats}>38 conversions</span>
              </div>
              <span className={styles.performerBadge}>+15%</span>
            </div>
            <div className={styles.performerItem}>
              <div className={styles.performerRank}>3</div>
              <div className={styles.performerInfo}>
                <span className={styles.performerName}>John Doe</span>
                <span className={styles.performerStats}>31 conversions</span>
              </div>
              <span className={styles.performerBadge}>+10%</span>
            </div>
          </div>
          <a href="#" className={styles.viewAllLink}>
            View all employees →
          </a>
        </div>
      </div>
    </div>
  );
}
