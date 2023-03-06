import "@/styles/globals.css";
import Maintenance from "@/pages/maintenance";

export default function App({ Component, pageProps }) {
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <Maintenance />;
  } else {
    return (
        <Component {...pageProps} />
    );
  }
}
