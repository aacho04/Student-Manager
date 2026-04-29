import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 bg-[radial-gradient(circle_at_20%_0%,_#dbe7ff,_#f5f7fd_40%)] text-slate-900">
      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
