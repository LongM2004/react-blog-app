import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="card">
      <h1>Contact</h1>

      <form
        onSubmit={handleSubmit}
        onChange={() => setSubmitted(false)}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
        />

        <button type="submit">Submit</button>

        {submitted && (
          <p role="status">
            Information submitted.
          </p>
        )}
      </form>
    </section>
  );
}