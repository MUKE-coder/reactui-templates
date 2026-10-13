import { MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type ProjectRow = {
  name: string
  initials: string
  budget: string
  team: string[]
  leader: string
  activity: "teal" | "pink" | "blue" | "amber"
}

const defaultProjects: ProjectRow[] = [
  { name: "Photoshop", initials: "PS", budget: "$29,374.60", team: ["ER", "SK", "ML", "+3"], leader: "Erin", activity: "teal" },
  { name: "Website SEO", initials: "SE", budget: "$1,843.73", team: ["DK", "AB", "JP", "+3"], leader: "Timothy", activity: "pink" },
  { name: "iOS Mobile App Design", initials: "WS", budget: "$0.9989", team: ["ER", "SK", "ML", "+3"], leader: "Tyler", activity: "blue" },
  { name: "Figma Components", initials: "F", budget: "$238.61", team: ["DK", "SK", "ER", "+3"], leader: "Kristen", activity: "amber" },
  { name: "Web App Design", initials: "R", budget: "$0.629", team: ["ML", "ER", "DK", "+3"], leader: "Isabelle", activity: "teal" },
]

const activityColors = { teal: "stroke-teal-500", pink: "stroke-pink-500", blue: "stroke-sky-500", amber: "stroke-amber-500" }

export function ProjectTable({ projects = defaultProjects }: { projects?: ProjectRow[] }) {
  return (
    <section className="w-full max-w-5xl rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
        <div className="hidden rounded-full bg-muted p-1 text-sm font-medium sm:flex">
          {['Sass', 'Mobile', 'Others'].map((tab, index) => <span key={tab} className={`rounded-full px-6 py-2 ${index === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>{tab}</span>)}
        </div>
        <MoreVertical className="size-5" aria-label="Project options" />
      </div>
      <Table>
        <TableHeader><TableRow><TableHead className="w-1/2">Name</TableHead><TableHead>Budget</TableHead><TableHead>Team</TableHead><TableHead>Leader</TableHead><TableHead>Activity Log</TableHead></TableRow></TableHeader>
        <TableBody>{projects.map((project) => <TableRow key={project.name}>
          <TableCell><div className="flex items-center gap-4"><Checkbox aria-label={`Select ${project.name}`} /><Avatar className="size-10"><AvatarFallback className="bg-sky-50 text-sky-500">{project.initials}</AvatarFallback></Avatar><span className="font-medium">{project.name}</span></div></TableCell>
          <TableCell className="font-medium">{project.budget}</TableCell>
          <TableCell><div className="flex -space-x-2">{project.team.map((member, index) => <Avatar key={`${member}-${index}`} className="size-8 border-2 border-background"><AvatarFallback className={index === 3 ? 'bg-sky-50 text-sky-700' : 'bg-muted text-xs'}>{member}</AvatarFallback></Avatar>)}</div></TableCell>
          <TableCell className="text-muted-foreground">{project.leader}</TableCell>
          <TableCell><svg className={`h-8 w-28 ${activityColors[project.activity]}`} viewBox="0 0 120 32" fill="none" aria-label="Activity trend"><path d="M1 17C12 16 17 5 29 12C39 18 44 25 57 19C69 13 77 17 88 20C101 23 107 10 119 17" strokeWidth="2.5" strokeLinecap="round" /></svg></TableCell>
        </TableRow>)}</TableBody>
      </Table>
    </section>
  )
}

export default ProjectTable
