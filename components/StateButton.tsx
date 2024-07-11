"use client";

import { Spline, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  status: string;
  state: {
    done: string;
    error: string;
    idle: string;
  };
  className: string;
  size: any;
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
        (status === "done" || status === "error" ? true : false)
          ? "secondary"
          : "default"
      }
      onClick={onClick}
      size={size}
      type="submit"
      className={cn(className)}
    >
      {status === "fetching" ? (
        <>
          <Spline className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </>
      ) : (
        ""
      )}
      {status === "done" ? (
        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
          {state.done}
        </span>
      ) : (
        ""
      )}
      {status === "error" ? (
        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
          {state.error}
        </span>
      ) : (
        ""
      )}
      {status === "idle" ? (
        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
          {state.idle}
        </span>
      ) : (
        ""
      )}
    </Button>
  );
};
