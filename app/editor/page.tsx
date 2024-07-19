"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import configuration from "../config/configuration";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { StateButton } from "@/components/StateButton";

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

const convertPost = async ({ editor }: { editor: any }) => {
  let title: string = "";
  const markdown = await editor.blocksToMarkdownLossy(editor.document);
  if ((editor.document[0].content as { text: string }[]).length) {
    title = (editor.document[0].content as { text: string }[])[0].text;
  }

  return { title, markdown };
};

const publishPost = async ({
  editor,
  setStatus,
}: {
  editor: any;
  setStatus: Dispatch<SetStateAction<"idle" | "fetching" | "error" | "done">>;
}) => {
  const { title, markdown } = await convertPost({ editor: editor });

  const isValid = validate({
    title: title,
    content: markdown,
  });

  if (!isValid) {
    return false;
  }

  setStatus("fetching");
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
        setStatus("done");
      }
    } catch (error) {
      setStatus("error");
    }
  };
};

export default function EditorPage() {
  const { theme } = useTheme();

  const [publishStatus, setPublicStatus] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle");

  const editor = useCreateBlockNote({
    initialContent:
      localStorage.getItem("documentData") !== "[]"
        ? (JSON.parse(localStorage.getItem("documentData")!) as Block[])
        : [],
  });

  return (
    <div className="flex gap-2">
      <div className="hidden flex-col w-80 border rounded-xl p-4 gap-4">
        <div className="p-2 text-xl font-bold">Editor tools</div>
        <div className="border rounded-xl p-2 h-40" />
        <div className="border rounded-xl p-2 h-40" />
        <div className="border rounded-xl p-2 h-40" />
        <div className="border rounded-xl p-2 h-40" />
      </div>
      <StateButton
        onClick={() =>
          publishPost({
            editor: editor,
            setStatus: setPublicStatus,
          })
        }
        status={publishStatus}
        state={{
          done: "Published",
          error: "Error",
          fetching: "Publishing",
          idle: "Publish",
        }}
        className="fixed right-40 bottom-20 rounded-full size-20"
      />
      <div className="xl:border min-h-screen p-6 pt-10 rounded-xl w-full">
        <BlockNoteView
          color="red"
          theme={theme as "dark" | "light"}
          onChange={() => {
            localStorage.setItem(
              "documentData",
              JSON.stringify(editor.document)
            );
          }}
          editor={editor}
          data-theming-css-variables-demo
        />
      </div>
    </div>
  );
}
