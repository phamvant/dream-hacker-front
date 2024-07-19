import SideBar from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import { getServerSession } from "@/lib/auth/auth";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [session, setSession] = useState<any>(false);
  // const [isShowSidebar, setShowSidebar] = useState<boolean>(false);
  // const [isFetching, setFetch] = useState<boolean>(true);
  const isFetching = false;
  const isShowSidebar = false;
  const session = await getServerSession(cookies());
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const session = await getSession();
  //     setSession(session);
  //     setFetch(false);
  //   };

  //   checkAuth();
  // }, []);

  return (
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto min-h-screen">
      <SideBar
        isShow={isShowSidebar}
        // onClickShowSidebar={setShowSidebar}
        session={session}
        isFetching={isFetching}
      />
      <Topbar
        // onClickShowSidebar={setShowSidebar}
        session={session}
        isFetching={isFetching}
      />
      {children}
      <div className="h-52 w-full"></div>
    </div>
  );
}
