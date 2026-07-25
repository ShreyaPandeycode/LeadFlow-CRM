import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  ChevronRight,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Leads",
      path: "/leads",
      icon: Users,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-800 px-7 py-7">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-bold shadow-lg">
            L
          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-wide">
              LeadFlow
            </h1>

            <p className="text-slate-400 text-sm">
              CRM Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <p className="text-xs uppercase text-slate-500 tracking-widest px-3 mb-4">
          Main Menu
        </p>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-4 py-4 mb-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">

                    <Icon size={21} />

                    <span className="font-medium">
                      {item.title}
                    </span>

                  </div>

                  <ChevronRight
                    size={18}
                    className={`transition ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-800 p-5">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
            A
          </div>

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-slate-400 text-sm">
              Administrator
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-500 py-3 font-semibold hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;