import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Lead } from "../services/lead";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-blue-100 text-blue-700";
    case "contacted":
      return "bg-yellow-100 text-yellow-700";
    case "qualified":
      return "bg-green-100 text-green-700";
    case "proposal":
      return "bg-purple-100 text-purple-700";
    case "won":
      return "bg-emerald-100 text-emerald-700";
    case "lost":
      return "bg-red-100 text-red-700";
      case "proposal sent":
    return "bg-purple-100 text-purple-700";

case "negotiation":
    return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const priorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function LeadTable({
  leads,
  loading,
  page,
  limit,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: LeadTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <div className="text-gray-500">Loading leads...</div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-lg font-semibold">No Leads Found</h2>
        <p className="text-gray-500 mt-2">
          There are no leads matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Company</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Phone</th>
              <th className="px-5 py-3 text-left">Source</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Priority</th>
              <th className="px-5 py-3 text-left">Assigned</th>
              <th className="px-5 py-3 text-left">Revenue</th>
              <th className="px-5 py-3 text-left">Follow Up</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.ID}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 font-medium">{lead.name}</td>

                <td className="px-5 py-4">{lead.company}</td>

                <td className="px-5 py-4">{lead.email}</td>

                <td className="px-5 py-4">{lead.phone}</td>

                <td className="px-5 py-4">{lead.source}</td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(
                      lead.priority
                    )}`}
                  >
                    {lead.priority || "N/A"}
                  </span>
                </td>

                <td className="px-5 py-4">{lead.assigned_to}</td>

                <td className="px-5 py-4">
                  ₹{Number(lead.expected_revenue).toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  {lead.next_follow_up &&
!lead.next_follow_up.startsWith("0001")
  ? new Date(
      lead.next_follow_up
    ).toLocaleDateString()
  : "-"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(lead)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t px-6 py-4">
        <div className="text-sm text-gray-600">
          Page <b>{page}</b> of <b>{totalPages}</b>
        </div>

        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}