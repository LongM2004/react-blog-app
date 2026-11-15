export default function BlogPost({ title, content, author, date }) {
  return (
    <article className="card">
      <h2>{title}</h2>

      <p className="post-meta">
        By {author} - <time dateTime={date}>{date}</time>
      </p>

      <p>{content}</p>
    </article>
  );
}