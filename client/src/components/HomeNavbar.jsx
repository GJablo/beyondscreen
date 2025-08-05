// components/Navbar.jsx
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';

const HomeNavbar = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold text-primary">BeyondScreen</h1>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <Link to="/login">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button>Create Account</Button>
        </Link>
      </div>
    </header>
  );
};

export default HomeNavbar;
