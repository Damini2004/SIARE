import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PlusCircle, Save, Trash2, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminWorkshopContent, updateAdminWorkshopContent } from "../../api/workshopApi";
import { uploadFile } from "../../api/uploadApi";

const iconOptions = [
  "CalendarDays",
  "Clock",
  "MapPin",
  "Users",
  "Target",
  "Database",
  "BarChart3",
  "PieChart",
  "ClipboardCheck",
  "GraduationCap",
  "Landmark",
  "BriefcaseBusiness",
  "UserRound",
  "TrendingUp",
  "Mail",
  "Phone",
  "Globe",
  "CheckCircle",
  "ArrowRight",
];

const empty = {
  outcome: { title: "", description: "", icon: "Target", color: "#006aff" },
  facilitator: { name: "", designation: "", organization: "", image: "", expertise: "", biography: "", linkedInUrl: "" },
  audience: { title: "", icon: "GraduationCap", description: "" },
  registration: { title: "", startDate: "", endDate: "", fee: "", currency: "INR", benefits: [], url: "", badgeColor: "#0d6efd" },
  highlight: { title: "", icon: "CheckCircle" },
  timeline: { date: "", title: "", description: "", status: "upcoming" },
  schedule: { title: "", time: "", speaker: "", description: "", type: "", resources: [] },
  testimonial: { participantName: "", participantImage: "", designation: "", review: "", rating: 5 },
  sponsor: { name: "", logo: "", website: "", tier: "" },
};

export default function WorkshopAdmin() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminWorkshopContent(eventId);
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

  const title = useMemo(() => form?.basic?.title || event?.title || "Workshop", [event, form]);

  function setSection(section, key, value) {
    setForm((prev) => ({ ...prev, [section]: { ...(prev[section] || {}), [key]: value } }));
  }

  function updateArray(section, index, key, value) {
    setForm((prev) => {
      const items = [...(prev[section] || [])];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, [section]: items };
    });
  }

  function addItem(section, template) {
    setForm((prev) => ({ ...prev, [section]: [...(prev[section] || []), template] }));
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
      await updateAdminWorkshopContent(eventId, form);
      alert("Workshop content saved");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center text-[#071d4f] font-bold">Loading workshop manager...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="sticky top-0 z-20 bg-white border-b border-[#e5ebf4] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <button onClick={() => navigate("/admin/dashboard")} className="h-[40px] px-4 rounded-[10px] border border-[#dfe7f1] text-[#071d4f] text-[12px] font-bold flex items-center gap-2">
          <ArrowLeft size={15} />
          Dashboard
        </button>
        <div className="text-center">
          <p className="text-[#6b7890] text-[11px] font-bold uppercase">Workshop CMS</p>
          <h1 className="text-[#071d4f] text-[18px] font-black">{title}</h1>
        </div>
        <button onClick={save} disabled={saving} className="h-[40px] px-5 rounded-[10px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-black flex items-center gap-2 disabled:opacity-60">
          <Save size={15} />
          {saving ? "Saving..." : "Save"}
        </button>
      </header>

      <main className="max-w-[1320px] mx-auto px-5 sm:px-8 py-7 space-y-6">
        <Panel title="1. Workshop Basic Information">
          <Grid>
            <Input label="Workshop Title" value={form.basic?.title} onChange={(v) => setSection("basic", "title", v)} required />
            <Input label="Workshop Slug" value={form.basic?.slug} onChange={(v) => setSection("basic", "slug", v)} required />
            <Input label="Workshop Subtitle" value={form.basic?.subtitle} onChange={(v) => setSection("basic", "subtitle", v)} />
            <Input label="Workshop Type" value={form.basic?.type} onChange={(v) => setSection("basic", "type", v)} />
            <Input label="Workshop Category" value={form.basic?.category} onChange={(v) => setSection("basic", "category", v)} />
            <Input label="Workshop Status" value={form.basic?.status} onChange={(v) => setSection("basic", "status", v)} />
            <Textarea label="Short Description" value={form.basic?.shortDescription} onChange={(v) => setSection("basic", "shortDescription", v)} />
            <Textarea label="Full Description / Rich Text" value={form.basic?.fullDescription} onChange={(v) => setSection("basic", "fullDescription", v)} />
            <Toggle label="Featured Workshop" checked={Boolean(form.basic?.featured)} onChange={(v) => setSection("basic", "featured", v)} />
          </Grid>
        </Panel>

        <Panel title="2. Hero Section Management">
          <Grid>
            <UploadInput label="Hero Background Image" value={form.hero?.backgroundImage} onChange={(v) => setSection("hero", "backgroundImage", v)} onUpload={(file) => handleUpload("hero", "backgroundImage", file)} />
            <UploadInput label="Workshop Icon/Image" value={form.hero?.workshopImage} onChange={(v) => setSection("hero", "workshopImage", v)} onUpload={(file) => handleUpload("hero", "workshopImage", file)} />
            <Input label="Hero Badge Text" value={form.hero?.badgeText} onChange={(v) => setSection("hero", "badgeText", v)} />
            <Input label="Workshop Date" value={form.hero?.date} onChange={(v) => setSection("hero", "date", v)} />
            <Input label="Workshop Time" value={form.hero?.time} onChange={(v) => setSection("hero", "time", v)} />
            <Input label="Workshop Location" value={form.hero?.location} onChange={(v) => setSection("hero", "location", v)} />
            <Input label="CTA Button Text" value={form.hero?.ctaText} onChange={(v) => setSection("hero", "ctaText", v)} />
            <Input label="CTA Button URL" value={form.hero?.ctaUrl} onChange={(v) => setSection("hero", "ctaUrl", v)} />
            <Input label="Add To Calendar URL" value={form.hero?.calendarUrl} onChange={(v) => setSection("hero", "calendarUrl", v)} />
            <UploadInput label="Brochure PDF Upload" value={form.hero?.brochureUrl} onChange={(v) => setSection("hero", "brochureUrl", v)} onUpload={(file) => handleUpload("hero", "brochureUrl", file)} />
          </Grid>
        </Panel>

        <Panel title="3. Workshop Info Bar">
          <Grid>
            {["date", "location", "eventType", "mainSpeaker", "organizedBy", "status"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.infoBar?.[key]} onChange={(v) => setSection("infoBar", key, v)} />
            ))}
          </Grid>
        </Panel>

        <Panel title="4. About Workshop Section">
          <Grid>
            <Input label="About Workshop Title" value={form.about?.title} onChange={(v) => setSection("about", "title", v)} />
            <Textarea label="About Workshop Description" value={form.about?.description} onChange={(v) => setSection("about", "description", v)} />
            <Textarea label="Workshop Objectives, one per line" value={(form.about?.objectives || []).join("\n")} onChange={(v) => setSection("about", "objectives", lines(v))} />
            <Textarea label="Workshop Benefits, one per line" value={(form.about?.benefits || []).join("\n")} onChange={(v) => setSection("about", "benefits", lines(v))} />
          </Grid>
        </Panel>

        <Repeater title="5. Key Learning Outcomes" section="outcomes" rows={form.outcomes} template={empty.outcome} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Outcome Title" value={item.title} onChange={(v) => updateArray("outcomes", i, "title", v)} />
              <Textarea label="Outcome Description" value={item.description} onChange={(v) => updateArray("outcomes", i, "description", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("outcomes", i, "icon", v)} />
              <ColorInput value={item.color} onChange={(v) => updateArray("outcomes", i, "color", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="6. Facilitators / Trainers Section" section="facilitators" rows={form.facilitators} template={empty.facilitator} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["name", "designation", "organization", "expertise", "linkedInUrl"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("facilitators", i, key, v)} />
              ))}
              <UploadInput label="Facilitator Image" value={item.image} onChange={(v) => updateArray("facilitators", i, "image", v)} onUpload={(file) => handleUpload("facilitators", "image", file, i)} />
              <Textarea label="Biography" value={item.biography} onChange={(v) => updateArray("facilitators", i, "biography", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="7. Target Audience Section" section="targetAudience" rows={form.targetAudience} template={empty.audience} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Audience Title" value={item.title} onChange={(v) => updateArray("targetAudience", i, "title", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("targetAudience", i, "icon", v)} />
              <Textarea label="Audience Description" value={item.description} onChange={(v) => updateArray("targetAudience", i, "description", v)} />
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
              <ColorInput label="Registration Badge Color" value={item.badgeColor} onChange={(v) => updateArray("registrations", i, "badgeColor", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="9. Workshop Highlights" section="highlights" rows={form.highlights} template={empty.highlight} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              <Input label="Highlight Title" value={item.title} onChange={(v) => updateArray("highlights", i, "title", v)} />
              <IconSelect value={item.icon} onChange={(v) => updateArray("highlights", i, "icon", v)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="10. Important Dates Timeline" section="timeline" rows={form.timeline} template={empty.timeline} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["date", "title", "description", "status"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("timeline", i, key, v)} />
              ))}
            </Grid>
          )}
        </Repeater>

        <Panel title="11. Contact Organizer Section">
          <Grid>
            {["name", "email", "phone", "website", "whatsapp", "supportEmail"].map((key) => (
              <Input key={key} label={labelize(key)} value={form.organizer?.[key]} onChange={(v) => setSection("organizer", key, v)} />
            ))}
          </Grid>
        </Panel>

        <Repeater title="12. Workshop Schedule Section" section="schedule" rows={form.schedule} template={empty.schedule} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["title", "time", "speaker", "description", "type"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("schedule", i, key, v)} />
              ))}
              <Textarea label="Session Resources, one per line" value={(item.resources || []).join("\n")} onChange={(v) => updateArray("schedule", i, "resources", lines(v))} />
            </Grid>
          )}
        </Repeater>

        <Panel title="13. Certificates & Materials">
          <Grid>
            <Toggle label="Certificate Available" checked={Boolean(form.certificates?.available)} onChange={(v) => setSection("certificates", "available", v)} />
            <UploadInput label="Certificate Template Upload" value={form.certificates?.templateUrl} onChange={(v) => setSection("certificates", "templateUrl", v)} onUpload={(file) => handleUpload("certificates", "templateUrl", file)} />
            <Textarea label="Workshop Materials URLs, one per line" value={(form.certificates?.materials || []).join("\n")} onChange={(v) => setSection("certificates", "materials", lines(v))} />
            <Textarea label="Resource Links, one per line" value={(form.certificates?.resourceLinks || []).join("\n")} onChange={(v) => setSection("certificates", "resourceLinks", lines(v))} />
            <Textarea label="Recorded Session URLs, one per line" value={(form.certificates?.recordedSessionUrls || []).join("\n")} onChange={(v) => setSection("certificates", "recordedSessionUrls", lines(v))} />
          </Grid>
        </Panel>

        <Panel title="14. Media Gallery">
          <Grid>
            <Toggle label="Gallery Enable" checked={Boolean(form.mediaGallery?.enabled)} onChange={(v) => setSection("mediaGallery", "enabled", v)} />
            <Textarea label="Workshop Images URLs, one per line" value={(form.mediaGallery?.images || []).join("\n")} onChange={(v) => setSection("mediaGallery", "images", lines(v))} />
            <Textarea label="Workshop Videos URLs, one per line" value={(form.mediaGallery?.videos || []).join("\n")} onChange={(v) => setSection("mediaGallery", "videos", lines(v))} />
          </Grid>
        </Panel>

        <Repeater title="15. Testimonials Section" section="testimonials" rows={form.testimonials} template={empty.testimonial} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["participantName", "designation", "review", "rating"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("testimonials", i, key, v)} />
              ))}
              <UploadInput label="Participant Image" value={item.participantImage} onChange={(v) => updateArray("testimonials", i, "participantImage", v)} onUpload={(file) => handleUpload("testimonials", "participantImage", file, i)} />
            </Grid>
          )}
        </Repeater>

        <Repeater title="16. Sponsors & Partners" section="sponsors" rows={form.sponsors} template={empty.sponsor} addItem={addItem} removeItem={removeItem}>
          {(item, i) => (
            <Grid compact>
              {["name", "website", "tier"].map((key) => (
                <Input key={key} label={labelize(key)} value={item[key]} onChange={(v) => updateArray("sponsors", i, key, v)} />
              ))}
              <UploadInput label="Sponsor Logo" value={item.logo} onChange={(v) => updateArray("sponsors", i, "logo", v)} onUpload={(file) => handleUpload("sponsors", "logo", file, i)} />
            </Grid>
          )}
        </Repeater>

        {[
          ["17. CTA Section Management", "cta", ["title", "description", "buttonText", "buttonUrl", "backgroundImage"]],
          ["18. SEO & Marketing Settings", "seo", ["metaTitle", "metaDescription", "metaKeywords", "openGraphImage", "canonicalUrl", "socialShareImage"]],
          ["19. Social Sharing Settings", "socialSharing", ["facebookUrl", "linkedInUrl", "twitterUrl", "whatsappUrl", "customMessage"]],
          ["20. Admin Controls", "controls", ["publishStatus", "visibility", "sortOrder"]],
        ].map(([panelTitle, section, keys]) => (
          <Panel key={section} title={panelTitle}>
            <Grid>
              {keys.map((key) => (
                <Input key={key} label={labelize(key)} value={form[section]?.[key]} onChange={(v) => setSection(section, key, v)} />
              ))}
              {section === "controls" && (
                <>
                  <Toggle label="Archive Toggle" checked={Boolean(form.controls?.archive)} onChange={(v) => setSection("controls", "archive", v)} />
                  <Toggle label="Featured Toggle" checked={Boolean(form.controls?.featured)} onChange={(v) => setSection("controls", "featured", v)} />
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
      <h2 className="text-[#071d4f] text-[14px] font-black uppercase mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Repeater({ title, section, rows = [], template, addItem, removeItem, children }) {
  return (
    <Panel title={title}>
      <div className="space-y-4">
        {rows.map((item, index) => (
          <div key={index} className="rounded-[14px] border border-[#e8eef6] bg-[#fbfcfe] p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#6b7890] text-[12px] font-bold uppercase">Item {index + 1}</p>
              <button onClick={() => removeItem(section, index)} className="w-[34px] h-[34px] rounded-[10px] bg-red-50 text-red-600 flex items-center justify-center">
                <Trash2 size={15} />
              </button>
            </div>
            {children(item, index)}
          </div>
        ))}
        <button onClick={() => addItem(section, template)} className="h-[40px] px-4 rounded-[10px] bg-[#071d4f] text-white text-[12px] font-bold flex items-center gap-2">
          <PlusCircle size={15} />
          Add Item
        </button>
      </div>
    </Panel>
  );
}

function Grid({ children, compact = false }) {
  return <div className={`grid ${compact ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>{children}</div>;
}

function Input({ label, value = "", onChange, required = false }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">{label}{required ? " *" : ""}</span>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]" />
    </label>
  );
}

function Textarea({ label, value = "", onChange }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-[#425878] text-[11px] font-black uppercase">{label}</span>
      <textarea rows={4} value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-[10px] border border-[#dbe5f0] bg-white p-3 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]" />
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

function IconSelect({ value = "Target", onChange }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">Lucide Icon</span>
      <select value={value || "Target"} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white px-3 text-[13px] text-[#071d4f]">
        {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
      </select>
    </label>
  );
}

function ColorInput({ label = "Color", value = "#006aff", onChange }) {
  return (
    <label className="block">
      <span className="text-[#425878] text-[11px] font-black uppercase">{label}</span>
      <input type="color" value={value || "#006aff"} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[42px] rounded-[10px] border border-[#dbe5f0] bg-white p-1" />
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="h-[42px] mt-5 flex items-center gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-[#e2ac39]" />
      <span className="text-[#071d4f] text-[13px] font-bold">{label}</span>
    </label>
  );
}

function lines(value) {
  return String(value || "").split("\n").map((x) => x.trim()).filter(Boolean);
}

function labelize(value) {
  return String(value).replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase());
}
