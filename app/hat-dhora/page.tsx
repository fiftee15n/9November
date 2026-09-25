"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HatDhoraRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/hat-dhoro");
  }, [router]);

  return null;
}
