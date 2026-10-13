import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type TeamProject = { user: string; role: string; project: string; teams: string[]; status: "Active" | "Pending" | "Completed" | "Cancel"; budget: string }
const defaultRows: TeamProject[] = [
  { user: "Sunil Joshi", role: "Web Designer", project: "Elite Admin", teams: ["S", "W"], status: "Active", budget: "$3.9" },
  { user: "Andrew McDownland", role: "Project Manager", project: "Real Homes WP Theme", teams: ["N", "X", "A"], status: "Pending", budget: "$24.5k" },
  { user: "Christopher Jamil", role: "Project Manager", project: "MedicalPro WP Theme", teams: ["X"], status: "Completed", budget: "$12.8k" },
  { user: "Nirav Joshi", role: "Frontend Engineer", project: "Hosting Press HTML", teams: ["X", "Y"], status: "Active", budget: "$2.4k" },
  { user: "Micheal Doe", role: "Content Writer", project: "Helping Hands WP Theme", teams: ["S"], status: "Cancel", budget: "$9.3k" },
]
const statusClass = { Active: "bg-blue-500/10 text-blue-600", Pending: "bg-amber-500/10 text-amber-600", Completed: "bg-teal-500/10 text-teal-600", Cancel: "bg-destructive/10 text-destructive" }

export function TeamProjectsTable({ rows = defaultRows }: { rows?: TeamProject[] }) {
  return <section className="w-full max-w-5xl rounded-2xl border bg-card p-3 shadow-sm sm:p-4"><Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>Project Name</TableHead><TableHead>Team</TableHead><TableHead>Status</TableHead><TableHead>Budget</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.user}><TableCell><div className="flex items-center gap-3"><Avatar className="size-10"><AvatarFallback className="bg-muted">{row.user.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><div><p className="font-medium">{row.user}</p><p className="text-sm text-muted-foreground">{row.role}</p></div></div></TableCell><TableCell className="font-medium">{row.project}</TableCell><TableCell><div className="flex -space-x-2">{row.teams.map((team, index) => <Avatar key={`${team}-${index}`} className="size-10 border-2 border-background"><AvatarFallback className={index % 2 ? 'bg-sky-50 text-sky-600' : 'bg-muted'}>{team}</AvatarFallback></Avatar>)}</div></TableCell><TableCell><Badge variant="secondary" className={statusClass[row.status]}>{row.status}</Badge></TableCell><TableCell className="font-medium">{row.budget}</TableCell></TableRow>)}</TableBody></Table></section>
}

export default TeamProjectsTable
