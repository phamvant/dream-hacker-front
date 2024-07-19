"use client";

import EditorTopbar from "@/components/EditorTopBar";
import { Block } from "@blocknote/core";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import configuration from "../config/configuration";
import { z } from "zod";
import { getSession } from "@/lib/auth/auth";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const submitPostSchema = z.object({
  title: z.string().min(20, {
    message: "Title must be at least 20 characters.",
  }),
  content: z.string().min(100, {
    message: "Content must be at least 100 characters.",
  }),
});

const validate = (input: { title: string; content: string }) => {
  try {
    submitPostSchema.parse(input);
    return true;
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      alert(err.issues.map((e) => e.message + "\n"));
    }
    return false;
  }
};

export default function EditorPage() {
  let preData = "[]";
  const [publishStatus, setPublicStatus] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle");
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [session, setSession] = useState<any>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setSession(session);
    };

    checkAuth();
  }, []);

  if (typeof window !== "undefined") {
    preData = localStorage.getItem("documentData") || "[]";
  }

  const savePost = async () => {
    const isValid = validate({
      title: title,
      content: markdown,
    });

    if (!isValid) {
      return false;
    }

    setPublicStatus("fetching");
    setTimeout(() => publish(), 2000);
    const publish = async () => {
      try {
        const ret = await fetch(
          `${configuration.APP.BACKEND_URL}/admin/post/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              title: title,
              content: markdown,
            }),
          }
        );
        if (!ret.ok) {
          throw new Error();
        } else {
          setPublicStatus("done");
        }
      } catch (error) {
        setPublicStatus("error");
      }
    };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("documentData", JSON.stringify(blocks));
    }
  }, [blocks]);

  return (
    <div>
      <EditorTopbar
        onPublish={savePost}
        status={publishStatus}
        session={session}
      />
      <div className="flex gap-2">
        <div className="hidden flex-col w-80 border rounded-xl p-4 gap-4">
          <div className="p-2 text-xl font-bold">Editor tools</div>
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
        </div>
        <div className="xl:border min-h-screen p-6 pt-10 rounded-xl w-full">
          <Editor
            setTitle={setTitle}
            setBlocks={setBlocks}
            setMarkdown={setMarkdown}
            initialContent={preData}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}
