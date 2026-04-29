import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/students", label: "Students" },
  { path: "/attendance", label: "Attendance" },
  { path: "/grades", label: "Grades" },
  { path: "/fees", label: "Fees" },
  { path: "/reports", label: "Reports" }
];

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-72 border-r border-slate-200 bg-white/80 p-6 backdrop-blur md:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/35 md:hidden" onClick={onClose}>
          <aside
            className="h-full w-72 bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <SidebarContent onItemClick={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ onItemClick }) {
  return (
    <div className="flex h-full flex-col">
      <h1 className="font-display text-2xl font-bold text-brand-700">StudentManager</h1>
      <p className="mt-2 text-sm text-slate-500">Academic workflow, simplified.</p>

      <nav className="mt-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
