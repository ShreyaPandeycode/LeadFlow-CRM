import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  increase?: boolean;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
  trend,
  increase = true,
}: DashboardCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      <div
        className={`absolute top-0 left-0 h-1 w-full ${color}`}
      />

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>

          {trend && (
            <div className="mt-4 flex items-center gap-2">

              {increase ? (
                <TrendingUp
                  size={18}
                  className="text-green-600"
                />
              ) : (
                <TrendingDown
                  size={18}
                  className="text-red-600"
                />
              )}

              <span
                className={`text-sm font-semibold ${
                  increase
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {trend}
              </span>

            </div>
          )}

        </div>

        <div
          className={`rounded-2xl p-4 text-white shadow-lg ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}