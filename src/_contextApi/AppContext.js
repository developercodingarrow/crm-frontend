"use client";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isLeadUplodOpen, setisLeadUplodOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedLeadMobile, setSelectedLeadMobile] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isCreateUserForm, setisCreateUserForm] = useState(false);

  const handelToggleAsidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const openLeadForm = () => setisLeadUplodOpen(true); // Add this
  const closeLeadForm = () => setisLeadUplodOpen(false); // Add this
  const opencreateUserForm = () => setisCreateUserForm(true); // Add this
  const closecreateUserForm = () => setisCreateUserForm(false); // Add this

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
        openLeadForm,
        closeLeadForm,
        showCreateForm,
        setShowCreateForm,

        isMobileChatOpen,
        openMobileChat,
        closeMobileChat,
        selectedLeadMobile,
        setSelectedLeadMobile,

        isCreateUserForm,
        setisCreateUserForm,
        opencreateUserForm,
        closecreateUserForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
