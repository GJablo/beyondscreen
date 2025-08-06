import { useState } from "react";
import { Button } from "../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function ActivityItem({ activity, onDelete, onEdit }) {
  return (
    <div className="p-4 rounded-xl shadow-md bg-card dark:bg-muted flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{activity.name}</h3>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <p className="text-sm mt-1">Scheduled: {new Date(activity.scheduledTime).toLocaleString()}</p>
      </div>
      <div className="space-x-2">
        <Button variant="outline" onClick={() => onEdit(activity)}>
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(activity._id)}>
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
