"use client";
import { auth } from "@/app/lib/auth";
import { authClient } from "@/app/lib/auth-client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { data: session } = authClient.useSession();

  const params = useParams();
  const slug = params.slug;
  useEffect(() => {
    const result = axios.post("/api/url/analytics", {
      id: session?.user.id,
      slug,
    });
  }, []);
  return <>hey there</>;
}
