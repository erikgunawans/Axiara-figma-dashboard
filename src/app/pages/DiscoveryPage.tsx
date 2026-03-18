import { DashboardShell } from "../components/DashboardShell";
import { DiscoveryContent } from "../components/DiscoveryContent";

export function DiscoveryPage() {
  return (
    <DashboardShell activeNav={5} title="Discovery">
      <DiscoveryContent />
    </DashboardShell>
  );
}
