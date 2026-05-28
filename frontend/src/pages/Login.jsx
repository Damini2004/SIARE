import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "admin@siare.org",
    password: "Admin@1234",
  });

  const handleChange = (e) => {
    setError("");

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await API.post("/admin/login", {
        email: form.email,
        password: form.password,
      });

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center px-4">
      <div className="w-full max-w-[390px]">
        <div className="bg-white rounded-[22px] shadow-[0_18px_45px_rgba(7,29,79,0.10)] border border-[#e7edf5] overflow-hidden">
          <div className="bg-[#071d4f] px-7 pt-7 pb-6 text-center relative overflow-hidden">
            <div className="absolute -top-14 -right-14 w-[150px] h-[100px] rounded-full bg-[#0875c9]/25 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-[150px] h-[100px] rounded-full bg-[#e2ac39]/20 blur-2xl" />

           <div className="relative flex items-center  gap-10">

  {/* ICON */}

  <div
    className="
    w-[56px]
    h-[56px]
    rounded-full
    bg-white/10
    border
    border-white/15
    flex
    items-center
    justify-center
    shrink-0
    "
  >
    <ShieldCheck
      size={28}
      className="text-[#e2ac39]"
    />
  </div>

  {/* TEXT */}

  <div className="text-left">

    <h1
      className="
      text-white
      text-[22px]
      font-extrabold
      leading-[1.1]
      "
    >
      SIARE Admin
    </h1>

    <p
      className="
      text-white/70
      text-[12px]
      mt-1
      "
    >
      Secure access to dashboard
    </p>

  </div>

</div>

           
            <div className="relative flex mt-1 mx-auto  overflow-hidden rounded-full w-fit">
              <span className="h-[3px] w-[28px] bg-[#43aa37]" />
              <span className="h-[3px] w-[28px] bg-[#f6a313]" />
              <span className="h-[3px] w-[28px] bg-[#ff352e]" />
              <span className="h-[3px] w-[28px] bg-[#0875c9]" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="px-7 py-7">
            {error && (
              <div className="mb-4 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="text-[#425878] text-[11px] font-extrabold tracking-[1px] uppercase">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={17}
                  className="absolute left-4 top-[15px] text-[#9ca8bb]"
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-[48px] rounded-[12px] border border-[#d7dce5] bg-[#fbfbfb] pl-[46px] pr-4 text-[14px] text-[#071d4f] outline-none transition-all duration-300 focus:border-[#e2ac39] focus:bg-white focus:ring-4 focus:ring-[#e2ac39]/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[#425878] text-[11px] font-extrabold tracking-[1px] uppercase">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={17}
                  className="absolute left-4 top-[15px] text-[#9ca8bb]"
                />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full h-[48px] rounded-[12px] border border-[#d7dce5] bg-[#fbfbfb] pl-[46px] pr-4 text-[14px] text-[#071d4f] outline-none transition-all duration-300 focus:border-[#e2ac39] focus:bg-white focus:ring-4 focus:ring-[#e2ac39]/15"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="mt-6 w-full h-[48px] rounded-[12px] bg-[#071d4f] text-[#e2ac39] font-bold text-[15px] shadow-[0_10px_24px_rgba(7,29,79,0.22)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#0c275f] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full mt-5 text-[#6b7890] text-[13px] font-medium hover:text-[#071d4f] transition"
            >
              ← Back to Public Site
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
