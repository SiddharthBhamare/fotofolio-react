import { ReactNode } from "react";
import Navbar from "./Navbar";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="font-sans bg-gray-50 ">
      {/* Navbar */}
      <Navbar />

      {/* Main content area (children will be passed here) */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Karnveer Photography. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
