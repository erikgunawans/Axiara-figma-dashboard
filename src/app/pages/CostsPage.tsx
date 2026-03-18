import { DashboardShell } from "../components/DashboardShell";
import { CostsContent } from "../components/CostsContent";

export function CostsPage() {
  return (
    <DashboardShell activeNav={6} title="Axiara Spend">
      <CostsContent />
    </DashboardShell>
  );
}
