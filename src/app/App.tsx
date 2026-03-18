import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ToastContainer } from "./components/Toast";
import { AppProvider } from "./components/AppContext";

export default function App() {
  return (
    <AppProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AppProvider>
  );
}
