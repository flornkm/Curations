import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Maintenance from "@/pages/maintenance";

const inter = Inter({
  display: "swap",
  weights: [400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <Maintenance />;
  } else {
    return (
      <>
        <style jsx global>
          {`
          :root {
            --inter-font: ${inter.style.fontFamily};
          }
        `}
        </style>
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
          <Component {...pageProps} />
        </SessionContextProvider>
      </>
    );
  }
}
