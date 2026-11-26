import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    const success = login(username, password);

    if (!success) {
      setError("Incorrect username or password");
      return;
    }

    navigate("/posts", { replace: true });
  }

  if (user) {
    return <Navigate to="/posts" replace />;
  }

  return (
    <section className="card login-card">
      <h1>Welcome</h1>
      <p>Log in to view blogs and comment</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="demo-note">
        Test account: <strong>test</strong> / <strong>password123</strong>
      </p>
    </section>
  );
}