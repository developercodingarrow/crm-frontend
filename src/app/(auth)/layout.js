import AuthNavbar from "../../components/authnavbar/AuthNavbar";
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

export default function AuthLayout({ children }) {
  return (
    <body className="font-sans antialiased">
      <AuthNavbar />
      <div>{children}</div>
    </body>
  );
}
