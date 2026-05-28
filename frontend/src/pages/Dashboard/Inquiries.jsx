import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Mail,
  Building2,
  User,
  Phone,
  X,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Sparkles,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Inquiries() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const normalizeStatus = (value) => String(value || "pending").toLowerCase();

  async function load() {
    try {
      const filtered = await API.get("/admin/inquiries", {
        params: { search, status },
      });

      setItems(filtered.data.data || filtered.data.rows || []);

      const all = await API.get("/admin/inquiries");
      setAllItems(all.data.data || all.data.rows || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    load();
  }, [search, status]);

  async function deleteInquiry(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/inquiries/${id}`);
      setSelected(null);
      load();
      alert("Inquiry deleted successfully");
    } catch (err) {
      console.log("Delete inquiry error:", err);
      alert("Failed to delete inquiry");
    }
  }

  async function updateStatus(id, value) {
    try {
      await API.put(`/admin/inquiries/${id}`, {
        status: value,
      });

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: value } : item))
      );

      setAllItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: value } : item))
      );
    } catch (err) {
      console.log("Update status error:", err);
      alert("Status update failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)]">
        <div className="absolute right-[-130px] top-[-110px] w-[380px] h-[260px] rounded-full bg-white/10 blur-[90px]" />
        <div className="absolute left-[15%] bottom-[-140px] w-[360px] h-[220px] rounded-full bg-[#e2ac39]/10 blur-[90px]" />

        <div className="relative px-4 sm:px-6 py-5">
          <div className="max-w-[1250px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="w-[42px] h-[42px] rounded-[14px] bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#071d4f] transition-all duration-300"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <h1 className="text-white text-[24px] sm:text-[26px] font-bold leading-none">
                  Inquiries
                </h1>
                <p className="text-white/70 text-[13px] mt-2">
                  View, filter, resolve and delete user inquiries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
              <button
                onClick={() => setStatus("")}
                className="h-[46px] px-4 rounded-[14px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-black flex items-center justify-center gap-2"
              >
                Total
                <span className="min-w-[24px] h-[24px] rounded-full bg-[#071d4f] text-white text-[11px] flex items-center justify-center px-2">
                  {allItems.length}
                </span>
              </button>

              <button
                onClick={() => setStatus("pending")}
                className="h-[46px] px-4 rounded-[14px] bg-white/10 border border-white/15 text-white text-[12px] font-black flex items-center justify-center gap-2 hover:bg-white hover:text-[#071d4f] transition-all"
              >
                Pending
                <span className="min-w-[24px] h-[24px] rounded-full bg-[#ff4d4d] text-white text-[11px] flex items-center justify-center px-2">
                  {
                    allItems.filter(
                      (x) => normalizeStatus(x.status) === "pending"
                    ).length
                  }
                </span>
              </button>

              <button
                onClick={() => setStatus("resolved")}
                className="h-[46px] px-4 rounded-[14px] bg-white/10 border border-white/15 text-white text-[12px] font-black flex items-center justify-center gap-2 hover:bg-white hover:text-[#071d4f] transition-all"
              >
                Resolved
                <span className="min-w-[24px] h-[24px] rounded-full bg-[#43aa37] text-white text-[11px] flex items-center justify-center px-2">
                  {
                    allItems.filter(
                      (x) => normalizeStatus(x.status) === "resolved"
                    ).length
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7">
        <div className="bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-[#071d4f] text-[16px] font-black uppercase">
                Inquiry Records
              </h2>
              <p className="text-[#6b7890] text-[12px] mt-1">
                Search, view and manage all inquiry submissions.
              </p>
            </div>

            <div className="grid sm:grid-cols-[1fr_180px] gap-3 w-full lg:w-[560px]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-[15px] text-[#0875c9]"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search inquiries..."
                  className="h-[48px] pl-11 pr-4 rounded-[14px] border border-[#d7dce5] w-full outline-none text-[#071d4f] text-[13px] focus:border-[#e2ac39] focus:ring-4 focus:ring-[#e2ac39]/15 transition"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-4 top-[16px] text-[#0875c9]"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-[48px] pl-10 pr-4 rounded-[14px] border border-[#d7dce5] w-full outline-none text-[#071d4f] text-[13px] focus:border-[#e2ac39] focus:ring-4 focus:ring-[#e2ac39]/15 transition"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="bg-[#f8fafd]">
                <tr>
                  <th className="th">User</th>
                  <th className="th">Subject</th>
                  <th className="th">Purpose / Tier</th>
                  <th className="th">Status</th>
                  <th className="th text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef2f7]">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="td text-center">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  items.map((row) => (
                    <tr key={row.id} className="hover:bg-[#fbfcfe]">
                      <td className="td">
                        <div className="flex items-start gap-3">
                          <div className="w-[42px] h-[42px] rounded-[14px] bg-[#eef6ff] text-[#0875c9] flex items-center justify-center shrink-0">
                            <User size={18} />
                          </div>

                          <div>
                            <p className="font-bold text-[#071d4f]">
                              {row.name}
                            </p>
                            <p className="text-[#6b7890] text-[12px] mt-1">
                              {row.email}
                            </p>
                            {row.phone && (
                              <p className="text-[#6b7890] text-[12px] mt-1">
                                {row.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="td">
                        <p className="text-[#071d4f] text-[13px] font-bold">
                          {row.subject || "General Inquiry"}
                        </p>
                        <p className="text-[#6b7890] text-[12px] mt-1 line-clamp-1 max-w-[280px]">
                          {row.message || row.aboutDetails || "-"}
                        </p>
                      </td>

                      <td className="td">
                        <p className="text-[#071d4f] text-[13px] font-bold">
                          {row.purpose || "-"}
                        </p>
                        <p className="text-[#e2ac39] text-[12px] font-bold mt-1">
                          {row.tier || "-"}
                        </p>
                      </td>

                      <td className="td">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              row.id,
                              normalizeStatus(row.status) === "pending"
                                ? "resolved"
                                : "pending"
                            )
                          }
                          className={`h-[36px] px-4 rounded-full font-black text-[11px] uppercase flex items-center gap-2 transition-all duration-300 ${
                            normalizeStatus(row.status) === "resolved"
                              ? "bg-green-50 text-green-700"
                              : "bg-[#fff4dd] text-[#c8932a]"
                          }`}
                        >
                          {normalizeStatus(row.status) === "resolved" ? (
                            <CheckCircle2 size={15} />
                          ) : (
                            <Clock3 size={15} />
                          )}
                          {row.status || "pending"}
                        </button>
                      </td>

                      <td className="td">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(row)}
                            className="h-[36px] px-3 rounded-[10px] bg-blue-50 text-blue-600 text-[12px] font-bold flex items-center gap-1"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteInquiry(row.id)}
                            className="h-[36px] px-3 rounded-[10px] bg-red-50 text-red-600 text-[12px] font-bold flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-[999]">
          <div
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-[#071d4f]/55 backdrop-blur-sm"
          />

          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="w-full max-w-[760px] bg-white rounded-[26px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.24)]">
              <div className="px-5 sm:px-6 py-5 bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)] flex items-center justify-between">
                <div>
                  <h2 className="text-white text-[22px] font-black">
                    Inquiry Details
                  </h2>
                  <p className="text-white/70 text-[13px] mt-1">
                    Review and manage inquiry information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-[38px] h-[38px] rounded-[12px] bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#071d4f] transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Info icon={User} label="Name" value={selected.name} />
                  <Info icon={Mail} label="Email" value={selected.email} />
                  <Info
                    icon={Phone}
                    label="Phone"
                    value={selected.phone || "-"}
                  />
                  <Info
                    icon={Building2}
                    label="Institution"
                    value={selected.institution || "-"}
                  />
                  <Info
                    icon={MessageSquareText}
                    label="Subject"
                    value={selected.subject || "-"}
                  />
                  <Info
                    icon={Clock3}
                    label="Status"
                    value={selected.status || "pending"}
                  />
                </div>

                <div className="mt-5 rounded-[16px] bg-[#f8fafd] border border-[#edf1f6] p-5">
                  <p className="text-[#071d4f] text-[12px] font-black uppercase mb-2">
                    Message
                  </p>
                  <p className="text-[#334968] text-[14px] leading-[1.7]">
                    {selected.message || selected.aboutDetails || "-"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-7">
                  <button
                    type="button"
                    onClick={async () => {
                      const newStatus =
                        normalizeStatus(selected.status) === "resolved"
                          ? "pending"
                          : "resolved";

                      await updateStatus(selected.id, newStatus);

                      setSelected((prev) => ({
                        ...prev,
                        status: newStatus,
                      }));
                    }}
                    className={`h-[44px] px-6 rounded-[12px] font-black text-[13px] flex items-center justify-center gap-2 transition-all duration-300 ${
                      normalizeStatus(selected.status) === "resolved"
                        ? "bg-[#fff4dd] text-[#c8932a]"
                        : "bg-[#43aa37] text-white"
                    }`}
                  >
                    {normalizeStatus(selected.status) === "resolved" ? (
                      <>
                        <Clock3 size={18} />
                        Mark Pending
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Mark Resolved
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteInquiry(selected.id)}
                    className="h-[44px] px-6 rounded-[12px] bg-red-50 text-red-600 font-black text-[13px] flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .th {
          padding: 14px 20px;
          font-size: 11px;
          text-transform: uppercase;
          color: #6b7890;
          font-weight: 900;
        }

        .td {
          padding: 16px 20px;
          font-size: 13px;
          color: #071d4f;
          vertical-align: top;
        }
      `}</style>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[14px] border border-[#edf1f6] bg-white p-4 flex gap-3">
      <div className="w-[38px] h-[38px] rounded-[12px] bg-[#fff4dd] text-[#c8932a] flex items-center justify-center shrink-0">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-[#6b7890] text-[11px] font-black uppercase">
          {label}
        </p>
        <p className="text-[#071d4f] text-[13px] font-bold mt-1 break-all">
          {value}
        </p>
      </div>
    </div>
  );
}