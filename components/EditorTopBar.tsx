"use client";

import Link from "next/link";
import { Upload } from "lucide-react";
import { StateButton } from "./StateButton";

interface Props {
  onPublish: () => void;
  status: string;
}

export default function EditorTopbar({ onPublish, status }: Props) {
  return (
    <section className="flex items-center justify-between pt-8 mb-12">
      <Link href="/">
        <h1 className="text-4xl font-bold tracking-tighter leading-tight text-blue-700/80">
          Dreamhacker.
        </h1>
      </Link>

      <nav>
        <div className="hidden xl:flex items-center">
          <StateButton
            size="sm"
            className="h-10 gap-1 rounded-3xl"
            onClick={onPublish}
            status={status}
            state={{
              done: "Published",
              error: "Error",
              idle: "Publish",
            }}
          />
        </div>
      </nav>
    </section>
  );
}
