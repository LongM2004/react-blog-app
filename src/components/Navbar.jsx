import { Link } from "react-router";
import { posts } from "../data/posts";

export default function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <Link to="/">Home</Link>

      {/* {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      ))} */}

      <Link to="/contact">Contact</Link>
    </nav>
  );
}