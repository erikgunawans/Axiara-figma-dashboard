import { createBrowserRouter } from "react-router";
import { RootLayout } from "./pages/RootLayout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeePortal } from "./pages/EmployeePortal";
import { RequestToolPage } from "./pages/RequestToolPage";
import { MyAIPage } from "./pages/MyAIPage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { GovernanceShowcasePage } from "./pages/GovernanceShowcasePage";
import { CostsPage } from "./pages/CostsPage";
import { HITLAuditPage } from "./pages/HITLAuditPage";
import { DataFlowsPage } from "./pages/DataFlowsPage";
import { CatalogPage } from "./pages/CatalogPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { StateVariantsPage } from "./pages/StateVariantsPage";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/login", Component: LoginPage },
      { path: "/", Component: AdminDashboard },
      { path: "/hitl-audit", Component: HITLAuditPage },
      { path: "/data-flows", Component: DataFlowsPage },
      { path: "/reports", Component: ReportsPage },
      { path: "/catalog", Component: CatalogPage },
      { path: "/integrations", Component: IntegrationsPage },
      { path: "/settings", Component: SettingsPage },
      { path: "/discovery", Component: DiscoveryPage },
      { path: "/costs", Component: CostsPage },
      { path: "/governance-wizard", Component: GovernanceShowcasePage },
      { path: "/portal", Component: EmployeePortal },
      { path: "/portal/request", Component: RequestToolPage },
      { path: "/portal/my-ai", Component: MyAIPage },
      { path: "/onboarding", Component: OnboardingPage },
      { path: "/states", Component: StateVariantsPage },
    ],
  },
]);