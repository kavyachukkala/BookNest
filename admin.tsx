import { createFileRoute } from "@tanstack/react-router";
import { Book, DollarSign, Users, ShoppingCart, TrendingUp, Edit, Trash2, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { books } from "@/lib/books-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — BookNest" }] }),
  component: Admin,
});

const salesData = [
  { m: "Jan", revenue: 12400, orders: 210 },
  { m: "Feb", revenue: 14800, orders: 260 },
  { m: "Mar", revenue: 17600, orders: 305 },
  { m: "Apr", revenue: 21200, orders: 360 },
  { m: "May", revenue: 19800, orders: 340 },
  { m: "Jun", revenue: 26400, orders: 432 },
];

const categoryData = [
  { name: "Fiction", sold: 312 },
  { name: "Non-Fiction", sold: 248 },
  { name: "Sci-Fi", sold: 184 },
  { name: "Romance", sold: 152 },
  { name: "Business", sold: 120 },
  { name: "Biography", sold: 96 },
];

const users = [
  { id: 1, name: "Elena Jameson", email: "elena@booknest.io", role: "Gold", orders: 14 },
  { id: 2, name: "Marcus Reid", email: "marcus@inkwell.co", role: "Silver", orders: 8 },
  { id: 3, name: "Priya Patel", email: "priya@bookclub.org", role: "Gold", orders: 22 },
  { id: 4, name: "Tomás Vega", email: "tomas@bookmail.com", role: "Member", orders: 3 },
];

const orders = [
  { id: "BN-10293", customer: "Elena J.", total: 56.97, status: "Delivered" },
  { id: "BN-10292", customer: "Priya P.", total: 124.5, status: "Shipped" },
  { id: "BN-10291", customer: "Marcus R.", total: 22.5, status: "Processing" },
  { id: "BN-10290", customer: "Tomás V.", total: 18.99, status: "Delivered" },
];

function Admin() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/40">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Admin</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Control panel</h1>
          </div>
          <button className="inline-flex items-center gap-2 h-11 rounded-full bg-navy text-primary-foreground px-5 font-semibold">
            <Plus className="h-4 w-4" /> New book
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi icon={<DollarSign className="h-4 w-4" />} label="Revenue" value="$112,240" trend="+18.2%" />
          <Kpi icon={<ShoppingCart className="h-4 w-4" />} label="Orders" value="1,907" trend="+12.4%" />
          <Kpi icon={<Users className="h-4 w-4" />} label="Customers" value="6,432" trend="+5.1%" />
          <Kpi icon={<Book className="h-4 w-4" />} label="Books in stock" value={String(books.length * 142)} trend="+2.0%" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display text-lg font-bold mb-1">Revenue this year</h2>
            <p className="text-xs text-muted-foreground mb-4">Monthly gross revenue</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display text-lg font-bold mb-1">By category</h2>
            <p className="text-xs text-muted-foreground mb-4">Units sold (last 30d)</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="sold" fill="var(--navy)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Books table */}
        <Section title="Book management">
          <Table head={["Title", "Author", "Category", "Price", "Rating", ""]}>
            {books.slice(0, 6).map((b) => (
              <tr key={b.id} className="border-t border-border hover:bg-secondary/50">
                <td className="p-3 flex items-center gap-3">
                  <img src={b.cover} alt="" className="w-9 h-12 object-cover rounded-md" />
                  <span className="font-semibold">{b.title}</span>
                </td>
                <td className="p-3 text-muted-foreground">{b.author}</td>
                <td className="p-3">{b.category}</td>
                <td className="p-3 font-semibold">${b.price.toFixed(2)}</td>
                <td className="p-3">{b.rating}</td>
                <td className="p-3 text-right">
                  <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary"><Edit className="h-3.5 w-3.5" /></button>
                  <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </Table>
        </Section>

        <div className="grid lg:grid-cols-2 gap-6">
          <Section title="User management">
            <Table head={["Customer", "Role", "Orders"]}>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="p-3">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-accent/20 text-navy-deep px-2.5 py-0.5 text-xs font-semibold">{u.role}</span>
                  </td>
                  <td className="p-3 font-semibold">{u.orders}</td>
                </tr>
              ))}
            </Table>
          </Section>

          <Section title="Order management">
            <Table head={["Order", "Customer", "Total", "Status"]}>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="p-3 font-mono">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3 font-semibold">${o.total.toFixed(2)}</td>
                  <td className="p-3"><span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">{o.status}</span></td>
                </tr>
              ))}
            </Table>
          </Section>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Kpi({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-navy">{icon}</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"><TrendingUp className="h-3 w-3" /> {trend}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5 border-b border-border">
        <h2 className="font-display text-lg font-bold">{title}</h2>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-secondary/60 text-muted-foreground">
        <tr>
          {head.map((h) => <th key={h} className="text-left p-3 font-semibold">{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
