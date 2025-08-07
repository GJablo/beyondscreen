import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { toast } from "sonner";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedActivityIds, setJoinedActivityIds] = useState([]);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const { data } = await API.get("/activities");
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities", error);
      setError("Failed to load activities");
      toast.error("Failed to load activities");
    }
  };

  const fetchJoinedActivities = async () => {
    try {
      const { data } = await API.get("/activities/me/joined");
      // Extract just the IDs of joined activities
      setJoinedActivityIds(data.map(activity => activity._id));
    } catch (error) {
      console.error("Failed to fetch joined activities", error);
      toast.error("Failed to load your joined activities");
      // Continue even if this fails - user can still see activities
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (activityId) => {
    try {
      await API.post(`/activities/${activityId}/join`);
      // Add the newly joined activity ID to our state
      setJoinedActivityIds(prev => [...prev, activityId]);
      toast.success("Successfully joined activity!");
    } catch (error) {
      console.error("Failed to join activity", error);
      toast.error(error.response?.data?.message || "Failed to join activity");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchActivities(),
          fetchJoinedActivities()
        ]);
      } catch (error) {
        setError("Failed to load data");
      }
    };
    loadData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-tr from-zinc-100 to-sky-100 dark:from-zinc-900 dark:to-sky-900 text-zinc-900 dark:text-zinc-100">
        <h2 className="text-2xl font-bold mb-5">Available Activities</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))
            : activities.map((activity) => {
                const isJoined = joinedActivityIds.includes(activity._id);

                return (
                  <Card key={activity._id}>
                    <CardHeader>
                      <CardTitle>{activity.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs mt-2">
                        <strong>Category:</strong> {activity.category}
                        <br />
                        <strong>Duration:</strong> {activity.duration} mins
                        <br />
                        <strong>Difficulty:</strong> {activity.difficulty}
                        <br />
                        {activity.location && (
                          <>
                            <strong>Location:</strong> {activity.location}
                            <br />
                          </>
                        )}
                        {activity.scheduledTime && (
                          <>
                            <strong>Scheduled:</strong>{" "}
                            {new Date(activity.scheduledTime).toLocaleString()}
                            <br />
                          </>
                        )}
                      </p>

                      {/* Join Button */}
                      <button
                        onClick={() => !isJoined && handleJoin(activity._id)}
                        disabled={isJoined}
                        className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                          isJoined
                            ? "bg-green-600 text-white cursor-default"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </main>
    </div>
  );
}
