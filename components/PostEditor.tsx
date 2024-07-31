"use client";

import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function PostEditor() {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil
          size={30}
          className="ml-2 border-[1px] rounded-lg p-1 cursor-pointer"
          onClick={() => {}}
        />
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
