import { Outlet } from "react-router";
import { AppProvider } from "../components/AppContext";
import { ToastContainer } from "../components/Toast";

export function RootLayout() {
  return (
    <AppProvider>
      <ToastContainer />
      <Outlet />
    </AppProvider>
  );
}
