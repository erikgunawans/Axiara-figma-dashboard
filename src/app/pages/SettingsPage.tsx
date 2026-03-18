import { DashboardShell } from "../components/DashboardShell";
import { SettingsContent } from "../components/SettingsContent";

export function SettingsPage() {
  return (
    <DashboardShell activeNav={8} title="Settings">
      <SettingsContent />
    </DashboardShell>
  );
}
