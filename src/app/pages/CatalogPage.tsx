import { DashboardShell } from "../components/DashboardShell";
import { CatalogContent } from "../components/CatalogContent";

export function CatalogPage() {
  return (
    <DashboardShell activeNav={4} title="Catalog">
      <CatalogContent />
    </DashboardShell>
  );
}
