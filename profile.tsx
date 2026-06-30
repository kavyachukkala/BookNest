import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Mail, MapPin, Phone, Save, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — BookNest" }] }),
  component: ProfilePage,
});

const orderHistory = [
  { id: "BN-10293", date: "Jun 24, 2026", items: "The Midnight Library + 2 more", total: 56.97, status: "Delivered" },
  { id: "BN-10240", date: "Jun 12, 2026", items: "Atomic Habits", total: 22.5, status: "Delivered" },
  { id: "BN-10211", date: "May 30, 2026", items: "Dune + 1 more", total: 38.5, status: "Delivered" },
  { id: "BN-10184", date: "May 14, 2026", items: "Becoming", total: 23.5, status: "Delivered" },
  { id: "BN-10155", date: "Apr 28, 2026", items: "Sapiens + 1 more", total: 36.98, status: "Delivered" },
];

function ProfilePage() {
  const [tab, setTab] = useState<"info" | "orders">("info");
  const [form, setForm] = useState({
    name: "Elena Jameson",
    email: "elena@booknest.io",
    phone: "+1 (415) 555-0182",
    address: "248 Bayview Lane, San Francisco, CA 94110",
    bio: "Always between two books. Big fan of literary fiction and slow Sunday mornings with coffee and a memoir.",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 w-full flex-1">
        <div className="rounded-3xl bg-hero text-primary-foreground p-8 md:p-10 shadow-elegant relative overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="relative">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-cyan-gradient text-navy-deep font-display text-3xl font-bold">EJ</div>
              <button className="absolute -bottom-1 -right-1 h-9 w-9 grid place-items-center rounded-full bg-card text-foreground border border-border">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-3xl md:text-4xl font-bold truncate">{form.name}</h1>
              <p className="text-primary-foreground/70 text-sm">{form.email} · Gold reader · 14 orders</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {(["info", "orders"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 h-10 rounded-full text-sm font-semibold transition-colors",
                tab === t ? "bg-navy text-primary-foreground" : "bg-card border border-border hover:border-accent"
              )}
            >
              {t === "info" ? "Account info" : "Order history"}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}
            className="mt-6 rounded-2xl bg-card border border-border p-6 grid sm:grid-cols-2 gap-5"
          >
            <ProfileField icon={<User className="h-4 w-4" />} label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <ProfileField icon={<Mail className="h-4 w-4" />} label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <ProfileField icon={<Phone className="h-4 w-4" />} label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <ProfileField icon={<MapPin className="h-4 w-4" />} label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            <label className="sm:col-span-2 block">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Bio</span>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button className="inline-flex items-center gap-2 h-11 rounded-full bg-cyan-gradient text-navy-deep px-5 font-semibold shadow-glow">
                <Save className="h-4 w-4" /> Save changes
              </button>
            </div>
          </form>
        )}

        {tab === "orders" && (
          <div className="mt-6 rounded-2xl bg-card border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="text-left p-4 font-semibold">Order</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Date</th>
                  <th className="text-left p-4 font-semibold">Items</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="p-4 font-mono">{o.id}</td>
                    <td className="p-4 hidden md:table-cell">{o.date}</td>
                    <td className="p-4">{o.items}</td>
                    <td className="p-4 font-semibold">${o.total.toFixed(2)}</td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="inline-flex rounded-full bg-accent/20 text-navy-deep px-2.5 py-0.5 text-xs font-semibold">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}

function ProfileField({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
        <span className="text-muted-foreground">{icon}</span>
        <input value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full bg-transparent focus:outline-none text-sm" />
      </div>
    </label>
  );
}
