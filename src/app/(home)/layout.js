import AppContextProvider from "../../_contextApi/AppContext";
import FillterContextProvider from "../../_contextApi/FillterContextProvider";
import { ProjectAssignmentProvider } from "../../_contextApi/ProjectAssignmentContext";
import MainLayoutWrapper from "../../components/main_layout_wrapper/MainLayoutWrapper";
import "../globals.css";
import { Inter } from "next/font/google";

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during webfont load
  variable: "--font-inter", // CSS variable name
});

export const metadata = {
  title: "Property CRM | login ",
  description: "login page",
};

export default function HomeLayout({ children }) {
  return (
    <div className="font-sans antialiased">
      <AppContextProvider>
        <FillterContextProvider>
          <ProjectAssignmentProvider>
            <MainLayoutWrapper>{children}</MainLayoutWrapper>
          </ProjectAssignmentProvider>
        </FillterContextProvider>
      </AppContextProvider>
    </div>
  );
}
