import { Flame } from "lucide-react";
import type { Lead } from "../../types/dashboard";

interface Props {
  leads: Lead[];
}

const priorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-green-100 text-green-700";
  }
};

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-blue-100 text-blue-700";
    case "qualified":
      return "bg-green-100 text-green-700";
    case "proposal":
      return "bg-purple-100 text-purple-700";
    case "won":
      return "bg-emerald-100 text-emerald-700";
    case "lost":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function HotLeadsTable({ leads }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="bg-red-100 p-3 rounded-xl">

            <Flame className="text-red-600" />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Hot Leads

            </h2>

            <p className="text-sm text-gray-500">

              High priority opportunities

            </p>

          </div>

        </div>

        <span className="text-sm text-gray-500">

          {leads.length} Leads

        </span>

      </div>

      {leads.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No Hot Leads

        </div>

      ) : (

        <div className="space-y-4">

          {leads.map((lead) => (

            <div
              key={lead.id}
              className="border rounded-xl p-4 hover:bg-slate-50 transition"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold">

                    {lead.company}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {lead.status}

                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
                    lead.priority
                  )}`}
                >
                  {lead.priority}
                </span>

              </div>

              <div className="mt-3">

                <span
                  className={`px-2 py-1 rounded-full text-xs ${statusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}