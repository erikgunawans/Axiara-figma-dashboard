import { DashboardShell } from "../components/DashboardShell";
import { HITLAuditContent } from "../components/HITLAuditContent";

export function HITLAuditPage() {
  return (
    <DashboardShell activeNav={1} title="HITL Audit">
      <HITLAuditContent />
    </DashboardShell>
  );
}
