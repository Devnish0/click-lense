"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Login() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/workspace/dashboard");
    }
  }, [session, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/workspace/dashboard",
    });
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error: signUpErr } = await authClient.signUp.email({
          email,
          password,
          name,
        });

        if (signUpErr) {
          setError(signUpErr.message || "Failed to sign up");
        }
      } else {
        const { error: signInErr } = await authClient.signIn.email({
          email,
          password,
        });

        if (signInErr) {
          setError(signInErr.message || "Failed to sign in");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError("");
    await authClient.signOut();
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:p-8">
      {isPending ? (
        <div className="space-y-4">
          <div className="flex gap-4 border-b border-border pb-3">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-11 w-full mt-6" />
        </div>
      ) : session ? (
        <div className="flex flex-col items-center justify-center text-center py-4">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="avatar"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border-2 border-primary object-cover shadow-sm mb-4"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">
                {session.user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Welcome back, {session.user.name}!
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {session.user.email}
          </p>

          <div className="flex items-center gap-2 text-xs font-light text-muted-foreground mb-6 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Redirecting to dashboard...
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={() => router.push("/workspace/dashboard")}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex w-full border-b border-border">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError("");
              }}
              className={`flex-1 border-b-2 px-0 py-2 text-center text-sm font-medium transition-colors ${
                !isSignUp
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError("");
              }}
              className={`flex-1 border-b-2 px-0 py-2 text-center text-sm font-medium transition-colors ${
                isSignUp
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form
            onSubmit={handleEmailAuth}
            className="mb-4 flex w-full flex-col gap-4"
            suppressHydrationWarning
          >
            {isSignUp && (
              <div className="flex w-full flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                />
              </div>
            )}

            <div className="flex w-full flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            {error && (
              <p className="text-center text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? isSignUp
                  ? "Signing up..."
                  : "Signing in..."
                : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              or
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
  );
}
