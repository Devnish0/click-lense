"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await authClient.signOut();
    setLoading(false);
  };

  if (isPending) {
    return (
      <div style={styles.container}>
        <p style={styles.text}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>URL Shortener</h1>
      <p style={styles.subtitle}>Minimal test frontend</p>

      <div style={styles.card}>
        {session ? (
          <>
            <div style={styles.userInfo}>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="avatar"
                  width={48}
                  height={48}
                  style={styles.avatar}
                />
              )}
              <div>
                <p style={styles.name}>{session.user.name}</p>
                <p style={styles.email}>{session.user.email}</p>
              </div>
            </div>

            <div style={styles.sessionBox}>
              <p style={styles.label}>Session ID</p>
              <code style={styles.code}>{session.session.id}</code>
            </div>

            <div style={styles.sessionBox}>
              <p style={styles.label}>User ID</p>
              <code style={styles.code}>{session.user.id}</code>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              style={{ ...styles.button, ...styles.signOutButton }}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </>
        ) : (
          <>
            <p style={styles.text}>Not signed in</p>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{ ...styles.button, ...styles.googleButton }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.99-.15-1.17z"
                />
                <path
                  fill="#34A853"
                  d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.71.49-1.63.77-2.7.77-2.08 0-3.84-1.4-4.47-3.29H1.83v2.07A8 8 0 0 0 8.98 17z"
                />
                <path
                  fill="#FBBC05"
                  d="M4.51 10.53a4.8 4.8 0 0 1 0-3.06V5.4H1.83a8 8 0 0 0 0 7.18l2.68-2.05z"
                />
                <path
                  fill="#EA4335"
                  d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.29-2.3A8 8 0 0 0 1.83 5.4l2.68 2.07c.63-1.89 2.39-3.29 4.47-3.29z"
                />
              </svg>
              {loading ? "Redirecting..." : "Sign in with Google"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    background: "#0a0a0a",
    color: "#ededed",
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.25rem",
  },
  subtitle: {
    color: "#666",
    marginBottom: "2rem",
    fontSize: "0.875rem",
  },
  card: {
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: "12px",
    padding: "2rem",
    minWidth: "360px",
    maxWidth: "420px",
  },
  text: {
    color: "#999",
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  avatar: {
    borderRadius: "50%",
  },
  name: {
    fontWeight: 600,
    fontSize: "1.1rem",
  },
  email: {
    color: "#888",
    fontSize: "0.85rem",
  },
  sessionBox: {
    background: "#0a0a0a",
    border: "1px solid #262626",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    marginBottom: "0.75rem",
  },
  label: {
    color: "#666",
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "0.25rem",
  },
  code: {
    fontSize: "0.8rem",
    color: "#ccc",
    wordBreak: "break-all" as const,
    fontFamily: "var(--font-geist-mono), monospace",
  },
  button: {
    width: "100%",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "opacity 0.15s",
  },
  googleButton: {
    background: "#fff",
    color: "#333",
  },
  signOutButton: {
    background: "#262626",
    color: "#ededed",
    marginTop: "0.5rem",
  },
};
