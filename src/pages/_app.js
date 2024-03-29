import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import TagManager from 'react-gtm-module';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  display: "swap",
  weights: [400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const maintenanceMode = true;

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KDHCP8C' });
  }, []);
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
      <Analytics />
    </>
  );
}
