"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import configuration from "../../config/configuration";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { StateButton } from "@/components/StateButton";
import { redirect } from "next/navigation";
import { Block } from "@blocknote/core";

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
      const ret = await fetch(`${configuration.APP.BACKEND_URL}/admin/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          content: markdown,
        }),
      });
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

const modifyPost = async ({
  postId,
  editor,
  setStatus,
}: {
  postId: string;
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
        `${configuration.APP.BACKEND_URL}/admin/post/${postId}`,
        {
          method: "PUT",
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

export default function EditorPage({ params }: { params: any }) {
  const editor = useCreateBlockNote({
    initialContent:
      params.slug === "new"
        ? localStorage.getItem("documentData") !== "[]"
          ? (JSON.parse(localStorage.getItem("documentData")!) as Block[])
          : [{}]
        : [{}],
  });

  useEffect(() => {
    async function loadInitialHTML() {
      let initialMarkdown;
      try {
        const response = await fetch(
          `${configuration.APP.BACKEND_URL}/api/v1/post/${params.slug}`,
          {
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          redirect("/");
        }

        const body = await response.json();
        initialMarkdown = body.metadata.content;
      } catch (e) {
        redirect("/");
      }

      const blocks = await editor.tryParseMarkdownToBlocks(initialMarkdown);
      editor.replaceBlocks(editor.document, blocks);
    }

    params.slug !== "new" ? loadInitialHTML() : null;
  }, [editor]);

  const { theme } = useTheme();

  const [publishStatus, setPublicStatus] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle");

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
          params.slug === "new"
            ? publishPost({
                editor: editor,
                setStatus: setPublicStatus,
              })
            : modifyPost({
                editor: editor,
                setStatus: setPublicStatus,
                postId: params.slug,
              })
        }
        status={publishStatus}
        state={{
          done: "Published",
          error: "Error",
          fetching: "Publishing",
          idle: params.slug === "new" ? "Publish" : "Modify",
        }}
        className="fixed right-40 bottom-20 rounded-full size-20 z-50"
      />
      <div className="xl:border min-h-screen p-6 pt-10 rounded-xl w-full">
        <BlockNoteView
          color="red"
          theme={theme as "dark" | "light"}
          onChange={() => {
            params.slug === "new"
              ? localStorage.setItem(
                  "documentData",
                  JSON.stringify(editor.document)
                )
              : null;
          }}
          editor={editor}
          data-theming-css-variables-demo
        />
      </div>
    </div>
  );
}
