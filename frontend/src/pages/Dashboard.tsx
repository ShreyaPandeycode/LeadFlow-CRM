import { useEffect, useState } from "react";
import {
  Users,
  Trophy,
  TrendingUp,
  Target,
  Sun,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import QuickActions from "../components/dashboard/QuickActions";
import HotLeadsTable from "../components/dashboard/HotLeadsTable";
import TopPerformers from "../components/dashboard/TopPerformers";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import {
  getDashboardStats,
  getHotLeads,
  getTopPerformers,
} from "../services/dashboard";

import type {
  DashboardStats,
  Lead,
  Performer,
} from "../types/dashboard";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [hotLeads, setHotLeads] =
    useState<Lead[]>([]);

  const [performers, setPerformers] =
    useState<Performer[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        statsRes,
        hotRes,
        performerRes,
      ] = await Promise.all([
        getDashboardStats(),
        getHotLeads(),
        getTopPerformers(),
      ]);

      setStats(statsRes.data);

      setHotLeads(hotRes.data.hotLeads);

      setPerformers(performerRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 ml-72">

        <Navbar />

        <div className="p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <div className="flex items-center gap-3">

                <Sun
                  className="text-yellow-500"
                  size={32}
                />

                <h1 className="text-4xl font-bold text-slate-800">

                  Good Morning, Admin

                </h1>

              </div>

              <p className="text-gray-500 mt-3">

                Here's what's happening in your CRM today.

              </p>

            </div>

          </div>

          <QuickActions />

       <div className="mt-8">
  {loading ? (
    <DashboardSkeleton />
  ) : (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Leads"
          value={stats?.totalLeads ?? 0}
          icon={<Users size={28} />}
          color="bg-blue-600"
          trend="+12% this month"
        />

        <DashboardCard
          title="Won Deals"
          value={stats?.won ?? 0}
          icon={<Trophy size={28} />}
          color="bg-green-600"
          trend="+5%"
        />

        <DashboardCard
          title="Team Members"
          value={stats?.activeMembers ?? 0}
          icon={<Target size={28} />}
          color="bg-orange-600"
          trend="Active"
        />

        <DashboardCard
          title="Conversion Rate"
          value={
            stats
              ? `${stats.conversionRate.toFixed(1)}%`
              : "0%"
          }
          icon={<TrendingUp size={28} />}
          color="bg-purple-600"
          trend="+2.1%"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <HotLeadsTable leads={hotLeads} />
        <TopPerformers performers={performers} />
      </div>
    </>
  )}
</div>
        </div>
      </main>
    </div>
  );
}