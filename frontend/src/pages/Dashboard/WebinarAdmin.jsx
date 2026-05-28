import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PlusCircle, Save, Trash2, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminWebinarContent, updateAdminWebinarContent } from "../../api/webinarApi";
import { uploadFile } from "../../api/uploadApi";

const iconOptions = [
  "CalendarDays",
  "Clock",
  "Monitor",
  "Laptop",
  "Users",
  "BookOpen",
  "Scale",
  "FileText",
  "TrendingUp",
  "ClipboardCheck",
  "Mail",
  "Phone",
  "Globe",
  "CheckCircle",
  "Share2",
  "ArrowRight",
];

const empty = {
  topic: { title: "", description: "", icon: "BookOpen", color: "#0d6efd" },
  speaker: { name: "", designation: "", organization: "", image: "", expertise: "", bio: "", linkedInUrl: "", sessionTopic: "" },
  joiningStep: { title: "", description: "", icon: "ClipboardCheck", order: 1 },
  registration: { title: "", startDate: "", endDate: "", fee: "", currency: "INR", benefits: [], url: "" },
  audience: { title: "", description: "", icon: "Users" },
  highlight: { title: "", icon: "CheckCircle" },
  faq: { question: "", answer: "", order: 1 },
};
const defaultForm = {
  basic: {},
  hero: {},
  infoBar: {},
  about: { objective: [], benefits: [] },
  topics: [],
  speakers: [],
  joiningSteps: [],
  registrations: [],
  targetAudience: [],
  highlights: [],
  organizer: { socialLinks: [] },
  platform: {},
  resources: {
    resourcePdfs: [],
    eCertificateConfig: {},
  },
  faqs: [],
  mediaGallery: {
    images: [],
    videos: [],
    enabled: true,
  },
  cta: {},
  seo: {
    structuredData: {},
  },
  socialSharing: {},
  analytics: {},
  controls: {},
};

export default function WebinarAdmin() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminWebinarContent(eventId);
        setEvent(data.event);
        setForm({
  ...defaultForm,
  ...(data.detail || {}),
  basic: { ...defaultForm.basic, ...(data.detail?.basic || {}) },
  hero: { ...defaultForm.hero, ...(data.detail?.hero || {}) },
  infoBar: { ...defaultForm.infoBar, ...(data.detail?.infoBar || {}) },
  about: { ...defaultForm.about, ...(data.detail?.about || {}) },
  organizer: { ...defaultForm.organizer, ...(data.detail?.organizer || {}) },
  platform: { ...defaultForm.platform, ...(data.detail?.platform || {}) },
  resources: { ...defaultForm.resources, ...(data.detail?.resources || {}) },
  mediaGallery: { ...defaultForm.mediaGallery, ...(data.detail?.mediaGallery || {}) },
  cta: { ...defaultForm.cta, ...(data.detail?.cta || {}) },
  seo: { ...defaultForm.seo, ...(data.detail?.seo || {}) },
  topics: Array.isArray(data.detail?.topics) ? data.detail.topics : [],
  speakers: Array.isArray(data.detail?.speakers) ? data.detail.speakers : [],
  joiningSteps: Array.isArray(data.detail?.joiningSteps) ? data.detail.joiningSteps : [],
  registrations: Array.isArray(data.detail?.registrations) ? data.detail.registrations : [],
  targetAudience: Array.isArray(data.detail?.targetAudience) ? data.detail.targetAudience : [],
  highlights: Array.isArray(data.detail?.highlights) ? data.detail.highlights : [],
  faqs: Array.isArray(data.detail?.faqs) ? data.detail.faqs : [],
});
      } catch (err) {
        alert(err.message);
        navigate("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [eventId, navigate]);

  const title = useMemo(() => form?.basic?.title || event?.title || "Webinar", [event, form]);

  function setSection(section, key, value) {
    setForm((prev) => ({ ...prev, [section]: { ...(prev[section] || {}), [key]: value } }));
  }

  function updateArray(section, index, key, value) {
    setForm((prev) => {
      const items = Array.isArray(prev[section]) ? [...prev[section]] : [];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, [section]: items };
    });
  }

  function addItem(section, template) {
    setForm((prev) => ({ ...prev, [section]: [...(Array.isArray(prev[section]) ? prev[section] : []), { ...template }] }));
  }

  function removeItem(section, index) {
    setForm((prev) => ({ ...prev, [section]: (prev[section] || []).filter((_, i) => i !== index) }));
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

    const payload = {
      ...form,

      basic: form.basic || {},
      hero: form.hero || {},
      infoBar: form.infoBar || {},
      about: form.about || {},

      topics: Array.isArray(form.topics)
        ? form.topics
        : [],

      speakers: Array.isArray(form.speakers)
        ? form.speakers
        : [],

      joiningSteps: Array.isArray(form.joiningSteps)
        ? form.joiningSteps
        : [],

      registrations: Array.isArray(form.registrations)
        ? form.registrations
        : [],

      targetAudience: Array.isArray(form.targetAudience)
        ? form.targetAudience
        : [],

      highlights: Array.isArray(form.highlights)
        ? form.highlights
        : [],

      organizer: form.organizer || {},

      platform: form.platform || {},

      resources: form.resources || {
        resourcePdfs: [],
        eCertificateConfig: {},
      },

      faqs: Array.isArray(form.faqs)
        ? form.faqs
        : [],

      mediaGallery: form.mediaGallery || {
        images: [],
        videos: [],
        enabled: true,
      },

      cta: form.cta || {},

      seo: form.seo || {
        structuredData: {},
      },

      socialSharing:
        form.socialSharing || {},

      analytics:
        form.analytics || {},

      controls:
        form.controls || {},
    };

    await updateAdminWebinarContent(
      eventId,
      payload
    );

    alert("Webinar content saved");
  } catch (err) {
    console.log(err);

    alert(
      err?.response?.data?.error ||
      err.message
    );
  } finally {
    setSaving(false);
  }
}

  if (loading || !form) {
    return <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center text-[#071d4f] font-bold">Loading webinar manager...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="sticky top-0 z-20 bg-white border-b border-[#e5ebf4] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <button onClick={() => navigate("/admin/dashboard")} className="h-[40px] px-4 rounded-[10px] border border-[#dfe7f1] text-[#071d4f] text-[12px] font-bold flex items-center gap-2">
          <ArrowLeft size={15} />
          Dashboard
        </button>
        <div className="text-center">
          <p className="text-[#6b7890] text-[11px] font-bold uppercase">Webinar CMS</p>
          <h1 className="text-[#071d4f] text-[18px] font-black">{title}</h1>
        </div>
        <button onClick={save} disabled={saving} className="h-[40px] px-5 rounded-[10px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-black flex items-center gap-2 disabled:opacity-60">
          <Save size={15} />
          {saving ? "Saving..." : "Save"}
        </button>
      </header>

      <main className="max-w-[1320px] mx-auto px-5 sm:px-8 py-7 space-y-6">
        <Panel title="1. Webinar Basic Information">
          <Grid>
            <Input label="Webinar Title" value={form.basic?.title} onChange={(v) => setSection("basic", "title", v)} required />
            <Input label="Webinar Slug" value={form.basic?.slug} onChange={(v) => setSection("basic", "slug", v)} required />
            {["subtitle", "type", "category", "status"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.basic?.[key]} onChange={(v) => setSection("basic", key, v)} />
            ))}
            <Textarea label="Short Description" value={form.basic?.shortDescription} onChange={(v) => setSection("basic", "shortDescription", v)} />
            <Textarea label="Full Description / Rich Text" value={form.basic?.fullDescription} onChange={(v) => setSection("basic", "fullDescription", v)} />
            <Toggle label="Featured Webinar" checked={Boolean(form.basic?.featured)} onChange={(v) => setSection("basic", "featured", v)} />
          </Grid>
        </Panel>

        <Panel title="2. Hero Section Management">
          <Grid>
            <UploadInput label="Hero Background Image" value={form.hero?.backgroundImage} onChange={(v) => setSection("hero", "backgroundImage", v)} onUpload={(file) => handleUpload("hero", "backgroundImage", file)} />
            <UploadInput label="Webinar Thumbnail" value={form.hero?.thumbnail} onChange={(v) => setSection("hero", "thumbnail", v)} onUpload={(file) => handleUpload("hero", "thumbnail", file)} />
            {["date", "time", "platform", "mode", "ctaText", "ctaUrl", "calendarUrl"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.hero?.[key]} onChange={(v) => setSection("hero", key, v)} />
            ))}
            <UploadInput label="Webinar Brochure Upload" value={form.hero?.brochureUrl} onChange={(v) => setSection("hero", "brochureUrl", v)} onUpload={(file) => handleUpload("hero", "brochureUrl", file)} />
          </Grid>
        </Panel>

        <Panel title="3. Webinar Info Bar">
          <Grid>
            {["date", "time", "eventType", "platform", "mainSpeaker", "status"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.infoBar?.[key]} onChange={(v) => setSection("infoBar", key, v)} />
            ))}
          </Grid>
        </Panel>

        <Panel title="4. About Webinar Section">
          <Grid>
            <Input label="About Webinar Title" value={form.about?.title} onChange={(v) => setSection("about", "title", v)} />
            <Textarea label="About Webinar Description" value={form.about?.description} onChange={(v) => setSection("about", "description", v)} />
            <Textarea label="Webinar Objective, one per line" value={(form.about?.objective || []).join("\n")} onChange={(v) => setSection("about", "objective", lines(v))} />
            <Textarea label="Webinar Benefits, one per line" value={(form.about?.benefits || []).join("\n")} onChange={(v) => setSection("about", "benefits", lines(v))} />
          </Grid>
        </Panel>

        <Repeater title="5. Topics To Be Covered" section="topics" rows={form.topics} template={empty.topic} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Topic Title" value={item.title} onChange={(v) => updateArray("topics", i, "title", v)} />
              <Textarea label="Topic Description" value={item.description} onChange={(v) => updateArray("topics", i, "description", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("topics", i, "icon", v)} />
              <ColorInput value={item.color} onChange={(v) => updateArray("topics", i, "color", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="6. Webinar Speakers Section" section="speakers" rows={form.speakers} template={empty.speaker} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["name", "designation", "organization", "expertise", "linkedInUrl", "sessionTopic"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("speakers", i, key, v)} />
              ))}
              <UploadInput label="Speaker Image" value={item.image} onChange={(v) => updateArray("speakers", i, "image", v)} onUpload={(file) => handleUpload("speakers", "image", file, i)} />
              <Textarea label="Speaker Bio" value={item.bio} onChange={(v) => updateArray("speakers", i, "bio", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="7. Webinar Joining Process Section" section="joiningSteps" rows={form.joiningSteps} template={empty.joiningStep} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Step Title" value={item.title} onChange={(v) => updateArray("joiningSteps", i, "title", v)} />
              <Textarea label="Step Description" value={item.description} onChange={(v) => updateArray("joiningSteps", i, "description", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("joiningSteps", i, "icon", v)} />
              <Input label="Step Order" value={item.order} onChange={(v) => updateArray("joiningSteps", i, "order", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="8. Registration Management" section="registrations" rows={form.registrations} template={empty.registration} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["title", "startDate", "endDate", "fee", "currency", "url"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("registrations", i, key, v)} />
              ))}
              <Textarea label="Registration Benefits, one per line" value={(item.benefits || []).join("\n")} onChange={(v) => updateArray("registrations", i, "benefits", lines(v))} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="9. Target Audience Section" section="targetAudience" rows={form.targetAudience} template={empty.audience} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Audience Title" value={item.title} onChange={(v) => updateArray("targetAudience", i, "title", v)} />
              <Textarea label="Audience Description" value={item.description} onChange={(v) => updateArray("targetAudience", i, "description", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("targetAudience", i, "icon", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="10. Webinar Highlights" section="highlights" rows={form.highlights} template={empty.highlight} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Highlight Title" value={item.title} onChange={(v) => updateArray("highlights", i, "title", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("highlights", i, "icon", v)} />
            </Grid>
          )}
        </Repeater>

        <Panel title="11. Event Organizer Section">
          <Grid>
            {["name", "description", "email", "phone", "website"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.organizer?.[key]} onChange={(v) => setSection("organizer", key, v)} />
            ))}
            <UploadInput label="Organizer Logo" value={form.organizer?.logo} onChange={(v) => setSection("organizer", "logo", v)} onUpload={(file) => handleUpload("organizer", "logo", file)} />
            <Textarea label="Social Media Links, one per line" value={(form.organizer?.socialLinks || []).join("\n")} onChange={(v) => setSection("organizer", "socialLinks", lines(v))} />
          </Grid>
        </Panel>

        <Panel title="12. Webinar Platform Details">
          <Grid>
            {["name", "meetingUrl", "accessInstructions", "technicalRequirements", "supportContact"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.platform?.[key]} onChange={(v) => setSection("platform", key, v)} />
            ))}
          </Grid>
        </Panel>

        <Panel title="13. Certificates & Resources">
          <Grid>
            <Toggle label="Certificate Available" checked={Boolean(form.resources?.certificateAvailable)} onChange={(v) => setSection("resources", "certificateAvailable", v)} />
            <UploadInput label="Certificate Template Upload" value={form.resources?.certificateTemplateUrl} onChange={(v) => setSection("resources", "certificateTemplateUrl", v)} onUpload={(file) => handleUpload("resources", "certificateTemplateUrl", file)} />
            <UploadInput label="Webinar Recording Upload" value={form.resources?.recordingUrl} onChange={(v) => setSection("resources", "recordingUrl", v)} onUpload={(file) => handleUpload("resources", "recordingUrl", file)} />
            <UploadInput label="Webinar Slides Upload" value={form.resources?.slidesUrl} onChange={(v) => setSection("resources", "slidesUrl", v)} onUpload={(file) => handleUpload("resources", "slidesUrl", file)} />
            <Textarea label="Resource PDFs, one per line" value={(form.resources?.resourcePdfs || []).join("\n")} onChange={(v) => setSection("resources", "resourcePdfs", lines(v))} />
            <Textarea label="E-Certificate Configuration JSON/Text" value={JSON.stringify(form.resources?.eCertificateConfig || {}, null, 2)} onChange={(v) => setSection("resources", "eCertificateConfig", safeJson(v))} />
          </Grid>
        </Panel>

        <Repeater title="14. FAQ Section" section="faqs" rows={form.faqs} template={empty.faq} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Question" value={item.question} onChange={(v) => updateArray("faqs", i, "question", v)} />
              <Textarea label="Answer" value={item.answer} onChange={(v) => updateArray("faqs", i, "answer", v)} />
              <Input label="FAQ Order" value={item.order} onChange={(v) => updateArray("faqs", i, "order", v)} />
            </Grid>
          )}
        </Repeater>

        <Panel title="15. Media Gallery">
          <Grid>
            <Toggle label="Gallery Enable" checked={Boolean(form.mediaGallery?.enabled)} onChange={(v) => setSection("mediaGallery", "enabled", v)} />
            <Textarea label="Webinar Images URLs, one per line" value={(form.mediaGallery?.images || []).join("\n")} onChange={(v) => setSection("mediaGallery", "images", lines(v))} />
            <Textarea label="Webinar Videos URLs, one per line" value={(form.mediaGallery?.videos || []).join("\n")} onChange={(v) => setSection("mediaGallery", "videos", lines(v))} />
          </Grid>
        </Panel>

        {[
          ["16. CTA Section Management", "cta", ["title", "description", "buttonText", "buttonUrl", "backgroundImage"]],
          ["17. SEO & Marketing Settings", "seo", ["metaTitle", "metaDescription", "metaKeywords", "openGraphImage", "canonicalUrl", "structuredData"]],
          ["18. Social Sharing Settings", "socialSharing", ["facebookUrl", "linkedInUrl", "twitterUrl", "whatsappUrl", "customMessage"]],
          ["19. Analytics & Tracking", "analytics", ["capacity", "registeredUsersCount", "webinarAnalytics", "engagementMetrics"]],
          ["20. Admin Controls", "controls", ["publishStatus", "visibility", "sortOrder"]],
        ].map(([panelTitle, section, keys]) => (
          <Panel key={section} title={panelTitle}>
            <Grid>
              {keys.map((key) => (
                <Input key={key} label={labelize(key)} value={typeof form[section]?.[key] === "object" ? JSON.stringify(form[section]?.[key]) : form[section]?.[key]} onChange={(v) => setSection(section, key, key.includes("Analytics") || key.includes("Metrics") || key === "structuredData" ? safeJson(v) : v)} />
              ))}
              {section === "analytics" && <Toggle label="Attendance Tracking" checked={Boolean(form.analytics?.attendanceTracking)} onChange={(v) => setSection("analytics", "attendanceTracking", v)} />}
              {section === "controls" && (
                <>
                  <Toggle label="Featured Toggle" checked={Boolean(form.controls?.featured)} onChange={(v) => setSection("controls", "featured", v)} />
                  <Toggle label="Archive Toggle" checked={Boolean(form.controls?.archive)} onChange={(v) => setSection("controls", "archive", v)} />
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
  return <section className="bg-white border border-[#e5ebf4] rounded-[18px] p-5 shadow-[0_12px_28px_rgba(7,29,79,0.05)]"><h2 className="text-[#071d4f] text-[14px] font-black uppercase mb-4">{title}</h2>{children}</section>;
}

function Repeater({ title, section, rows = [], template, addItem, removeItem, children }) {
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <Panel title={title}>
      <div className="space-y-4">
        {safeRows.map((item, index) => (
          <div key={index} className="rounded-[14px] border border-[#dfe7f1] bg-white p-4">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => removeItem(section, index)}
                className="h-[34px] px-3 rounded-[8px] bg-red-50 text-red-600 text-[12px] font-bold flex items-center gap-2"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>

            {children(item || {}, index)}
          </div>
        ))}

        <button
          type="button"
          onClick={() => addItem(section, { ...template })}
          className="h-[38px] px-4 rounded-[10px] bg-[#071d4f] text-white text-[12px] font-bold flex items-center gap-2"
        >
          <PlusCircle size={15} />
          Add New
        </button>
      </div>
    </Panel>
  );
}

function Grid({ children, compact = false }) {
  return <div className={`grid ${compact ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>{children}</div>;
}

function Input({ label, value = "", onChange, required = false }) {
  return <label className="block"><span className="text-[#425878] text-[11px] font-black uppercase">{label}{required ? " *" : ""}</span><input value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]" /></label>;
}

function Textarea({ label, value = "", onChange }) {
  return <label className="block md:col-span-2"><span className="text-[#425878] text-[11px] font-black uppercase">{label}</span><textarea rows={4} value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-[10px] border border-[#dbe5f0] bg-white p-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]" /></label>;
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
  return <label className="block"><span className="text-[#425878] text-[11px] font-black uppercase">Lucide Icon</span><select value={value || "BookOpen"} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f]">{iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select></label>;
}

function ColorInput({ value = "#0d6efd", onChange }) {
  return <label className="block"><span className="text-[#425878] text-[11px] font-black uppercase">Color</span><input type="color" value={value || "#0d6efd"} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white p-1" /></label>;
}

function Toggle({ label, checked, onChange }) {
  return <label className="h-[42px] mt-5 flex items-center gap-3"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-[#e2ac39]" /><span className="text-[#071d4f] text-[13px] font-bold">{label}</span></label>;
}

function lines(value) {
  return String(value || "").split("\n").map((x) => x.trim()).filter(Boolean);
}

function labelize(value) {
  return String(value).replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase());
}

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return value;
  }
}
