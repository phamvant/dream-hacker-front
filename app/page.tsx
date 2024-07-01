import { redirect } from "next/navigation";
import PostPreviewArea from "./components/PostPreviewArea";
import { Topbar } from "./components/Topbar";

export interface Post {
  title: string;
  content: string;
}

const posts = [
  {
    title:
      "A community dedicated to all things web development: both front- end and back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title: "A community dedicated to all things web development: both fro",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title: "A community dedicated to all thnd and back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title: "A community dedicated to all things nd back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title:
      "A community dedicated to all things web developront- end and back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title:
      "A community dedicated to all things web development: both front- end and back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
  {
    title:
      "A community dedicated to all things web dboth front- end and back - end",
    content:
      "A community dedicated to all things web development: both front- end and back - endA community dedicated to all things web development: both front- end and back - end...",
  },
];

export default async function Home() {
  redirect("/list");

  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 h-[100%] gap-10 pt-10">
        <div className="relative col-span-2 h-[100%] rounded-lg">
          {/* <PostPreviewArea /> */}
        </div>
        <div className="relative col-span-1 h-[50%] border-2 rounded-xl border-gray-100"></div>
      </div>
    </div>
  );
}
