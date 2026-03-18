import { DashboardShell } from "../components/DashboardShell";
import { IntegrationsContent } from "../components/IntegrationsContent";

export function IntegrationsPage() {
  return (
    <DashboardShell activeNav={7} title="Integrations">
      <IntegrationsContent />
    </DashboardShell>
  );
}
