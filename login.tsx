import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import interior from "@/assets/bookstore-interior.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — BookNest" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block bg-hero text-primary-foreground overflow-hidden">
        <img src={interior} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy-deep/70 to-transparent" />
        <div className="relative p-12 h-full flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-gradient text-navy-deep">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BookNest</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl xl:text-5xl font-bold leading-tight text-balance">
              "A reader lives a thousand lives before he dies."
            </h2>
            <p className="mt-4 text-primary-foreground/70">— George R.R. Martin</p>
          </div>
          <p className="text-xs text-primary-foreground/60">© BookNest · Quiet corners of the internet for big readers.</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-gradient text-navy-deep">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BookNest</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to pick up where you left off.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Welcome back!"); nav({ to: "/dashboard" }); }}
            className="mt-8 space-y-4"
          >
            <Field icon={<Mail className="h-4 w-4" />}>
              <input type="email" required placeholder="you@email.com" className="w-full bg-transparent focus:outline-none text-sm" />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />}>
              <input type={show ? "text" : "password"} required placeholder="Password" className="w-full bg-transparent focus:outline-none text-sm" />
              <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[var(--accent)] h-4 w-4" />
                Remember me
              </label>
              <a href="#" className="text-accent font-semibold hover:underline">Forgot password?</a>
            </div>

            <button className="w-full h-12 rounded-full bg-navy text-primary-foreground font-semibold hover:bg-navy-deep transition-colors">
              Sign in
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR CONTINUE WITH <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Google", "Apple", "GitHub"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toast(`${p} sign-in (demo)`)}
                className="h-11 rounded-full border border-border bg-card hover:border-accent text-sm font-semibold transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New here? <Link to="/register" className="text-accent font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 h-12 px-4 rounded-full bg-card border border-border focus-within:border-accent transition-colors">
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </div>
  );
}
