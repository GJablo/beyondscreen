import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Input } from "../components/components/ui/input";
import { Button } from "../components/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/components/ui/card";
import API from '../services/api';
import { Link } from "react-router-dom";
import { toast } from 'sonner';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 // const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);
    try {
      const res = await API.post("/users/register", { email, password });
      localStorage.setItem("token", res.data.token);
      toast('User created successfully!');
  //    navigate("/dashboard");
    } catch (error) {
      alert(error.res?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup} disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </CardFooter>
        <p className="text-center mt-4 text-sm text-zinc-600 dark:text-zinc-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </Card>
    </div>
  );
}
