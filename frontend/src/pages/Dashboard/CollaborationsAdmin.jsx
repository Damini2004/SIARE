import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  ArrowLeft,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getCollaborations,
  createCollaboration,
  updateCollaboration,
  deleteCollaboration,
} from "../../api/collaborationApi";

const emptyForm = {
  name: "",
  country: "",
  logo: "",
  status: "active",
  sortOrder: 0,
};

export default function CollaborationsAdmin() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadCollaborations = async () => {
    try {
      setLoading(true);

      const res = await getCollaborations();

      setItems(res?.data || []);
    } catch (error) {
      console.log("Collaborations fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollaborations();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setOpenForm(false);
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setOpenForm(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name || "",
      country: item.country || "",
      logo: item.logo || "",
      status: item.status || "active",
      sortOrder: item.sortOrder || 0,
    });

    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      country: form.country,
      logo: form.logo,
      status: form.status,
      sortOrder: Number(form.sortOrder),
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateCollaboration(editingId, payload);

        alert("Collaboration updated successfully");
      } else {
        await createCollaboration(payload);

        alert("Collaboration created successfully");
      }

      await loadCollaborations();

      resetForm();
    } catch (error) {
      console.log("Save collaboration error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to save collaboration"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collaboration?")) return;

    try {
      await deleteCollaboration(id);

      alert("Collaboration deleted successfully");

      await loadCollaborations();
    } catch (error) {
      console.log("Delete collaboration error:", error);

      alert("Failed to delete collaboration");
    }
  };

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
                  Collaborations
                </h1>

                <p className="text-white/70 text-[13px] mt-2">
                  Manage collaboration records.
                </p>
              </div>
            </div>

            <button
              onClick={openCreateForm}
              className="h-[46px] px-5 rounded-[14px] bg-[#e2ac39] text-[#071d4f] text-[13px] font-black flex items-center justify-center gap-2 shadow-[0_14px_34px_rgba(226,172,57,0.25)] hover:bg-white transition-all duration-300"
            >
              <Plus size={17} />
              Add Collaboration
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7">
        {/* FORM */}
        {openForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[#071d4f] text-[18px] font-bold">
                  {editingId
                    ? "Edit Collaboration"
                    : "Create Collaboration"}
                </h2>

                <p className="text-[#6b7890] text-[13px] mt-1">
                  Add collaboration details.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-[40px] h-[40px] rounded-[12px] bg-[#f3f6fb] text-[#071d4f] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-[#071d4f] mb-2">
                  Collaboration Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    handleChange("name", e.target.value)
                  }
                  className="w-full h-[48px] rounded-[14px] border border-[#dfe7f1] px-4 outline-none"
                  placeholder="Enter collaboration name"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#071d4f] mb-2">
                  Country
                </label>

                <input
                  type="text"
                  value={form.country}
                  onChange={(e) =>
                    handleChange("country", e.target.value)
                  }
                  className="w-full h-[48px] rounded-[14px] border border-[#dfe7f1] px-4 outline-none"
                  placeholder="Enter country"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#071d4f] mb-2">
                  Logo URL
                </label>

                <input
                  type="text"
                  value={form.logo}
                  onChange={(e) =>
                    handleChange("logo", e.target.value)
                  }
                  className="w-full h-[48px] rounded-[14px] border border-[#dfe7f1] px-4 outline-none"
                  placeholder="Paste logo URL"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#071d4f] mb-2">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value)
                  }
                  className="w-full h-[48px] rounded-[14px] border border-[#dfe7f1] px-4 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#071d4f] mb-2">
                  Sort Order
                </label>

                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    handleChange("sortOrder", e.target.value)
                  }
                  className="w-full h-[48px] rounded-[14px] border border-[#dfe7f1] px-4 outline-none"
                />
              </div>
            </div>

            {form.logo && (
              <div className="mt-6">
                <p className="text-[13px] font-bold text-[#071d4f] mb-3">
                  Logo Preview
                </p>

                <div className="w-[180px] h-[100px] rounded-[18px] border border-[#dfe7f1] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={form.logo}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="mt-7 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="h-[48px] px-6 rounded-[14px] bg-[#071d4f] text-white text-[13px] font-bold flex items-center gap-2"
              >
                <Save size={17} />

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Collaboration"
                  : "Create Collaboration"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="h-[48px] px-6 rounded-[14px] border border-[#dfe7f1] text-[#071d4f] text-[13px] font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
            <div>
              <h2 className="text-[#071d4f] text-[16px] font-black uppercase">
                Collaborations List
              </h2>

              <p className="text-[#6b7890] text-[12px] mt-1">
                Create, edit and delete collaborations.
              </p>
            </div>

            <div className="w-[42px] h-[42px] rounded-[14px] bg-[#eef6ff] text-[#0875c9] flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#f8fafd]">
                <tr>
                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890]">
                    Logo
                  </th>

                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890]">
                    Name
                  </th>

                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890]">
                    Country
                  </th>

                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890]">
                    Order
                  </th>

                  <th className="px-6 py-4 text-[11px] uppercase font-black text-[#6b7890] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef2f7]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-[#6b7890]"
                    >
                      Loading collaborations...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-[#6b7890]"
                    >
                      No collaborations found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fbfcfe]">
                      <td className="px-6 py-4">
                        {item.logo ? (
                          <div className="w-[100px] h-[60px] rounded-[14px] border border-[#eef2f7] bg-white flex items-center justify-center overflow-hidden">
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-6 py-4 text-[#071d4f] font-bold">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-[#071d4f]">
                        {item.country || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                            item.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-[#071d4f] font-semibold">
                        {item.sortOrder}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-[40px] h-[40px] rounded-[12px] bg-blue-50 text-blue-600 flex items-center justify-center"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="w-[40px] h-[40px] rounded-[12px] bg-red-50 text-red-600 flex items-center justify-center"
                          >
                            <Trash2 size={18} />
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
    </main>
  );
}