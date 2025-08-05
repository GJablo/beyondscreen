// components/ActivityForm.jsx
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../components/ui/select";
import { Label } from "../components/ui/label";
import API from "../services/api";
import { toast } from 'sonner';

const categories = ["outdoor", "indoor", "sports", "cultural", "educational", "community", "entertainment", "other"];
const difficulties = ["easy", "medium", "hard"];

export default function ActivityForm({ onActivityCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "outdoor",
    duration: 30,
    difficulty: "medium",
    location: "",
    scheduledTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/activities", form);
      toast("Activity created!");
      setForm({ name: "", description: "", category: "outdoor", duration: 30, difficulty: "medium", location: "", scheduledTime: "" });
      onActivityCreated(); // Refresh list
    } catch (err) {
      toast("Failed to create activity");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted rounded-lg">
      <div>
        <Label>Name</Label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
            <SelectTrigger><span>{form.category}</span></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Difficulty</Label>
          <Select value={form.difficulty} onValueChange={(value) => setForm({ ...form, difficulty: value })}>
            <SelectTrigger><span>{form.difficulty}</span></SelectTrigger>
            <SelectContent>
              {difficulties.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Duration (minutes)</Label>
          <Input name="duration" type="number" min="10" value={form.duration} onChange={handleChange} required />
        </div>
        <div>
          <Label>Scheduled Time</Label>
          <Input name="scheduledTime" type="datetime-local" value={form.scheduledTime} onChange={handleChange} />
        </div>
      </div>
      <div>
        <Label>Location</Label>
        <Input name="location" value={form.location} onChange={handleChange} />
      </div>
      <Button type="submit">Create Activity</Button>
    </form>
  );
}
