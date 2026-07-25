import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await login({
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 flex items-center justify-center px-6">

      <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center bg-blue-700 text-white p-14">

          <Building2 size={70} />

          <h1 className="text-5xl font-bold mt-8">
            LeadFlow CRM
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Manage your leads, customers and sales pipeline with a
            beautiful CRM dashboard.
          </p>

          <div className="mt-10 space-y-4 text-blue-100">

            <div>✔ Lead Management</div>

            <div>✔ Sales Tracking</div>

            <div>✔ Activity Timeline</div>

            <div>✔ Analytics Dashboard</div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to your account
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-3 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="admin@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    className="absolute left-4 top-3 text-gray-400"
                    size={20}
                  />

                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >

                <LogIn size={20} />

                {loading ? "Signing In..." : "Login"}

              </button>

            </form>

            <div className="mt-8 rounded-xl bg-slate-100 p-4">

              <h3 className="font-semibold text-gray-700">
                Demo Credentials
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Email: admin@test.com
              </p>

              <p className="text-sm text-gray-600">
                Password: password
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}