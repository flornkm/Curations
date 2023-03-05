import "@/styles/globals.css";
import { Auth } from "@supabase/ui";
import { supabase } from "../supabase-config";
import Maintenance from "@/pages/maintenance";

export default function App({ Component, pageProps }) {
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <Maintenance />;
  } else {
    return (
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    );
  }
}
