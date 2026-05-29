import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAdminMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../../api/memberApi";
import API from "../../api/axios";

const emptyForm = {
  memberCode: "",
  name: "",
  designation: "",
  email: "",
  department: "",
  phone: "",
  imageUrl: "",
  scopus: "",
  orcid: "",
};

export default function MembersAdmin() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const res = await getAdminMembers({ limit: 100 });
      setMembers(res?.data || []);
    } catch (error) {
      console.log("Members fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
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
const openHonoraryForm = () => {
  setForm({
    ...emptyForm,
    tier: "Honorary Member",
    isHonorary: true,
  });

  setEditingId(null);
  setOpenForm(true);
};
  const handleEdit = (member) => {
    setEditingId(member.id);

 setForm({
  memberCode: member.memberCode || "",
  name: member.name || "",
  designation: member.designation || "",
  email: member.email || "",
  department: member.department || "",
  phone: member.phone || "",
  imageUrl: member.imageUrl || "",
  scopus: member.scopus || "",
  orcid: member.orcid || "",
});

    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 const payload = {
  memberCode: form.memberCode,
  name: form.name,
  designation: form.designation,
  email: form.email,
  department: form.department,
  phone: form.phone,
  imageUrl: form.imageUrl,
  scopus: form.scopus,
  orcid: form.orcid,
};

    try {
      setSaving(true);

      if (editingId) {
        await updateMember(editingId, payload);
        alert("Member updated successfully");
      } else {
        await createMember(payload);
        alert("Member created successfully");
      }

      await loadMembers();
      resetForm();
    } catch (error) {
      console.log("Save member error:", error);
      alert(error?.response?.data?.error || "Failed to save member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await deleteMember(id);
      alert("Member deleted");
      await loadMembers();
    } catch (error) {
      console.log("Delete member error:", error);
      alert("Failed to delete member");
    }
  };
  const getImageSrc = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;

  const baseURL =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  return `${baseURL}${url}`;
};

const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/admin/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const uploadedUrl =
      res.data.url ||
      res.data.fileUrl ||
      res.data.path ||
      res.data.filename ||
      "";

    handleChange("imageUrl", uploadedUrl);
  } catch (error) {
    console.log("Image upload error:", error);
    alert("Image upload failed");
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
                  Members
                </h1>
                <p className="text-white/70 text-[13px] mt-2">
                  Manage member records, tiers and status.
                </p>
              </div>
            </div>

           <div className="flex flex-wrap gap-3">
  <button
    onClick={openCreateForm}
    className="h-[46px] px-5 rounded-[14px] bg-[#e2ac39] text-[#071d4f] text-[13px] font-black flex items-center justify-center gap-2 shadow-[0_14px_34px_rgba(226,172,57,0.25)] hover:bg-white transition-all duration-300"
  >
    <Plus size={17} />
    Add Member
  </button>

 
</div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7">
        <div className="bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
            <div>
              <h2 className="text-[#071d4f] text-[16px] font-black uppercase">
                Members List
              </h2>
              <p className="text-[#6b7890] text-[12px] mt-1">
                Create, edit and delete members.
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
                  <th className="th">Member</th>
                  <th className="th">Contact</th>
                  <th className="th">Designation</th>
                  <th className="th">Institution</th>
                  
                  <th className="th">Action</th>
                
                </tr>
              </thead>  

              <tbody className="divide-y divide-[#eef2f7]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="td text-center">
                      Loading members...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="td text-center">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="hover:bg-[#fbfcfe]">
                      <td className="td">
                        <div className="flex items-center gap-3">
  <div className="w-[46px] h-[46px] rounded-full overflow-hidden bg-[#eef6ff] flex items-center justify-center shrink-0">
    {member.imageUrl ? (
      <img
        src={getImageSrc(member.imageUrl)}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <Users size={20} className="text-[#0875c9]" />
    )}
  </div>

  <div>
    <p className="font-bold text-[#071d4f]">{member.name}</p>
   
  </div>
</div>
                      
                      </td>

                      <td className="td">
                        <p className="flex items-center gap-2">
                          <Mail size={14} className="text-[#e2ac39]" />
                          {member.email}
                        </p>
                       
                      </td>

                      <td className="td">
                        <span className="flex items-center gap-2">
                          <Building2 size={14} className="text-[#0875c9]" />
                          {member.designation || "-"}
                        </span>
                      </td>

                      <td className="td font-bold text-[#071d4f]">
                        {member.department || "-"}
                      </td>

                  

                      <td className="td">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(member)}
                            className="h-[36px] px-3 rounded-[10px] bg-blue-50 text-blue-600 text-[12px] font-bold flex items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(member.id)}
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
 {openForm && (
  <div className="fixed inset-0 z-[999] overflow-y-auto">
    <div
      onClick={resetForm}
      className="fixed inset-0 bg-[#071d4f]/55 backdrop-blur-sm"
    />

    <div className="relative min-h-full flex items-start justify-center px-4 py-6 sm:py-10">
      <div className="relative w-full max-w-[820px] bg-white rounded-[26px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.24)]">
        <div className="sticky top-0 z-10 px-5 sm:px-6 py-5 bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)] flex items-center justify-between">
          <div>
            <h2 className="text-white text-[22px] font-black">
              {editingId ? "Edit Member" : "Create Member"}
            </h2>
            <p className="text-white/70 text-[13px] mt-1">
              Enter complete member details.
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
          className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-210px)] overflow-y-auto"
        >
          <Field label="Member Code *">
            <input
              value={form.memberCode}
              onChange={(e) => handleChange("memberCode", e.target.value)}
              
              placeholder="SIARE03"
              className="input"
            />
          </Field>

          <Field label="Member Name *">
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              placeholder="enter your name"
              className="input"
            />
          </Field>

          <Field label="Email *">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              placeholder="example@gmail.com"
              className="input"
            />
          </Field>

          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="enter your mobile number"
              className="input"
            />
          </Field>

          <Field label="Designation *">
            <input
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              required
              placeholder="enter your designation"
              className="input"
            />
          </Field>

          <Field label="Department *">
            <input
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
              required
              placeholder="enter your Department"
              className="input"
            />
          </Field>

         

         

          <Field label="Scopus">
  <input
    value={form.scopus}
    onChange={(e) => handleChange("scopus", e.target.value)}
    placeholder="Scopus ID / Profile URL"
    className="input"
  />
</Field>

<Field label="ORCID">
  <input
    value={form.orcid}
    onChange={(e) => handleChange("orcid", e.target.value)}
    placeholder="ORCID ID"
    className="input"
  />
</Field>

        

    <Field label="Member Image URL">
  <input
    value={form.imageUrl}
    onChange={(e) => handleChange("imageUrl", e.target.value)}
    placeholder="https://example.com/member.jpg or /uploads/member.png"
    className="input"
  />
</Field>

<div className="md:col-span-2">
  <Field label="Upload Image From Browser">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="block w-full text-[13px] text-[#071d4f]
        file:mr-4 file:h-[38px] file:px-4 file:rounded-[10px]
        file:border-0 file:bg-[#071d4f] file:text-white
        file:font-bold file:cursor-pointer"
    />
  </Field>
</div>

         

       

          {form.imageUrl && (
            <div className="md:col-span-2 rounded-[16px] border border-[#dfe7f1] bg-[#f8fafd] p-4">
              <p className="text-[#071d4f] text-[12px] font-black uppercase mb-3">
                Image Preview
              </p>

              <img
               src={getImageSrc(form.imageUrl)}
                alt="Member Preview"
                className="w-[100px] h-[100px] rounded-full object-cover border border-[#dfe7f1] bg-white"
              />

              <p className="mt-2 text-[11px] text-[#6b7890] break-all">
                {form.imageUrl}
              </p>
            </div>
          )}

          <div className="md:col-span-2 bottom-0 bg-white pt-4 pb-1 flex flex-wrap justify-end gap-3 border-t border-[#eef2f7]">
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
                ? "Update Member"
                : "Create Member"}
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