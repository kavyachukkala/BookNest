import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, User, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import book1 from "@/assets/book-1.jpg";
import book4 from "@/assets/book-4.jpg";
import book6 from "@/assets/book-6.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create an account — BookNest" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-gradient text-navy-deep">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BookNest</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-navy-deep px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3 w-3" /> Get 20% off your first three orders
          </span>
          <h1 className="font-display text-3xl font-bold mt-4">Join BookNest</h1>
          <p className="text-muted-foreground mt-2">Build your library. Track orders. Get personal recommendations.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Account created!"); nav({ to: "/dashboard" }); }}
            className="mt-8 space-y-4"
          >
            <Field icon={<User className="h-4 w-4" />}>
              <input required placeholder="Full name" className="w-full bg-transparent focus:outline-none text-sm" />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />}>
              <input type="email" required placeholder="Email address" className="w-full bg-transparent focus:outline-none text-sm" />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />}>
              <input type="password" required placeholder="Password" minLength={8} className="w-full bg-transparent focus:outline-none text-sm" />
            </Field>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="accent-[var(--accent)] h-4 w-4 mt-0.5" />
              I agree to the <a href="#" className="text-accent font-semibold">Terms</a> and <a href="#" className="text-accent font-semibold">Privacy Policy</a>.
            </label>

            <button className="w-full h-12 rounded-full bg-cyan-gradient text-navy-deep font-semibold shadow-glow hover:scale-[1.01] transition-transform">
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden lg:block bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-soft" />
        {/* Floating book covers */}
        <img src={book1} alt="" className="absolute top-16 left-12 w-44 rounded-xl shadow-elegant animate-float" />
        <img src={book4} alt="" className="absolute top-1/2 right-16 w-52 rounded-xl shadow-elegant animate-float-alt" style={{ animationDelay: "0.6s" }} />
        <img src={book6} alt="" className="absolute bottom-20 left-1/4 w-48 rounded-xl shadow-elegant animate-float" style={{ animationDelay: "1.2s" }} />
        {/* Glow orbs */}
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-12 right-12 max-w-xs text-primary-foreground">
          <p className="font-display text-2xl font-bold leading-snug">
            "We read to know we're not alone."
          </p>
          <p className="text-sm text-primary-foreground/60 mt-2">— C.S. Lewis</p>
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
