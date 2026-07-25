import {
  Plus,
  Users,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Lead",
      icon: <Plus size={22} />,
      color: "bg-blue-600",
      action: () => navigate("/leads"),
    },
    {
      title: "Reports",
      icon: <BarChart3 size={22} />,
      color: "bg-purple-600",
      action: () => navigate("/reports"),
    },
    {
      title: "Users",
      icon: <Users size={22} />,
      color: "bg-green-600",
      action: () => navigate("/users"),
    },
    {
      title: "Tasks",
      icon: <ClipboardList size={22} />,
      color: "bg-orange-600",
      action: () => navigate("/tasks"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      {actions.map((item) => (

        <button
          key={item.title}
          onClick={item.action}
          className="rounded-2xl bg-white p-6 shadow hover:shadow-xl transition hover:-translate-y-1"
        >

          <div
            className={`inline-flex rounded-xl p-4 text-white ${item.color}`}
          >
            {item.icon}
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            {item.title}
          </h3>

        </button>

      ))}

    </div>
  );
}