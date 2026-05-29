import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PlusCircle, Save, Trash2, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdminConferenceContent,
  updateAdminConferenceContent,
} from "../../api/conferenceApi";
import { uploadFile } from "../../api/uploadApi";

const iconOptions = [
  "CalendarDays",
  "Clock",
  "MapPin",
  "Users",
  "BookOpen",
  "Settings",
  "Building2",
  "Cpu",
  "Laptop",
  "CheckCircle",
  "Mail",
  "Phone",
  "Globe",
  "Share2",
  "ArrowRight",
];

const empty = {
  theme: { title: "", description: "", icon: "BookOpen", color: "#0875c9" },
  registration: {
    title: "",
    date: "",
    description: "",
    fee: "",
    currency: "INR",
    url: "",
  },
  highlight: { title: "" },
  importantDate: { date: "", title: "" },
};

export default function ConferenceAdmin() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminConferenceContent(eventId);
        setEvent(data.event);
        setForm(data.detail);
      } catch (err) {
        alert(err.message);
        navigate("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [eventId, navigate]);

  const title = useMemo(
    () => form?.basic?.title || event?.title || "Conference",
    [event, form],
  );

  function setSection(section, key, value) {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value,
      },
    }));
  }

  function updateArray(section, index, key, value) {
    setForm((prev) => {
      const items = [...(prev[section] || [])];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, [section]: items };
    });
  }

  function addItem(section, template) {
    setForm((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  }

  function removeItem(section, index) {
    setForm((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index),
    }));
  }

 async function handleUpload(section, key, file) {
  if (!file) return;

  try {
    const uploaded = await uploadFile(file);

    const uploadedUrl =
      uploaded?.url ||
      uploaded?.fileUrl ||
      uploaded?.path ||
      uploaded?.filename ||
      "";

    if (!uploadedUrl) {
      alert("Upload completed but no file URL returned");
      return;
    }

    setSection(section, key, uploadedUrl);
  } catch (error) {
    console.log("Upload error:", error);
    alert(error?.response?.data?.error || error.message || "File upload failed");
  }
}

  async function save() {
    try {
      setSaving(true);
      await updateAdminConferenceContent(eventId, form);
      alert("Conference content saved");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center text-[#071d4f] font-bold">
        Loading conference manager...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="sticky top-0 z-20 bg-white border-b border-[#e5ebf4] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="h-[40px] px-4 rounded-[10px] border border-[#dfe7f1] text-[#071d4f] text-[12px] font-bold flex items-center gap-2"
        >
          <ArrowLeft size={15} />
          Dashboard
        </button>

        <div className="text-center">
          <p className="text-[#6b7890] text-[11px] font-bold uppercase">
            Conference CMS
          </p>
          <h1 className="text-[#071d4f] text-[18px] font-black">{title}</h1>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="h-[40px] px-5 rounded-[10px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-black flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? "Saving..." : "Save"}
        </button>
      </header>

      <main className="max-w-[1320px] mx-auto px-5 sm:px-8 py-7 space-y-6">
        <Panel title="1. Conference Basic Information">
          <Grid>
            <Input
              label="Conference Title"
              value={form.basic?.title}
              onChange={(v) => setSection("basic", "title", v)}
              required
            />
            <Input
              label="Conference Slug"
              value={form.basic?.slug}
              onChange={(v) => setSection("basic", "slug", v)}
              required
            />
            {["subtitle", "type", "category", "status"].map((key) => (
              <Input
                key={key}
                label={labelize(key)}
                value={form.basic?.[key]}
                onChange={(v) => setSection("basic", key, v)}
              />
            ))}
            <Textarea
              label="Short Description"
              value={form.basic?.shortDescription}
              onChange={(v) => setSection("basic", "shortDescription", v)}
            />
            <Textarea
              label="Full Description"
              value={form.basic?.fullDescription}
              onChange={(v) => setSection("basic", "fullDescription", v)}
            />
            <Toggle
              label="Featured Conference"
              checked={Boolean(form.basic?.featured)}
              onChange={(v) => setSection("basic", "featured", v)}
            />
          </Grid>
        </Panel>

        <Panel title="2. Hero Section Management">
          <Grid>
            <UploadInput
              label="Hero Background Image"
              value={form.hero?.backgroundImage}
              onChange={(v) => setSection("hero", "backgroundImage", v)}
              onUpload={(file) => handleUpload("hero", "backgroundImage", file)}
            />
            <UploadInput
              label="Conference Image"
              value={form.hero?.conferenceImage}
              onChange={(v) => setSection("hero", "conferenceImage", v)}
              onUpload={(file) => handleUpload("hero", "conferenceImage", file)}
            />
            {[
              "badgeText",
              "date",
              "time",
              "location",
              "eventMode",
              "ctaText",
              "ctaUrl",
              "shareUrl",
            ].map((key) => (
              <Input
                key={key}
                label={labelize(key)}
                value={form.hero?.[key]}
                onChange={(v) => setSection("hero", key, v)}
              />
            ))}
            <UploadInput
              label="Brochure Upload"
              value={form.hero?.brochureUrl}
              onChange={(v) => setSection("hero", "brochureUrl", v)}
              onUpload={(file) => handleUpload("hero", "brochureUrl", file)}
            />
          </Grid>
        </Panel>

        <Panel title="3. Conference Info Bar">
          <Grid>
            {[
              "date",
              "location",
              "eventType",
              "mainSpeaker",
              "organizedBy",
              "status",
            ].map((key) => (
              <Input
                key={key}
                label={labelize(key)}
                value={form.infoBar?.[key]}
                onChange={(v) => setSection("infoBar", key, v)}
              />
            ))}
          </Grid>
        </Panel>

        <Panel title="4. About The Event">
          <Grid>
            <Input
              label="About Title"
              value={form.about?.title}
              onChange={(v) => setSection("about", "title", v)}
            />
            <Textarea
              label="Description"
              value={form.about?.description}
              onChange={(v) => setSection("about", "description", v)}
            />
            {/* <Textarea label="Second Description" value={form.about?.secondDescription} onChange={(v) => setSection("about", "secondDescription", v)} /> */}
          </Grid>
        </Panel>

        <Repeater
          title="5. Conference Themes"
          section="themes"
          rows={form.themes}
          template={empty.theme}
          addItem={addItem}
          removeItem={removeItem}
        >
          {(item, i) => (
            <Grid compact>
              <Input
                label="Theme Title"
                value={item.title}
                onChange={(v) => updateArray("themes", i, "title", v)}
              />
              <Textarea
                label="Theme Description"
                value={item.description}
                onChange={(v) => updateArray("themes", i, "description", v)}
              />
              <IconSelect
                value={item.icon}
                onChange={(v) => updateArray("themes", i, "icon", v)}
              />
              <ColorInput
                value={item.color}
                onChange={(v) => updateArray("themes", i, "color", v)}
              />
            </Grid>
          )}
        </Repeater>

        <Repeater
          title="6. Registration Details"
          section="registrations"
          rows={form.registrations}
          template={empty.registration}
          addItem={addItem}
          removeItem={removeItem}
        >
          {(item, i) => (
            <Grid compact>
              {["title", "date", "description", "fee", "currency", "url"].map(
                (key) => (
                  <Input
                    key={key}
                    label={labelize(key)}
                    value={item[key]}
                    onChange={(v) => updateArray("registrations", i, key, v)}
                  />
                ),
              )}
            </Grid>
          )}
        </Repeater>

        <Repeater
          title="7. Conference Highlights"
          section="highlights"
          rows={form.highlights}
          template={empty.highlight}
          addItem={addItem}
          removeItem={removeItem}
        >
          {(item, i) => (
            <Grid compact>
              <Input
                label="Highlight Title"
                value={item.title}
                onChange={(v) => updateArray("highlights", i, "title", v)}
              />
            </Grid>
          )}
        </Repeater>

        <Panel title="8. Venue Information">
          <Grid>
            <Input
              label="Location"
              value={form.venue?.location}
              onChange={(v) => setSection("venue", "location", v)}
            />

            <Input
              label="Sub Address"
              value={form.venue?.subAddress}
              onChange={(v) => setSection("venue", "subAddress", v)}
            />
          </Grid>
        </Panel>

        <Repeater
          title="9. Important Dates"
          section="importantDates"
          rows={form.importantDates}
          template={empty.importantDate}
          addItem={addItem}
          removeItem={removeItem}
        >
          {(item, i) => (
            <Grid compact>
              <Input
                label="Date"
                value={item.date}
                onChange={(v) => updateArray("importantDates", i, "date", v)}
              />
              <Input
                label="Title"
                value={item.title}
                onChange={(v) => updateArray("importantDates", i, "title", v)}
              />
            </Grid>
          )}
        </Repeater>

        <Panel title="10. Organizer Details">
          <Grid>
            {["email", "phone", "website"].map((key) => (
              <Input
                key={key}
                label={labelize(key)}
                value={form.organizer?.[key]}
                onChange={(v) => setSection("organizer", key, v)}
              />
            ))}
          </Grid>
        </Panel>

        {[
          [
            "11. CTA Section Management",
            "cta",
            [
              "title",
              "description",
              "buttonText",
              "buttonUrl",
              "backgroundImage",
            ],
          ],
          [
            "12. SEO Settings",
            "seo",
            [
              "metaTitle",
              "metaDescription",
              "metaKeywords",
              "openGraphImage",
              "canonicalUrl",
              "socialShareImage",
            ],
          ],
          [
            "13. Social Sharing Settings",
            "socialSharing",
            [
              "facebookUrl",
              "linkedInUrl",
              "twitterUrl",
              "whatsappUrl",
              "customMessage",
            ],
          ],
          [
            "14. Admin Controls",
            "controls",
            ["publishStatus", "visibility", "sortOrder"],
          ],
        ].map(([panelTitle, section, keys]) => (
          <Panel key={section} title={panelTitle}>
            <Grid>
              {keys.map((key) => (
                <Input
                  key={key}
                  label={labelize(key)}
                  value={form[section]?.[key]}
                  onChange={(v) => setSection(section, key, v)}
                />
              ))}

              {section === "controls" && (
                <>
                  <Toggle
                    label="Featured Toggle"
                    checked={Boolean(form.controls?.featured)}
                    onChange={(v) => setSection("controls", "featured", v)}
                  />
                  <Toggle
                    label="Archive Toggle"
                    checked={Boolean(form.controls?.archive)}
                    onChange={(v) => setSection("controls", "archive", v)}
                  />
                </>
              )}
            </Grid>
          </Panel>
        ))}
      </main>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="bg-white border border-[#e5ebf4] rounded-[18px] p-5 shadow-[0_12px_28px_rgba(7,29,79,0.05)]">
      <h2 className="text-[#071d4f] text-[14px] font-black uppercase mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Repeater({
  title,
  section,
  rows = [],
  template,
  addItem,
  removeItem,
  children,
}) {
  return (
    <Panel title={title}>
      <div className="space-y-4">
        {(rows || []).map((item, index) => (
          <div
            key={index}
            className="rounded-[14px] border border-[#e8eef6] bg-[#fbfcfe] p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#6b7890] text-[12px] font-bold uppercase">
                Item {index + 1}
              </p>
              <button
                onClick={() => removeItem(section, index)}
                className="w-[34px] h-[34px] rounded-[10px] bg-red-50 text-red-600 flex items-center justify-center"
              >
                <Trash2 size={15} />
              </button>
            </div>
            {children(item, index)}
          </div>
        ))}

        <button
          onClick={() => addItem(section, template)}
          className="h-[40px] px-4 rounded-[10px] bg-[#071d4f] text-white text-[12px] font-bold flex items-center gap-2"
        >
          <PlusCircle size={15} />
          Add Item
        </button>
      </div>
    </Panel>
  );
}

function Grid({ children, compact = false }) {
  return (
    <div
      className={`grid ${compact ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}
    >
      {children}
    </div>
  );
}

function Input({ label, value = "", onChange, required = false }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]"
      />
    </label>
  );
}

function Textarea({ label, value = "", onChange }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-[#425878] text-[11px] font-black uppercase">
        {label}
      </span>
      <textarea
        rows={4}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-[10px] border border-[#dbe5f0] bg-white p-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]"
      />
    </label>
  );
}

function UploadInput({ label, value = "", onChange, onUpload }) {
  const getFileSrc = (url) => {
    if (!url) return "";
    if (String(url).startsWith("http")) return url;

    const baseURL =
      import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
      "http://localhost:5000";

    return `${baseURL}${url}`;
  };

  const isPdf = String(value).toLowerCase().endsWith(".pdf");

  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">
        {label}
      </span>

      <div className="mt-2 flex gap-2">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or upload file"
          className="w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]"
        />

        <label className="w-[44px] h-[42px] rounded-[10px] bg-[#e2ac39] text-[#071d4f] flex items-center justify-center cursor-pointer">
          <UploadCloud size={17} />

          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </label>
      </div>

      {value && (
        <div className="mt-3">
          {isPdf ? (
            <a
              href={getFileSrc(value)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-bold text-[#0875c9]"
            >
              View uploaded file
            </a>
          ) : (
            <img
              src={getFileSrc(value)}
              alt={label}
              className="w-[160px] h-[90px] object-cover rounded-[10px] border border-[#dbe5f0]"
            />
          )}
        </div>
      )}
    </label>
  );
}

function IconSelect({ value = "BookOpen", onChange }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">
        Lucide Icon
      </span>
      <select
        value={value || "BookOpen"}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f]"
      >
        {iconOptions.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorInput({ value = "#0875c9", onChange }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">
        Color
      </span>
      <input
        type="color"
        value={value || "#0875c9"}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white p-1"
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="h-[42px] mt-5 flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-[#e2ac39]"
      />
      <span className="text-[#071d4f] text-[13px] font-bold">{label}</span>
    </label>
  );
}

// function lines(value) {
//   return String(value || "")
//     .split("\n")
//     .map((x) => x.trim())
//     .filter(Boolean);
// }

function labelize(value) {
  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (x) => x.toUpperCase());
}