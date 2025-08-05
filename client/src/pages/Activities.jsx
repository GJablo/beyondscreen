// pages/dashboard/Activities.jsx
import { useEffect, useState } from "react";
import ActivityForm from "../components/ActivityForm";
import API from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const { data } = await API.get("/activities");
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

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">Your Activities</h2>
      <ActivityForm onActivityCreated={fetchActivities} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)
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
                    {activity.scheduledTime && <><strong>Scheduled:</strong> {new Date(activity.scheduledTime).toLocaleString()}<br /></>}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
