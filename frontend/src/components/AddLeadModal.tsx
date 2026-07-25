import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { createLead, type LeadPayload } from "../services/lead";

interface AddLeadModalProps {
  isOpen: boolean;
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

export default function AddLeadModal({
  isOpen,
  onClose,
  onSuccess,
}: AddLeadModalProps) {
  const [form, setForm] = useState<LeadPayload>(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

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
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const payload = {
      ...form,
      next_follow_up: form.next_follow_up
        ? new Date(form.next_follow_up).toISOString()
        : "",
    };

    await createLead(payload);

    toast.success("Lead created successfully");

    onSuccess();
    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Failed to create lead");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Add Lead
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm font-medium">
                Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Company
              </label>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Source
              </label>

              <input
                name="source"
                value={form.source}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Website"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
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
              <label className="block mb-2 text-sm font-medium">
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
              <label className="block mb-2 text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Expected Revenue
              </label>

              <input
                type="number"
                name="expected_revenue"
                value={form.expected_revenue}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Next Follow Up
              </label>

              <input
                type="date"
                name="next_follow_up"
                value={form.next_follow_up}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}