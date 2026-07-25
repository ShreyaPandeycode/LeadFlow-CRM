import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import LeadTable from "../components/LeadTable";
import AddLeadModal from "../components/AddLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

import {
  type Lead,
  deleteLead,
  getLeads,
} from "../services/lead";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await getLeads(
        page,
        limit,
        search,
        status
      );

      setLeads(res.data);

      setTotal(res.total);
    } catch (err) {
      console.error(err);

      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  const handleDelete = async () => {
    if (!selectedLead) return;

    try {
      setLoading(true);

      await deleteLead(selectedLead.ID);

      toast.success("Lead deleted");

      setShowDelete(false);

      fetchLeads();
    } catch (err) {
      console.error(err);

      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <p className="text-gray-500">
            Manage all CRM leads
          </p>

        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Lead
        </button>

      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow">

        <div className="grid gap-4 md:grid-cols-2">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name, phone, email..."
              className="w-full rounded-lg border py-3 pl-10 pr-4"
            />

          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border p-3"
          >
            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal">
              Proposal
            </option>

            <option value="Won">
              Won
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

        </div>

      </div>

      <LeadTable
        leads={leads}
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        onEdit={(lead) => {
          setSelectedLead(lead);
          setShowEdit(true);
        }}
        onDelete={(lead) => {
          setSelectedLead(lead);
          setShowDelete(true);
        }}
      />
            <AddLeadModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSuccess={fetchLeads}
      />

      <EditLeadModal
        isOpen={showEdit}
        lead={selectedLead}
        onClose={() => {
          setSelectedLead(null);
          setShowEdit(false);
        }}
        onSuccess={fetchLeads}
      />

      <DeleteConfirmationModal
        isOpen={showDelete}
        loading={loading}
        onClose={() => {
          setSelectedLead(null);
          setShowDelete(false);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
}