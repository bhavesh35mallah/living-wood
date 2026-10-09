import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRightIcon, ShieldIcon, UserIcon } from "@/components/site/icons";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [{ title: "Sign in · Form & Field" }];
}

export default function LoginRoute() {
  const navigate = useNavigate();
  const { login } = useShopStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    const success = login(email, password);
    if (success) {
      if (email.toLowerCase().includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    }
  }

  function handleQuickLogin(role: "customer" | "admin") {
    if (role === "admin") {
      login("admin@formandfield.com", "password", "admin");
      navigate("/admin");
    } else {
      login("eleanor.vance@example.com", "password", "customer");
      navigate("/account");
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          Member Access
        </span>
        <h1 className="mt-2 font-display text-4xl font-medium text-foreground sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Sign in to view your order status, curated saved pieces, and address book.
        </p>
      </div>

      {/* Quick Demo Access Bar */}
      <div className="mt-8 rounded-sm border border-border bg-muted/40 p-3.5">
        <p className="text-[11px] font-medium text-primary">
          Quick Demo Credentials:
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("customer")}
            className="flex flex-1 items-center justify-center gap-1.5 border border-border bg-background py-1.5 text-xs text-foreground transition-colors hover:border-primary"
          >
            <UserIcon size={14} />
            <span>Customer Demo</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("admin")}
            className="flex flex-1 items-center justify-center gap-1.5 border border-border bg-background py-1.5 text-xs text-foreground transition-colors hover:border-primary"
          >
            <ShieldIcon size={14} />
            <span>Admin Demo</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {error && (
          <p className="border border-destructive/20 bg-destructive/5 p-2.5 text-xs text-destructive">
            {error}
          </p>
        )}

        <div>
          <label className="text-[11px] text-muted-foreground">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            className="mt-1 h-11 w-full border border-border bg-background px-3.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-muted-foreground">Password</label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset instructions simulated to your email.");
              }}
              className="text-[10px] text-muted-foreground underline hover:text-foreground"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="••••••••"
            className="mt-1 h-11 w-full border border-border bg-background px-3.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center gap-3 bg-primary text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
          <ArrowRightIcon />
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground underline hover:text-primary"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
