import { Bell, Menu } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Student Hub</p>
            <h2 className="font-display text-xl font-bold text-slate-800">Control Panel</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 p-2 text-slate-600">
            <Bell size={16} />
          </button>
          <div className="rounded-full bg-brand-500 px-3 py-2 text-xs font-semibold text-white">Admin</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
