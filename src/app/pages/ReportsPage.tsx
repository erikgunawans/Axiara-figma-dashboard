import { DashboardShell } from "../components/DashboardShell";
import { ReportsContent } from "../components/ReportsContent";

export function ReportsPage() {
  return (
    <DashboardShell activeNav={3} title="Reports">
      <ReportsContent />
    </DashboardShell>
  );
}
