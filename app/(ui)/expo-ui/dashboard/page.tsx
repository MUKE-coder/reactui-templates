import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string }[] = [
  { id: "dashboard/Dashboard", title: "Analytics Dashboard" },
  { id: "dashboard/StatCard", title: "Stat Cards" },
  { id: "dashboard/LineChart", title: "Line Chart" },
  { id: "dashboard/BarChart", title: "Bar Chart" },
  { id: "dashboard/DonutChart", title: "Donut Chart" },
  { id: "dashboard/DataTable", title: "Data Table" },
];

export default function ExpoUiDashboardPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Dashboard &amp; Charts ({components.length})
      </h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Analytics building blocks for React Native — stat cards, line / bar /
        donut charts (react-native-svg), a data table and a composed dashboard
        screen. Rendered live; copy the real source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="dashboard"
          />
        ))}
      </div>
    </div>
  );
}
