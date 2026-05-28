import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  ArrowLeft,
  BadgeIndianRupee,
  ListChecks,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getMembershipTiers,
  createMembershipTier,
  updateMembershipTier,
  deleteMembershipTier,
} from "../../api/companyApi";

const emptyForm = {
  name: "",
  icon: "GraduationCap",
  priceINR: "",
  priceUSD: "",
  description: "",
  benefits: [""],
  order: 0,
};

export default function MembershipTiersAdmin() {
  const navigate = useNavigate();

  const [tiers, setTiers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadTiers = async () => {
    try {
      setLoading(true);
      const res = await getMembershipTiers({ limit: 100 });
      setTiers(res?.data || []);
    } catch (error) {
      console.log("Membership tiers fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiers();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBenefitChange = (index, value) => {
    const updated = [...form.benefits];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      benefits: updated,
    }));
  };

  const addBenefit = () => {
    setForm((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }));
  };

  const removeBenefit = (index) => {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
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

  const handleEdit = (tier) => {
    setEditingId(tier.id);

    setForm({
      name: tier.name || "",
      icon: tier.icon || "GraduationCap",
      priceINR: tier.priceINR || "",
      priceUSD: tier.priceUSD || "",
      description: tier.description || "",
      benefits:
        Array.isArray(tier.benefits) && tier.benefits.length
          ? tier.benefits
          : [""],
      order: tier.order || 0,
    });

    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      benefits: form.benefits.filter((b) => b.trim() !== ""),
      order: Number(form.order) || 0,
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateMembershipTier(editingId, payload);
        alert("Membership tier updated successfully");
      } else {
        await createMembershipTier(payload);
        alert("Membership tier created successfully");
      }

      await loadTiers();
      resetForm();
    } catch (error) {
      console.log("Save membership tier error:", error);
      alert(error?.response?.data?.error || "Failed to save membership tier");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this membership tier?")) return;

    try {
      await deleteMembershipTier(id);
      alert("Membership tier deleted");
      await loadTiers();
    } catch (error) {
      console.log("Delete membership tier error:", error);
      alert("Failed to delete membership tier");
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
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
                  Membership Tiers
                </h1>
                <p className="text-white/70 text-[13px] mt-2">
                  Manage membership plans, pricing and benefits.
                </p>
              </div>
            </div>

            <button
              onClick={openCreateForm}
              className="h-[46px] px-5 rounded-[14px] bg-[#e2ac39] text-[#071d4f] text-[13px] font-black flex items-center justify-center gap-2 shadow-[0_14px_34px_rgba(226,172,57,0.25)] hover:bg-white transition-all duration-300"
            >
              <Plus size={17} />
              Add Tier
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7">
        <div className="bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
            <div>
              <h2 className="text-[#071d4f] text-[16px] font-black uppercase">
                Membership Tiers List
              </h2>
              <p className="text-[#6b7890] text-[12px] mt-1">
                Create, edit and delete membership tiers.
              </p>
            </div>

            <div className="w-[42px] h-[42px] rounded-[14px] bg-[#fff7e2] text-[#e2ac39] flex items-center justify-center">
              <BadgeIndianRupee size={20} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#f8fafd]">
                <tr>
                  <th className="th">Tier</th>
                  <th className="th">Price INR</th>
                  <th className="th">Price USD</th>
                  <th className="th">Benefits</th>
                  <th className="th">Order</th>
                  <th className="th text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef2f7]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="td text-center">
                      Loading membership tiers...
                    </td>
                  </tr>
                ) : tiers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="td text-center">
                      No membership tiers found.
                    </td>
                  </tr>
                ) : (
                  tiers.map((tier) => (
                    <tr key={tier.id} className="hover:bg-[#fbfcfe]">
                      <td className="td">
                        <p className="font-bold text-[#071d4f]">{tier.name}</p>
                        <p className="text-[12px] text-[#6b7890] mt-1">
                          {tier.description || "-"}
                        </p>
                      </td>

                      <td className="td font-bold text-[#071d4f]">
                        {tier.priceINR}
                      </td>

                      <td className="td font-bold text-[#071d4f]">
                        {tier.priceUSD}
                      </td>

                      <td className="td">
                        <div className="flex items-start gap-2 text-[#6b7890] text-[12px] max-w-[320px]">
                          <ListChecks size={15} className="text-[#e2ac39] shrink-0 mt-[2px]" />
                          <span>
                            {(tier.benefits || []).slice(0, 4).join(", ") ||
                              "-"}
                          </span>
                        </div>
                      </td>

                      <td className="td">{tier.order ?? 0}</td>

                      <td className="td">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(tier)}
                            className="h-[36px] px-3 rounded-[10px] bg-blue-50 text-blue-600 text-[12px] font-bold flex items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(tier.id)}
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

      {openForm && (
        <div className="fixed inset-0 z-[999]">
          <div
            onClick={resetForm}
            className="absolute inset-0 bg-[#071d4f]/55 backdrop-blur-sm"
          />

          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="w-full max-w-[780px] bg-white rounded-[26px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.24)]">
              <div className="px-5 sm:px-6 py-5 bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)] flex items-center justify-between">
                <div>
                  <h2 className="text-white text-[22px] font-black">
                    {editingId ? "Edit Membership Tier" : "Create Membership Tier"}
                  </h2>
                  <p className="text-white/70 text-[13px] mt-1">
                    Fill membership tier details below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-[38px] h-[38px] rounded-[12px] bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#071d4f] transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto"
              >
                <Field label="Membership Name">
                  <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    placeholder="Student Membership"
                    className="input"
                  />
                </Field>

                <Field label="Icon Name">
                  <select
                    value={form.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                    className="input"
                  >
                    <option value="GraduationCap">GraduationCap</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="Building2">Building2</option>
                    <option value="Users">Users</option>
                    <option value="Award">Award</option>
                  </select>
                </Field>

                <Field label="Indian Price">
                  <input
                    value={form.priceINR}
                    onChange={(e) => handleChange("priceINR", e.target.value)}
                    required
                    placeholder="₹999"
                    className="input"
                  />
                </Field>

                <Field label="International Price">
                  <input
                    value={form.priceUSD}
                    onChange={(e) => handleChange("priceUSD", e.target.value)}
                    required
                    placeholder="$15"
                    className="input"
                  />
                </Field>

                <Field label="Order">
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => handleChange("order", e.target.value)}
                    className="input"
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Description">
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      rows={4}
                      placeholder="Best for students and research scholars."
                      className="input resize-none"
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[#071d4f] text-[13px] font-black uppercase mb-2 block">
                    Benefits
                  </label>

                  <div className="space-y-3">
                    {form.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          value={benefit}
                          onChange={(e) =>
                            handleBenefitChange(index, e.target.value)
                          }
                          placeholder="Certificate Access"
                          className="input"
                        />

                        <button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          className="w-[42px] h-[42px] rounded-[10px] bg-red-50 text-red-600 flex items-center justify-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addBenefit}
                    className="mt-3 h-[38px] px-4 rounded-[10px] bg-[#071d4f] text-white text-[12px] font-bold flex items-center gap-2"
                  >
                    <Plus size={15} />
                    Add Benefit
                  </button>
                </div>

                <div className="md:col-span-2 flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="h-[44px] px-6 rounded-[12px] bg-gray-100 text-[#071d4f] text-[13px] font-black"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="h-[44px] px-6 rounded-[12px] bg-[#e2ac39] text-[#071d4f] text-[13px] font-black flex items-center gap-2 disabled:opacity-60"
                  >
                    <Save size={16} />
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Tier"
                      : "Create Tier"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .input {
          width: 100%;
          height: 42px;
          border: 1px solid #dfe7f1;
          border-radius: 10px;
          padding: 0 12px;
          font-size: 13px;
          color: #071d4f;
          outline: none;
          background: white;
        }

        textarea.input {
          height: auto;
          padding-top: 10px;
        }

        .input:focus {
          border-color: #e2ac39;
          box-shadow: 0 0 0 3px rgba(226, 172, 57, 0.14);
        }

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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[#071d4f] text-[13px] font-black uppercase mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}