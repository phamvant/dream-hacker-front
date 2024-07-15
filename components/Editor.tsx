"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block, PartialBlock } from "@blocknote/core";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import "../app/globals.css";

interface EditorProps {
  setBlocks: any;
  setMarkdown: any;
  setTitle: any;
  initialContent: string;
  editable?: boolean;
}

interface Heading {
  text: string;
}

export default function Editor({
  setBlocks,
  setMarkdown,
  setTitle,
  initialContent,
  editable,
}: EditorProps) {
  useEffect(() => {
    setBlocks(
      initialContent !== undefined && initialContent !== "[]"
        ? (JSON.parse(initialContent) as Block[])
        : []
    );
  }, []);

  const { theme } = useTheme();

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    if ((editor.document[0].content as Heading[]).length) {
      const title = (editor.document[0].content as Heading[])[0].text;
      setTitle(title);
    }
    setMarkdown(markdown);
  };

  const editor = useCreateBlockNote({
    initialContent:
      initialContent !== undefined && initialContent !== "[]"
        ? (JSON.parse(initialContent) as PartialBlock[])
        : undefined,
  });

  return (
    <BlockNoteView
      color="red"
      theme={theme as "dark" | "light"}
      editor={editor}
      onChange={() => {
        setBlocks(editor.document);
        onChange();
      }}
      data-theming-css-variables-demo
    />
  );
}
