import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav aria-label="Main navigation">
      <Link to="/">Home</Link>
      <Link to="/posts">Blog</Link>
      <Link to="/contact">Contact</Link>

      {user ? (
        <button className="nav-button" onClick={handleLogout} type="button">
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}