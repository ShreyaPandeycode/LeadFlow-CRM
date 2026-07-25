import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-72">
        <Navbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}