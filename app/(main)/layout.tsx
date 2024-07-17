"use client";

import HighlightArea from "@/components/HighlightArea";
import SideBar from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import { getSession } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<any>(false);
  const [isShowSidebar, setShowSidebar] = useState<boolean>(false);
  const [isFetching, setFetch] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setSession(session);
      setFetch(false);
    };

    checkAuth();
  }, []);

  return (
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto min-h-screen">
      <SideBar
        isShow={isShowSidebar}
        onClickShowSidebar={setShowSidebar}
        session={session}
        isFetching={isFetching}
      />
      <Topbar
        onClickShowSidebar={setShowSidebar}
        session={session}
        isFetching={isFetching}
      />
      <div className={cn(`grid grid-cols-3 gap-10 pt-24 md:pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          {children}
        </div>
        <div className="relative hidden xl:block md:col-span-1">
          <HighlightArea />
        </div>
      </div>
      <div className="h-52 w-full"></div>
    </div>
  );
}
