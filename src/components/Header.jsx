import { Link } from "react-router";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">
          Random Blogs
        </Link>

        <Navbar />
      </div>
    </header>
  );
}