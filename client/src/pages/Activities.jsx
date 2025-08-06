import { useEffect, useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityItem from "../components/ActivityItem";
import API from "../services/api";
import { Skeleton } from "../components/ui/skeleton";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
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

export default function Activities() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scheduledTime: "",
  });

  const fetchActivities = async () => {
    try {
      const { data } = await API.get("/activities/me/activities");
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/activities/${id}`);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.error("Failed to delete activity", error);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData({
      name: activity.name,
      description: activity.description,
      scheduledTime: activity.scheduledTime ? activity.scheduledTime.slice(0, 16) : "",
    });
  };

  const handleUpdate = async () => {
    try {
      const { data } = await API.put(`/activities/${editingActivity._id}`, formData);
      setActivities(activities.map((activity) => (activity._id === editingActivity._id ? data : activity)));
      setEditingActivity(null);
    } catch (error) {
      console.error("Failed to update activity", error);
    }
  };

  return (
    <>
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

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-tr from-zinc-100 to-sky-100 dark:from-zinc-900 dark:to-sky-900 text-zinc-900 dark:text-zinc-100">
        <h2 className="text-2xl font-bold mb-5">Your Activities</h2>

        <ActivityForm onActivityCreated={fetchActivities} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))
            : activities.map((activity) => (
                <Card key={activity._id}>
                  <CardHeader>
                    <CardTitle>{activity.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs mt-2">
                      <strong>Category:</strong> {activity.category}<br />
                      <strong>Duration:</strong> {activity.duration} mins<br />
                      <strong>Difficulty:</strong> {activity.difficulty}<br />
                      {activity.location && <><strong>Location:</strong> {activity.location}<br /></>}
                      {activity.scheduledTime && (
                        <>
                          <strong>Scheduled:</strong>{" "}
                          {new Date(activity.scheduledTime).toLocaleString()}<br />
                        </>
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="mt-5 grid gap-4">
          {activities.map((activity) => (
            <ActivityItem
              key={activity._id}
              activity={activity}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={!!editingActivity} onOpenChange={() => setEditingActivity(null)}>
          <DialogContent>
            <h3 className="text-xl font-semibold mb-4">Edit Activity</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Activity Name"
                required
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Description"
                required
              />
              <input
                type="datetime-local"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <Button type="submit" className="w-full">Update Activity</Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
    </>
  );
}
