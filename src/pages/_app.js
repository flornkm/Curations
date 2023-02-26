import "@/styles/globals.css";
import Maintenance from "@/pages/maintenance";

export default function App({ Component, pageProps }) {
  const maintenanceMode = true;

  if (maintenanceMode) {
    return <Maintenance />;
  }

  return <Component {...pageProps} />;
}
