import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  ImagePlus,
  Link as LinkIcon,
  Loader2,
  MapPin,
  Mic2,
  Send,
  Sparkles,
  User,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

import {
  createEvent,
  getAdminEvents,
  updateEvent,
  deleteEvent,
} from "../../api/eventApi";

const emptyForm = {
  type: "",
  title: "",
  description: "",
  speaker: "",
  instructor: "",
  date: "",
  time: "",
  location: "",
  link: "",
  imageUrl: "",
  isFeatured: false,
};

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isEditing = Boolean(editingId);

  async function loadEvents() {
    try {
      setLoadingEvents(true);
      const res = await getAdminEvents({ limit: 100 });
      setEvents(res?.data || []);
    } catch (error) {
      console.log("Events fetch error:", error);
    } finally {
      setLoadingEvents(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

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

  const handleEdit = (event) => {
    setEditingId(event.id);

    setForm({
      type: event.type || "",
      title: event.title || "",
      description: event.description || "",
      speaker: event.speaker || "",
      instructor: event.instructor || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      link: event.link || "",
      imageUrl: event.imageUrl || "",
      isFeatured: Boolean(event.isFeatured),
    });

    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      alert("Event deleted successfully");
      await loadEvents();
    } catch (error) {
      console.log("Delete event error:", error);
      alert(error?.response?.data?.error || "Failed to delete event");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

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

      setForm((prev) => ({
        ...prev,
        imageUrl: uploadedUrl,
      }));

      alert("Image uploaded successfully");
    } catch (error) {
      console.log("Image upload error:", error);
      alert(error?.response?.data?.error || "Image upload failed");
    } finally {
      setUploading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        status: "published",
        color:
          form.type === "conference"
            ? "bg-[#43aa37]"
            : form.type === "webinar"
              ? "bg-[#0875c9]"
              : "bg-[#ff352e]",
      };

      if (isEditing) {
        await updateEvent(editingId, payload);
      } else {
        await createEvent(payload);
      }

      alert(isEditing ? "Event Updated Successfully" : "Event Created Successfully");

      await loadEvents();
      resetForm();
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full
    h-[52px]
    rounded-[16px]
    border
    border-[#dfe7f1]
    bg-white
    px-4
    text-[14px]
    text-[#071d4f]
    outline-none
    transition-all
    duration-300
    focus:border-[#e2ac39]
    focus:ring-4
    focus:ring-[#e2ac39]/15
  `;

  const labelClass =
    "mb-2 block text-[12px] font-bold uppercase tracking-wide text-[#071d4f]";

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)]">
        <div className="absolute right-[-120px] top-[-100px] w-[420px] h-[240px] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute left-[10%] bottom-[-130px] w-[360px] h-[220px] rounded-full bg-[#e2ac39]/10 blur-[90px]" />

        <div className="relative px-5 sm:px-8 py-5">
          <div className="max-w-[1220px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="w-[44px] h-[44px] rounded-[14px] bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#071d4f] transition"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <p className="text-[#e2ac39] text-[11px] font-black uppercase tracking-[2px]">
                  ADMIN EVENT MANAGEMENT
                </p>

                <h1 className="text-white text-[26px] sm:text-[32px] font-black">
                  Events Management
                </h1>

                <p className="text-white/70 text-[13px] mt-2">
                  Create, edit and delete conferences, webinars and workshops.
                </p>
              </div>
            </div>

            <button
              onClick={openCreateForm}
              className="h-[46px] px-5 rounded-[14px] bg-[#e2ac39] text-[#071d4f] text-[13px] font-black flex items-center justify-center gap-2 shadow-[0_14px_34px_rgba(226,172,57,0.25)] hover:bg-white transition-all duration-300"
            >
              <Plus size={17} />
              Add Event
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-7">
        <div className="bg-white rounded-[26px] border border-[#e5ebf4] shadow-[0_16px_40px_rgba(7,29,79,0.07)] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
            <div>
              <h2 className="text-[#071d4f] text-[16px] font-black uppercase">
                Events List
              </h2>
              <p className="text-[#6b7890] text-[12px] mt-1">
                Manage all conference, webinar and workshop records.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#f8fafd]">
                <tr>
                  <th className="th">Event</th>
                  <th className="th">Type</th>
                  <th className="th">Date</th>
                  <th className="th">Time</th>
                  <th className="th">Location</th>
                  <th className="th">Featured</th>
                  <th className="th text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef2f7]">
                {loadingEvents ? (
                  <tr>
                    <td colSpan={7} className="td text-center">
                      Loading events...
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="td text-center">
                      No events found.
                    </td>
                  </tr>
                ) : (
                  events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-[#fbfcfe]">
                      <td className="td">
                        <p className="font-bold text-[#071d4f]">{ev.title}</p>
                        <p className="text-[12px] text-[#6b7890] mt-1 line-clamp-1 max-w-[320px]">
                          {ev.description || "-"}
                        </p>
                      </td>

                      <td className="td capitalize font-bold text-[#071d4f]">
                        {ev.type || "-"}
                      </td>

                      <td className="td">{ev.date || "-"}</td>
                      <td className="td">{ev.time || "-"}</td>
                      <td className="td">{ev.location || "-"}</td>

                      <td className="td">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                            ev.isFeatured
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {ev.isFeatured ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="td">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(ev)}
                            className="h-[36px] px-3 rounded-[10px] bg-blue-50 text-blue-600 text-[12px] font-bold flex items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(ev.id)}
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
            <div className="w-full max-w-[1100px] bg-white rounded-[26px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.24)]">
              <div className="px-5 sm:px-6 py-5 bg-[linear-gradient(135deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)] flex items-center justify-between">
                <div>
                  <h2 className="text-white text-[22px] font-black">
                    {isEditing ? "Edit Event" : "Create Event"}
                  </h2>
                  <p className="text-white/70 text-[13px] mt-1">
                    Fill event details below.
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

              <div className="p-5 sm:p-6 grid lg:grid-cols-[1fr_340px] gap-6 max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Event Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select Type</option>
                        <option value="conference">Conference</option>
                        <option value="webinar">Webinar</option>
                        <option value="workshop">Workshop</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Event Title</label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter event title"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Speaker</label>
                      <div className="relative">
                        <Mic2
                          size={16}
                          className="absolute left-4 top-4 text-[#e2ac39]"
                        />
                        <input
                          name="speaker"
                          value={form.speaker}
                          onChange={handleChange}
                          placeholder="Speaker name"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Instructor / Organizer</label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-4 top-4 text-[#43aa37]"
                        />
                        <input
                          name="instructor"
                          value={form.instructor}
                          onChange={handleChange}
                          placeholder="Instructor or committee"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Date</label>
                      <div className="relative">
                        <CalendarDays
                          size={16}
                          className="absolute left-4 top-4 text-[#0875c9]"
                        />
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Time</label>
                      <div className="relative">
                        <Clock
                          size={16}
                          className="absolute left-4 top-4 text-[#ff352e]"
                        />
                        <input
                          type="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Location</label>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-4 top-4 text-[#43aa37]"
                        />
                        <input
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Online / City / Venue"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Registration Link</label>
                      <div className="relative">
                        <LinkIcon
                          size={16}
                          className="absolute left-4 top-4 text-[#e2ac39]"
                        />
                        <input
                          name="link"
                          value={form.link}
                          onChange={handleChange}
                          placeholder="https://..."
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea
                        rows={5}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Write short event description..."
                        className="w-full rounded-[14px] border border-[#d9e3ef] bg-white p-4 text-[14px] text-[#071d4f] outline-none transition-all duration-300 focus:border-[#e2ac39] focus:ring-4 focus:ring-[#e2ac39]/15"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Image URL</label>
                      <div className="relative">
                        <ImagePlus
                          size={16}
                          className="absolute left-4 top-4 text-[#0875c9]"
                        />
                        <input
                          name="imageUrl"
                          value={form.imageUrl}
                          onChange={handleChange}
                          placeholder="Paste image URL or upload system image"
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <div className="mt-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="block w-full text-[13px] text-[#071d4f]
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-[12px] file:font-bold
                            file:bg-[#e2ac39] file:text-[#071d4f]
                            hover:file:bg-[#071d4f] hover:file:text-white
                            disabled:opacity-60"
                        />

                        {uploading && (
                          <p className="text-[12px] text-[#0875c9] font-bold mt-2">
                            Uploading image...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between rounded-[18px] bg-[#f7f9fc] border border-[#e4ebf3] px-5 py-4">
                      <div>
                        <p className="text-[#071d4f] text-[13px] font-bold uppercase">
                          Featured Event
                        </p>
                        <p className="text-[#5a6b85] text-[12px]">
                          Show this event prominently on frontend.
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={form.isFeatured}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#e2ac39]"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="h-[50px] px-7 rounded-full bg-white border border-[#dfe7f1] text-[#071d4f] font-bold uppercase text-[12px] inline-flex items-center gap-2 hover:bg-[#071d4f] hover:text-white transition-all duration-300"
                    >
                      Cancel
                    </button>

                    <button
                      disabled={loading || uploading}
                      className="h-[50px] px-8 rounded-full bg-[linear-gradient(180deg,#f3c04d_0%,#e2ac39_55%,#b9851e_100%)] text-[#071d4f] font-bold uppercase text-[13px] inline-flex items-center gap-3 shadow-[0_12px_26px_rgba(226,172,57,0.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(226,172,57,0.40)] disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={17} />
                      )}

                      {loading
                        ? isEditing
                          ? "Updating Event..."
                          : "Creating Event..."
                        : isEditing
                          ? "Update Event"
                          : form.type === "conference"
                            ? "Create Conference"
                            : form.type === "webinar"
                              ? "Create Webinar"
                              : form.type === "workshop"
                                ? "Create Workshop"
                                : "Create Event"}
                    </button>
                  </div>
                </form>

                <div className="bg-white rounded-[26px] border border-[#e4ebf3] p-5 shadow-[0_16px_40px_rgba(7,29,79,0.07)] h-fit">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-[#e2ac39]" size={20} />
                    <h3 className="text-[#071d4f] text-[16px] font-bold uppercase">
                      Live Preview
                    </h3>
                  </div>

                  <div className="rounded-[20px] overflow-hidden border border-[#e6edf5] shadow-[0_10px_26px_rgba(7,29,79,0.10)]">
                    <div className="h-[190px] bg-[#071d4f] relative overflow-hidden">
                      {form.imageUrl ? (
                        <img
                          src={getImageSrc(form.imageUrl)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/70 text-[12px]">
                          Image Preview
                        </div>
                      )}

                      <div className="absolute top-3 left-3 rounded-full bg-[#e2ac39] text-[#071d4f] px-4 py-2 text-[11px] font-bold uppercase">
                        {form.type || "Event"}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="text-[#071d4f] text-[16px] font-bold leading-tight mb-3">
                        {form.title || "Event title will appear here"}
                      </h4>

                      <p className="text-[#5a6b85] text-[13px] leading-[1.6] mb-4">
                        {form.description || "Short event description preview."}
                      </p>

                      <div className="space-y-2 text-[12px] text-[#071d4f] font-medium">
                        <p>📅 {form.date || "Date"}</p>
                        <p>⏰ {form.time || "Time"}</p>
                        <p>📍 {form.location || "Location"}</p>
                      </div>
                    </div>
                  </div>
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