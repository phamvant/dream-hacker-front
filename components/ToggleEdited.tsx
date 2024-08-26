"use client";

import configuration from "@/app/config/configuration";

export default function ToggleEdited({
  postId,
  is_edited,
}: {
  postId: number;
  is_edited: boolean;
}) {
  async function toggleEdited() {
    try {
      const ret = await fetch(
        `${configuration.APP.BACKEND_URL}/admin/post/edited/${postId}`,
        {
          credentials: "include",
          method: "PUT",
        }
      );
    } catch (err) {}
  }

  return (
    <div className="flex gap-4">
      <input
        type="checkbox"
        id="edited"
        defaultChecked={is_edited}
        className="peer hidden"
        onClick={() => {
          toggleEdited();
        }}
      />
      <label
        htmlFor="edited"
        className="peer-checked:bg-blue-700/80 dark:perr-checked:bg-blue-500 text-white bg-slate-400 
        px-4 py-[2px] border-[1px] rounded-xl cursor-pointer hover:bg-slate-400 hover:scale-105 transition-all"
      >
        Edited
      </label>
    </div>
  );
}
