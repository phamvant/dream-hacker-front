"use client";

import { getSession } from "@/lib/auth/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import TopbarNavigator from "./TopbarNavigator";

export default function Topbar() {
  const [isAuth, setAuth] = useState<any>(false);
  const [isFetching, setFetch] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setAuth(session);
      setFetch(false);
    };

    checkAuth();
  }, []);

  return (
    <section className="flex items-center justify-between pt-8 md:pt-16 mb-12">
      <Link href="/">
        <h1 className="text-6xl font-bold tracking-tighter leading-tight text-blue-700/80">
          Dreamhacker.
        </h1>
      </Link>
      <TopbarNavigator isAuth={isAuth} isFetching={isFetching} />
    </section>
  );
}
