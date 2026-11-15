import { useRef, useState } from "react";

export default function CommentForm({ postId, onAddComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nextId = useRef(0);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !comment.trim()) {
      setError("Enter your name and comment");
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
          name: name.trim(),
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
          id: `new-${nextId.current++}`,
          name: data.name,
          text: data.body,
        });

        setName("");
        setComment("");
        setSubmitting(false);
      })
      .catch(error => {
        console.error("Error posting comment:", error);
        setError("Unable to submit comment, try again");
        setSubmitting(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-name">Name</label>
      <input
        id="comment-name"
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={submitting}
        required
      />

      <label htmlFor="comment-text">Comment</label>
      <textarea
        id="comment-text"
        value={comment}
        onChange={event => setComment(event.target.value)}
        disabled={submitting}
        required
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}