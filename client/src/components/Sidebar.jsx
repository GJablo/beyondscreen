import { useState } from "react";
import { Menu } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, X } from "react-router-dom";

const SidebarLink = ({ to, label, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-muted transition-colors"
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span>{label}</span>
  </Link>
);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar with Toggle */}
      <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 lg:hidden">
        <Navbar />
        <h2 className="text-xl font-bold">BeyondScreen</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Visible on desktop, togglable on mobile) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-5 space-y-4 z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        <h2 className="text-2xl font-bold mb-4 hidden lg:block">BeyondScreen</h2>
        <nav className="space-y-2">
          <SidebarLink to="/dashboard/activities" label="Activities" />
          <SidebarLink to="/dashboard/goals" label="Goals" />
          <SidebarLink to="/dashboard/posts" label="Posts" />
          <SidebarLink to="/dashboard/profile" label="Update Profile" />
          <SidebarLink to="/dashboard" label="Home" />
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
