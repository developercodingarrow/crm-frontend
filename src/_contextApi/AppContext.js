"use client";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handelToggleAsidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        handelToggleAsidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
