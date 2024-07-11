"use client";

import EditorTopbar from "@/components/EditorTopBar";
import { Block } from "@blocknote/core";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import configuration from "../config/configuration";
import { redirect } from "next/navigation";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function EditorPage() {
  let preData = "[]";
  const [publishStatus, setPublicStatus] = useState<string>("idle");
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  if (typeof window !== "undefined") {
    preData = localStorage.getItem("documentData") || "[]";
  }

  const savePost = async () => {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL} / api / v1 / post / create`,
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
      },
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("documentData", JSON.stringify(blocks));
    }
  }, [blocks]);

  return (
    <div>
      <EditorTopbar onPublish={savePost} status={publishStatus} />
      <div className="flex gap-2">
        <div className="flex flex-col w-80 border rounded-xl p-4 gap-4">
          <div className="p-2 text-primary text-xl font-bold">Editor tools</div>
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
          <div className="border rounded-xl p-2 h-40" />
        </div>
        <div className="xl:border min-h-screen p-6 pt-10 rounded-xl flex-grow">
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
