"use client";

import { getSession } from "@/lib/auth/auth";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TopbarNavigator from "./TopbarNavigator";
import { AlignJustify } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { Button } from "./ui/button";

export default function Topbar({
  onClickShowSidebar,
  session,
  isFetching,
}: {
  onClickShowSidebar: Dispatch<SetStateAction<boolean>>;
  session: any;
  isFetching: boolean;
}) {
  return (
    <div className="fixed top-0 left-0 w-full md:static z-10 backdrop-filter backdrop-blur-lg px-4 md:px-0 bg-white/10 dark:bg-black/10">
      <section className="flex items-center justify-between py-4 md:pt-16">
        <AlignJustify
          className="flex md:hidden"
          aria-label="Toggle navigation"
          onClick={() => onClickShowSidebar((prevState) => !prevState)}
        />
        <div className="flex-grow flex justify-center md:justify-start">
          <Link href="/">
            <h1 className="text-3xl md:text-4xl xl:text-6xl font-bold tracking-tighter leading-tight text-blue-700/80 dark:text-blue-500">
              Dreamhacker.
            </h1>
          </Link>
        </div>
        <TopbarNavigator
          session={session}
          isFetching={isFetching}
          className="hidden md:flex"
        />
        {session ? (
          <div className="md:hidden">
            <ProfileButton />
          </div>
        ) : (
          <Button className="rounded-full md:hidden" variant={"default"}>
            <a href="/login">Login</a>
          </Button>
        )}
      </section>
    </div>
  );
}
