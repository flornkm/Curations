import Link from "next/link";
import { Auth, Card, Typography, Space, Button, Icon } from "@supabase/ui";
import { supabase } from "../supabase-config";
import Sidebar from "@/components/Sidebar";
import SaveLinkForm from "@/components/SaveLinkForm";
import { useEffect, useLayoutEffect, useState } from "react";

const fetcher = ([url, token]) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default function Authenticate({ initialData }) {
  const user = initialData;

  return (
    <>
    <Sidebar />
    {user && (
      <SaveLinkForm />
    )}
    </>
  );
}
