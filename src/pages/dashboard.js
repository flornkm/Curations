import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-config";
import Sidebar from "@/components/Sidebar";
import Login from "@/components/Login";
import Profile from "@/components/Settings";
import SaveLinkForm from "@/components/SaveLinkForm";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [tab, setTab] = useState("links-inserter");

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {!session ? (
        <Login />
      ) : session.user.email === "florian.kiem@hfg.design" ? (
        <>
          <Sidebar session={session} setTab={setTab} tab={tab} />
          {tab === "links-inserter" && <SaveLinkForm />}
          {tab === "profile" && <Profile session={session} />}
        </>
      ) : (
        <div className="h-screen w-full flex flex-col gap-5 justify-center items-center">
          <span className="text-xl">You are not authorized to view this page.</span>
          <Link
            href="/"
            className="px-4 py-2 bg-zinc-800 text-white rounded-md transition-all hover:bg-zinc-700"
          >Back</Link>
        </div>
      )}
    </>
  );
}
