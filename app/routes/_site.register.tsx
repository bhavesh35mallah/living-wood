import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRightIcon } from "@/components/site/icons";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [{ title: "Create an Account · Form & Field" }];
}

export default function RegisterRoute() {
  const navigate = useNavigate();
  const { register } = useShopStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please complete all required fields.");
      return;
    }
    register(name, email);
    navigate("/account");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          Join Form &amp; Field
        </span>
        <h1 className="mt-2 font-display text-4xl font-medium text-foreground sm:text-5xl">
          Create an account
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Enjoy saved wishlists, streamlined order tracking, and an automatic
          10% welcome invitation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {error && (
          <p className="border border-destructive/20 bg-destructive/5 p-2.5 text-xs text-destructive">
            {error}
          </p>
        )}

        <div>
          <label className="text-[11px] text-muted-foreground">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="Anna Mitchell"
            className="mt-1 h-11 w-full border border-border bg-background px-3.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="anna@example.com"
            className="mt-1 h-11 w-full border border-border bg-background px-3.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground">
            Choose a password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="At least 8 characters"
            className="mt-1 h-11 w-full border border-border bg-background px-3.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <label className="mt-1 flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-0.5 accent-primary"
          />
          <span>
            Send me notes on new objects, stories from our makers, and seasonal
            edits.
          </span>
        </label>

        <button
          type="submit"
          className="mt-3 flex h-12 w-full items-center justify-center gap-3 bg-primary text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Create my account
          <ArrowRightIcon />
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
