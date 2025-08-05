// pages/Home.jsx
import HomeNavbar from "../components/components/HomeNavbar";
import { Button } from "../components/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors">
      <HomeNavbar />

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Disconnect to Reconnect 🌿
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          BeyondScreen helps you unplug from devices and engage with meaningful
          offline experiences. Track your goals, complete challenges, and share your wins.
        </p>
        <div className="flex gap-4">
          <Link to="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BeyondScreen. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
