import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="landing-hero">
        <p className="eyebrow">SOMETHING INTERESTING</p>

        <h1>Random Blogs</h1>

        <p className="landing-description">
          Put down whatever you want.
        </p>

        {user && <p>Welcome back, {user.username}!</p>}

        <div className="landing-actions">
          <Link className="button-link" to="/posts">
            Blogs
          </Link>

          {!user && (
            <Link className="button-link button-secondary" to="/login">
              Login
            </Link>
          )}
        </div>
      </section>

      <section className="feature-grid" aria-label="About the blog">
        <article className="card">
          <h2>Explore ideas</h2>
          <p>
            Browse posts.
          </p>
        </article>

        <article className="card">
          <h2>Share random thoughts</h2>
          <p>
            Log in to leave comments.
          </p>
        </article>

        <article className="card">
          <h2>Investigate</h2>
          <p>
            Find something interesting.
          </p>
        </article>
      </section>
    </>
  );
}