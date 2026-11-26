import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CommentForm({ postId, onAddComment }) {
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in to leave a comment.");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }

    setSubmitting(true);

    fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: Number(postId),
          name: user.username,
          body: comment.trim(),
        }),
      }
    )
      .then(response => {
        if (response.status !== 201) {
          throw new Error("Unable to submit comment");
        }

        return response.json();
      })
      .then(data => {
        onAddComment({
          id: crypto.randomUUID(),
          name: data.name,
          text: data.body,
        });

        setComment("");
      })
      .catch(error => {
        console.error("Error posting comment:", error);
        setError("Unable to submit comment, try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Commenting as <strong>{user.username}</strong>
      </p>

      <label htmlFor="comment-text">Comment</label>
      <textarea
        id="comment-text"
        rows={4}
        value={comment}
        onChange={event => setComment(event.target.value)}
        disabled={submitting}
        required
      />

      {error && <p className="error-message" role="alert">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}