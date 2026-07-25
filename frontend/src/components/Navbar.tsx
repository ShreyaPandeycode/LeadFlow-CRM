import { Bell, CalendarDays, Search } from "lucide-react";

function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
   <header className="sticky top-0 z-20 h-20 w-full bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome Back 
        </h1>

        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

          <CalendarDays size={15} />

          <span>{today}</span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 focus:border-blue-500 focus:bg-white transition"
          />

        </div>

        {/* Notification */}

        <button className="relative h-11 w-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">

          <Bell size={19} />

          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">

            A

          </div>

          <div>

            <p className="font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              CRM Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;