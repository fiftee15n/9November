"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IccheRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ecche");
  }, [router]);

  return null;
}
