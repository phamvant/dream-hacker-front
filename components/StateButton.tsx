"use client";

import { RotateCcw, RotateCw, Spline, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface IButtonState {
  done: string;
  error: string;
  idle: string;
  fetching: string;
}

interface Props {
  status: string;
  state: IButtonState;
  className: string;
  size?: any;
  onClick: () => void;
}

export const StateButton = ({
  children,
  status,
  state,
  className,
  onClick,
  size,
}: PropsWithChildren<Props>) => {
  return (
    <Button
      disabled={status === "fetching"}
      variant={
        status === "error"
          ? "destructive"
          : status === "fetching"
          ? "secondary"
          : status === "done"
          ? "success"
          : "default"
      }
      onClick={onClick}
      // size={size}
      type="submit"
      className={cn(className)}
    >
      {status === "fetching" ? (
        <>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          <span>{state[status as keyof IButtonState]}</span>
        </>
      ) : (
        <span>{state[status as keyof IButtonState]}</span>
      )}
    </Button>
  );
};
