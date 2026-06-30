import { Link } from "@tanstack/react-router";
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-gradient text-navy-deep">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BookNest</span>
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs">
            A modern bookstore for curious minds. Hand-picked titles, fast delivery, and a reading community you'll love.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-navy-deep transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", links: [["Books", "/books"], ["Bestsellers", "/books"], ["New Releases", "/books"], ["Gift Cards", "/books"]] },
          { title: "Account", links: [["Sign in", "/login"], ["Register", "/register"], ["Dashboard", "/dashboard"], ["Profile", "/profile"]] },
          { title: "Company", links: [["About", "#"], ["Careers", "#"], ["Press", "#"], ["Contact", "#"]] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="font-display text-base font-semibold mb-4">{c.title}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href as string} className="hover:text-accent transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} BookNest. All rights reserved.</p>
          <p>Crafted for readers, by readers.</p>
        </div>
      </div>
    </footer>
  );
}
