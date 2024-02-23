import LeftBar from "@/components/Shared/LeftBar";
import TopBar from "@/components/Shared/TopBar";
import BottomBar from "@/components/Shared/BottomBar";
import { Outlet } from "react-router-dom";
import RightBar from "@/components/Shared/RightBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftBar />
      <section className="flex flex-1 h-main-section lg:h-full">
        <Outlet />
      </section>
      <RightBar />
      <BottomBar />
    </div>
  );
};

export default RootLayout;
