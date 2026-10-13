"use client"

import { useMemo, useState, type ChangeEvent } from "react"
import { Eye, Pencil, Search, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type ManagedUser = { name: string; email: string; role: string; plan: string; billing: string; status: "Active" | "Inactive" | "Pending" }
const defaultUsers: ManagedUser[] = [
  { name: "Olivia Rhye", email: "olivia@ui.com", role: "Maintainer", plan: "Enterprise", billing: "Auto debit", status: "Active" },
  { name: "Barbara Steele", email: "steele@ui.com", role: "Admin", plan: "Enterprise", billing: "Auto debit", status: "Inactive" },
  { name: "Leonard Gordon", email: "leonard@ui.com", role: "Editor", plan: "Team", billing: "Manual - PayPal", status: "Active" },
  { name: "Evelyn Pope", email: "evelyn@ui.com", role: "Author", plan: "Basic", billing: "Manual - cash", status: "Pending" },
  { name: "Tommy Garza", email: "tommy@ui.com", role: "Subscriber", plan: "Company", billing: "Auto debit", status: "Inactive" },
  { name: "Isabel Vasquez", email: "isabel@ui.com", role: "Editor", plan: "Team", billing: "Auto debit", status: "Active" },
]
const statusClass = { Active: "bg-teal-500/10 text-teal-600", Inactive: "bg-destructive/10 text-destructive", Pending: "bg-amber-500/10 text-amber-600" }

export function UserManagementTable({ users = defaultUsers }: { users?: ManagedUser[] }) {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState("All")
  const [plan, setPlan] = useState("All")
  const [status, setStatus] = useState("All")
  const filteredUsers = useMemo(() => users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()) && (role === "All" || user.role === role) && (plan === "All" || user.plan === plan) && (status === "All" || user.status === status)), [users, query, role, plan, status])
  const roles = [...new Set(users.map((user) => user.role))]
  const plans = [...new Set(users.map((user) => user.plan))]
  return <section className="w-full max-w-6xl rounded-2xl border bg-card p-4 shadow-sm sm:p-7"><div className="mb-6 flex flex-col gap-4 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search users..." className="pl-9" /></div><Select value={role} onValueChange={(value) => value && setRole(value)}><SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Select role" /></SelectTrigger><SelectContent><SelectItem value="All">All roles</SelectItem>{roles.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select><Select value={plan} onValueChange={(value) => value && setPlan(value)}><SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Select plan" /></SelectTrigger><SelectContent><SelectItem value="All">All plans</SelectItem>{plans.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select><Select value={status} onValueChange={(value) => value && setStatus(value)}><SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="All">All statuses</SelectItem>{["Active", "Inactive", "Pending"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div><Table><TableHeader><TableRow><TableHead className="w-10" /><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Plan</TableHead><TableHead>Billing</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>{filteredUsers.map((user) => <TableRow key={user.email}><TableCell><Checkbox aria-label={`Select ${user.name}`} /></TableCell><TableCell><div className="flex items-center gap-3"><Avatar className="size-10"><AvatarFallback className="bg-muted">{user.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><div><p className="font-medium">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div></div></TableCell><TableCell>{user.role}</TableCell><TableCell>{user.plan}</TableCell><TableCell>{user.billing}</TableCell><TableCell><Badge variant="secondary" className={statusClass[user.status]}>{user.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={`Delete ${user.name}`}><Trash2 /></Button><Button variant="ghost" size="icon" aria-label={`View ${user.name}`}><Eye /></Button><Button variant="ghost" size="icon" aria-label={`Edit ${user.name}`}><Pencil /></Button></div></TableCell></TableRow>)}</TableBody></Table></section>
}

export default UserManagementTable
