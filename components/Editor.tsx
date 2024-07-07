"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block, PartialBlock } from "@blocknote/core";
import { useEffect } from "react";

interface EditorProps {
  setBlocks: any;
  initialContent: string;
  editable?: boolean;
}

export default function Editor({
  setBlocks,
  initialContent,
  editable,
}: EditorProps) {
  useEffect(() => {
    setBlocks(
      initialContent !== undefined && initialContent !== "[]"
        ? (JSON.parse(initialContent) as Block[])
        : [],
    );
  }, []);

  const editor = useCreateBlockNote({
    initialContent:
      initialContent !== undefined && initialContent !== "[]"
        ? (JSON.parse(initialContent) as PartialBlock[])
        : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        setBlocks(editor.document);
      }}
    />
  );
}
