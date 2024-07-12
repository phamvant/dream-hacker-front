"use client";

import { getSession } from "@/lib/auth/auth";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import configuration from "@/app/config/configuration";

export default function ProfileButton() {
  const [isAuth, setAuth] = useState<any>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setAuth(session);
    };

    checkAuth();
  }, []);

  const logout = () => {
    window.open(`${configuration.APP.BACKEND_URL}/auth/logout`, "_self");
  };

  return isAuth ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src="https://avatar.iran.liara.run/public/48"
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <></>
  );
}
