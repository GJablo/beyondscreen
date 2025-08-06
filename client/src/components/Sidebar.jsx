import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>

      {/* Topbar for small screens */}
      <header className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">BeyondScreen</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-zinc-800 dark:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed z-30 md:static top-0 left-0 h-full w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-5 space-y-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <Navbar />
        <h2 className="text-2xl font-bold text-left mb-4">BeyondScreen</h2>
        <nav className="space-y-2">
          <SidebarLink to="/dashboard/activities" label="Activities" />
          <SidebarLink to="/dashboard/goals" label="Goals" />
          <SidebarLink to="/dashboard/posts" label="Posts" />
          <SidebarLink to="/dashboard/profile" label="Update Profile" />
          <SidebarLink to="/dashboard" label="Home" />
        </nav>
      </aside>

    </>
  );
}
