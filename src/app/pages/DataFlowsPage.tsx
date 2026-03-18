import { DashboardShell } from "../components/DashboardShell";
import { DataFlowsContent } from "../components/DataFlowsContent";

export function DataFlowsPage() {
  return (
    <DashboardShell activeNav={2} title="Data Flows">
      <DataFlowsContent />
    </DashboardShell>
  );
}
