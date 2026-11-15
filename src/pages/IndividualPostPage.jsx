import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CommentForm from "../components/CommentForm";

export default function IndividualPostPage() {
  const { id } = useParams();
  const [commentsByPost, setCommentsByPost] = useState({});
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setPost(null);
    setUser(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(postData => {
        setPost(postData);

        return fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
      })
      .then(response => response.json())
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching post:", error);
        setError("Unable to load post and author");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => response.json())
      .then(data => {
        const fetchedComments = data.map(comment => ({
          id: comment.id,
          name: comment.name,
          text: comment.body,
        }));

        setCommentsByPost(previous => ({
          ...previous,
          [id]: fetchedComments,
        }));
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  const comments = commentsByPost[id] || [];

  function addComment(comment) {
    setCommentsByPost((previous) => ({
      ...previous,
      [id]: [...(previous[id] || []), comment],
    }));
  }

  if (loading) {
    return <p>Loading post</p>;
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <Link to="/">Back to posts</Link>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <h1>Post not found</h1>
        <Link to="/">Back to posts</Link>
      </>
    );
  }

  return (
    <>
      <article className="card">
        <h1>{post.title}</h1>

        {user && (
          <div>
            <p>By {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <p>{post.body}</p>
      </article>

      <section className="card">
        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment">
                <strong>{comment.name}</strong>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}

        <h3>Leave a comment</h3>
        <CommentForm key={id} postId={id} onAddComment={addComment} />
      </section>

      <Link to="/">Back to posts</Link>
    </>
  );
}