import { DashboardShell } from "../components/DashboardShell";
import { KpiBentoGrid } from "../components/KpiBentoGrid";
import { GovernanceFunnel } from "../components/GovernanceFunnel";
import { ChartsSection } from "../components/ChartsSection";
import { AttentionSection } from "../components/AttentionSection";

export function AdminDashboard() {
  return (
    <DashboardShell activeNav={0} title="Overview">
      <KpiBentoGrid />
      <GovernanceFunnel />
      <ChartsSection />
      <AttentionSection />
    </DashboardShell>
  );
}
