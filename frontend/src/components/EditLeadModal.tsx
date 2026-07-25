import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  type Lead,
  type LeadPayload,
  updateLead,
} from "../services/lead";

interface EditLeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm: LeadPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "",
  status: "New",
  priority: "Medium",
  assigned_to: 1,
  expected_revenue: 0,
  next_follow_up: "",
};

export default function EditLeadModal({
  isOpen,
  lead,
  onClose,
  onSuccess,
}: EditLeadModalProps) {
  const [form, setForm] =
    useState<LeadPayload>(initialForm);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        assigned_to: lead.assigned_to,
        expected_revenue: Number(
          lead.expected_revenue
        ),
        next_follow_up: lead.next_follow_up
          ? lead.next_follow_up.substring(0, 10)
          : "",
      });
    }
  }, [lead]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "expected_revenue" || name === "assigned_to"
        ? Number(value)
        : value,
  }));
};
  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!form.phone.trim()) {
      toast.error("Phone is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!lead) return;

  if (!validate()) return;

  try {
    setLoading(true);

    const payload = {
      ...form,
      next_follow_up: form.next_follow_up
        ? new Date(form.next_follow_up).toISOString()
        : "",
    };

    await updateLead(lead.ID, payload);

    toast.success("Lead updated successfully");

    onSuccess();
    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update lead");
  } finally {
    setLoading(false);
  }
};
  if (!isOpen || !lead) return null;
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Edit Lead
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Name
              </label>

              <input
                className="w-full rounded-lg border p-3"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Company
              </label>

              <input
                className="w-full rounded-lg border p-3"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                className="w-full rounded-lg border p-3"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                className="w-full rounded-lg border p-3"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Source
              </label>

              <input
                className="w-full rounded-lg border p-3"
                name="source"
                value={form.source}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Assigned To
              </label>

              <select
  name="assigned_to"
  value={form.assigned_to}
  onChange={handleChange}
  className="w-full rounded-lg border p-3"
>
 <option value="1">Admin</option>
<option value="2">Manager</option>
<option value="3">Rahul Sharma</option>
<option value="4">Priya Verma</option>
<option value="5">Aman Singh</option>
<option value="6">Neha Gupta</option>
<option value="7">Arjun Mehta</option>
</select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

             <select
  name="status"
  value={form.status}
  onChange={handleChange}
  className="w-full rounded-lg border p-3"
>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Qualified">Qualified</option>
  <option value="Proposal Sent">Proposal Sent</option>
  <option value="Negotiation">Negotiation</option>
  <option value="Won">Won</option>
  <option value="Lost">Lost</option>
</select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                className="w-full rounded-lg border p-3"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
                        <div>
              <label className="mb-2 block text-sm font-medium">
                Expected Revenue
              </label>

              <input
                type="number"
                className="w-full rounded-lg border p-3"
                name="expected_revenue"
                value={form.expected_revenue}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Next Follow Up
              </label>

              <input
                type="date"
                className="w-full rounded-lg border p-3"
                name="next_follow_up"
                value={form.next_follow_up}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Lead"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}