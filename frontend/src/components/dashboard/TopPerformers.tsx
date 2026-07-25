import { Trophy } from "lucide-react";
import type { Performer } from "../../types/dashboard";

interface Props {
  performers: Performer[];
}

const userNames: Record<number, string> = {
  1: "Admin",
  2: "Admin",
  3: "Rahul Sharma",
  4: "Priya Verma",
  5: "Aman Singh",
  6: "Neha Gupta",
  7: "Arjun Mehta",
};

const medals = ["🥇", "🥈", "🥉", "🏅", "🏅"];

export default function TopPerformers({
  performers,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-yellow-100 p-3 rounded-xl">

          <Trophy className="text-yellow-600" />

        </div>

        <div>

          <h2 className="text-xl font-bold">

            Top Performers

          </h2>

          <p className="text-sm text-gray-500">

            Best performing team members

          </p>

        </div>

      </div>

      {performers.map((person, index) => (

        <div
          key={index}
          className="flex justify-between items-center py-4 border-b last:border-0"
        >

          <div className="flex items-center gap-4">

            <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

              {userNames[person.assignedTo]
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <h3 className="font-semibold">

                {medals[index]}{" "}
                {userNames[person.assignedTo]}

              </h3>

              <p className="text-sm text-gray-500">

                Sales Executive

              </p>

            </div>

          </div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

            {person.totalLeads}

          </span>

        </div>

      ))}

    </div>
  );
}