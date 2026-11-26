import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <section className="intro">
        <p className="eyebrow">SOMETHING INTERESTING</p>
        <h1>Random Blogs</h1>
        <p>Thoughts and Ideas</p>
      </section>

      <section aria-labelledby="posts-heading">
        <h2 id="posts-heading">Latest posts</h2>
        {posts.map((post) => (
          <article key={post.id} className="card">
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.body.slice(0,100)}...</p>
          </article>
        ))}
      </section>
    </>
  );
}