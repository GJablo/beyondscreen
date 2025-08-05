
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const SidebarLink = ({ to, label, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-muted transition-colors"
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span>{label}</span>
  </Link>
);

export default function DashboardLayout() {

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-zinc-100 to-sky-100 dark:from-zinc-900 dark:to-sky-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
        <Navbar />

        <h2 className="text-2xl font-bold text-left mb-4">BeyondScreen</h2>

        <nav className="space-y-2">
          <SidebarLink to="/dashboard/activities" label="Activities" />
          <SidebarLink to="/dashboard/goals" label="Goals" />
          <SidebarLink to="/dashboard/posts" label="Posts" />
          <SidebarLink to="/dashboard/profile" label="Update Profile" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <Outlet />
      </main>
    </div>
  );
}
