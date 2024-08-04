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
import { Button } from "@/components/ui/button";

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
  lang,
  editor,
  setStatus,
}: {
  postId: string;
  lang: string;
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
            lang: lang,
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
  const [lang, setLang] = useState<string>("vn");
  const [data, setData] = useState<Record<string, Block[]>>();

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
        const blockvn = await editor.tryParseMarkdownToBlocks(
          body.metadata.content_vn
        );
        const blocken = await editor.tryParseMarkdownToBlocks(
          body.metadata.content_en
        );
        const blockcn = await editor.tryParseMarkdownToBlocks(
          body.metadata.content_cn
        );
        setData({ vn: blockvn, en: blocken, cn: blockcn });

        editor.replaceBlocks(editor.document, blockvn);
      } catch (e) {
        redirect("/");
      }
    }

    params.slug !== "new" ? loadInitialHTML() : null;
  }, [editor]);

  const { theme } = useTheme();

  const [publishStatus, setPublicStatus] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle");

  useEffect(() => {
    async function switchLang(lang: string) {
      if (data) {
        editor.replaceBlocks(editor.document, data[lang]);
      }
    }

    switchLang(lang);
  }, [lang]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.preventDefault();
      event.returnValue = message; // Standard for most browsers
      return message; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
                lang: lang,
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
      <div className="xl:border min-h-screen p-6 rounded-xl w-full">
        <div className="flex gap-4">
          <Button
            className={`${
              lang === "vn"
                ? "bg-primary text-white"
                : "bg-primary-foreground text-primary hover:text-white"
            }`}
            onClick={() => setLang("vn")}
          >
            VN
          </Button>
          <Button
            className={`${
              lang === "en"
                ? "bg-primary text-white"
                : "bg-primary-foreground text-primary hover:text-white"
            }`}
            onClick={() => setLang("en")}
          >
            EN
          </Button>
          <Button
            className={`${
              lang === "cn"
                ? "bg-primary text-white"
                : "bg-primary-foreground text-primary hover:text-white"
            }`}
            onClick={() => setLang("cn")}
          >
            CN
          </Button>
        </div>
        <BlockNoteView
          color="red"
          theme={theme as "dark" | "light"}
          onChange={() => {
            params.slug === "new"
              ? localStorage.setItem(
                  "documentData",
                  JSON.stringify(editor.document)
                )
              : setData((prev) => {
                  return { ...prev, [lang]: editor.document };
                });
          }}
          editor={editor}
          data-theming-css-variables-demo
        />
      </div>
    </div>
  );
}
