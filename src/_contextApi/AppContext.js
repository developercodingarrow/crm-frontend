"use client";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isLeadUplodOpen, setisLeadUplodOpen] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [selectedLeadMobile, setSelectedLeadMobile] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const handelToggleAsidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const openLeadForm = () => setisLeadUplodOpen(true); // Add this
  const openMobileChat = (lead) => {
    setSelectedLeadMobile(lead);
    setIsMobileChatOpen(true);
  };

  const closeMobileChat = () => {
    setIsMobileChatOpen(false);
    setSelectedLeadMobile(null);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        handelToggleAsidebar,
        isLeadUplodOpen,
        setisLeadUplodOpen,
        showCreateForm,
        setShowCreateForm,
        openLeadForm,
        isMobileChatOpen,
        openMobileChat,
        closeMobileChat,
        selectedLeadMobile,
        setSelectedLeadMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
