import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Database,
  Globe,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Phone,
  PieChart,
  Share2,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import conferenceImg from "../assets/workshopbg.webp";
import eventIcon from "../assets/workIcon.webp";
import { getEventById } from "../api/eventApi";
import { getWorkshopContent } from "../api/workshopApi";

const iconMap = {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Database,
  Globe,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Phone,
  PieChart,
  Target,
  TrendingUp,
  UserRound,
  Users,
};

const fallbackOutcomes = [
  { title: "Understand research design and methodology", description: "Learn to frame research questions and choose appropriate methodologies.", icon: "Target", color: "#006aff" },
  { title: "Data collection and management", description: "Explore tools and techniques for collecting and organizing data effectively.", icon: "Database", color: "#ff7a1a" },
  { title: "Data analysis techniques", description: "Hands-on practice with statistical methods and software tools.", icon: "BarChart3", color: "#2faa38" },
  { title: "Interpretation and visualization", description: "Learn to interpret results and create meaningful data visualizations.", icon: "PieChart", color: "#7c3aed" },
  { title: "Apply findings in research", description: "Use insights and results to strengthen your research outcomes.", icon: "ClipboardCheck", color: "#36ada3" },
];

const fallbackAudience = [
  { title: "Researchers and Academicians", icon: "GraduationCap", description: "" },
  { title: "Industry Professionals", icon: "Landmark", description: "" },
  { title: "Project Researchers", icon: "BriefcaseBusiness", description: "" },
  { title: "Anyone interested in research and data analysis", icon: "UserRound", description: "" },
];

function IconByName({ name, ...props }) {
  const Icon = iconMap[name] || CheckCircle;
  return <Icon {...props} />;
}

export default function Workshop() {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!id) return;

    getWorkshopContent(id)
      .then((res) => {
        setEvent(res.event || null);
        setDetail(res.detail || null);
      })
      .catch(() => {
        if (!event) {
          getEventById(id)
            .then((res) => setEvent(res?.data || res))
            .catch((err) => console.log("Workshop Details Error:", err));
        }
      });
  }, [id]);

  if (!event) {
    return (
      <div className="py-40 text-center text-[#071d4f] font-bold">
        Loading workshop details...
      </div>
    );
  }

const basic = detail?.basic || {};
const hero = detail?.hero || {};
const infoBar = detail?.infoBar || {};

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const workshopBgUrl =
  hero?.backgroundImage
    ? hero.backgroundImage.startsWith("http")
      ? hero.backgroundImage
      : `${API_BASE}${hero.backgroundImage}`
    : conferenceImg;

  const about = detail?.about || {};
  const organizer = detail?.organizer || {};
  const certificates = detail?.certificates || {};
  const gallery = detail?.mediaGallery || {};
  const cta = detail?.cta || {};
  const outcomes = detail?.outcomes?.length ? detail.outcomes : fallbackOutcomes;
  const targetAudience = detail?.targetAudience?.length ? detail.targetAudience : fallbackAudience;
  const registrations = detail?.registrations?.length
    ? detail.registrations
    : [{ title: "Standard Registration", endDate: "", fee: "Free", currency: "", badgeColor: "#0d6efd", url: event.link }];
  const highlights = detail?.highlights?.length
    ? detail.highlights
    : [{ title: "Hands-on practical sessions", icon: "CheckCircle" }, { title: "Certificate of participation", icon: "CheckCircle" }];
  const timeline = detail?.timeline || [];
  const facilitators = detail?.facilitators || [];
  const schedule = detail?.schedule || [];
  const testimonials = detail?.testimonials || [];
  const sponsors = detail?.sponsors || [];
  const title = basic.title || event.title;
  const registerUrl = hero.ctaUrl || event.link || "https://membership.siaresociety.org/register";

  return (
    <main className="w-full bg-white">
      <section
        className="relative bg-[#061b45] overflow-hidden min-h-[440px] max-[690px]:min-h-[580px] max-[500px]:min-h-[640px]"
        style={{
          backgroundImage: `url(${workshopBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 max-[670px]:py-6">
          <div className="text-white/80 text-[12px] max-[670px]:text-[11px] mb-8 max-[670px]:mb-5 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[#e2ac39] transition-colors duration-300">Home</Link>
            <span>/</span>
            <Link to="/events" className="hover:text-[#e2ac39] transition-colors duration-300">Events</Link>
            <span>/</span>
            <span>{title}</span>
          </div>

          <div className="flex flex-row gap-5 max-[670px]:flex-col max-[670px]:gap-4">
            <div className="group w-[60px] h-[60px] max-[670px]:w-[62px] max-[670px]:h-[62px] rounded-[10px] bg-[linear-gradient(180deg,#e2ac39_0%,#c99322_100%)] flex items-center justify-center shrink-0 shadow-[0_12px_28px_rgba(201,147,34,0.32)]">
              <img src={hero.workshopImage || eventIcon} alt="Workshop" className="w-[90px] h-[90px] object-contain" />
            </div>

            <div className="w-full max-w-[680px]">
              <p className="text-[#c99322] text-[14px] max-[670px]:text-[11px] font-bold uppercase flex items-center gap-2 mb-1">
                {hero.badgeText || "Workshop"}
              </p>

              <h1 className="text-white text-[1.2rem] sm:text-[1.6rem] lg:text-[1.9rem] max-[670px]:text-[1.35rem] max-[420px]:text-[1.18rem] font-bold leading-[1.15]">
                {title}
              </h1>

              <div className="flex flex-wrap gap-6 max-[670px]:gap-4 mt-5 max-[670px]:mt-4 text-white text-[14px] max-[670px]:text-[12px]">
                <span className="flex items-center gap-2"><CalendarDays size={18} />{hero.date || event.date || "-"}</span>
                <span className="flex items-center gap-2"><Clock size={18} />{hero.time || event.time || "-"}</span>
                <span className="flex items-center gap-2"><MapPin size={18} />{hero.location || event.location || "Global Event"}</span>
              </div>

              <p className="text-white/90 text-[13px] max-[670px]:text-[12px] leading-[1.7] mt-3 max-w-[520px] max-[670px]:max-w-full">
                {basic.shortDescription || event.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4 max-[670px]:grid max-[670px]:grid-cols-2 max-[420px]:grid-cols-1">
                <a href={registerUrl} target="_blank" rel="noopener noreferrer" className="group h-[44px] px-6 max-[670px]:px-4 max-[670px]:w-full rounded-[8px] bg-[linear-gradient(180deg,#eebb48_0%,#d3aa51_55%,#b88922_100%)] text-[#eff1f6] font-bold text-[13px] max-[670px]:text-[11px] flex items-center justify-center gap-2 border border-[#d8a73b]">
                  <CalendarDays size={16} />
                  {hero.ctaText || "Register Now"}
                </a>
                <a href={hero.calendarUrl || "#"} target="_blank" rel="noopener noreferrer" className="group h-[44px] px-6 max-[670px]:px-4 max-[670px]:w-full rounded-[8px] border border-white/70 bg-white/8 backdrop-blur-sm text-white font-bold text-[13px] max-[670px]:text-[11px] flex items-center justify-center gap-2">
                  <CalendarCheck size={16} />
                  Add To Calendar
                </a>
                {hero.brochureUrl && (
                  <a href={hero.brochureUrl} target="_blank" rel="noopener noreferrer" className="group h-[44px] px-6 rounded-[8px] border border-white/70 bg-white/8 text-white font-bold text-[13px] flex items-center justify-center">
                    Brochure
                  </a>
                )}
                <button className="group h-[44px] w-[44px] max-[670px]:w-full rounded-[8px] border border-white/70 bg-white/8 backdrop-blur-sm text-white flex items-center justify-center">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 z-10">
        <div className="w-full max-w-[1150px] mx-auto px-5">
          <div className="bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,.12)] border border-[#e5e7eb] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {[
              ["DATE", infoBar.date || hero.date || event.date || "-", CalendarDays],
              ["LOCATION", infoBar.location || hero.location || event.location || "-", MapPin],
              ["EVENT TYPE", infoBar.eventType || "Workshop", Users],
              ["SPEAKER", infoBar.mainSpeaker || event.speaker || "-", Users],
              ["ORGANIZED BY", infoBar.organizedBy || event.instructor || "SIARE", Target],
              ["STATUS", infoBar.status || event.status || "Upcoming", CheckCircle],
            ].map(([label, value, Icon], index) => (
              <div key={index} className="p-5 flex gap-3 border-r last:border-r-0 border-[#dce3ee]">
                <Icon className="text-[#0d6efd] shrink-0" size={28} />
                <div>
                  <p className="text-[11px] font-bold text-[#071d4f] uppercase">{label}</p>
                  <p className="text-[13px] font-bold text-[#071d4f] mt-1">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-7 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <BlockTitle title={about.title || "About The Workshop"} />
          <p className="text-[#071d4f] text-[14px] leading-[1.65] mb-4 w-full max-w-[640px]">
            {about.description || basic.fullDescription || event.description}
          </p>

          {(about.objectives || []).length > 0 && (
            <BulletBlock title="Workshop Objectives" items={about.objectives} />
          )}
          {(about.benefits || []).length > 0 && (
            <BulletBlock title="Workshop Benefits" items={about.benefits} />
          )}

          <BlockTitle title="Key Learning Outcomes" className="mt-8" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {outcomes.map((item, index) => (
              <div key={index} className="border border-[#dce3ee] rounded-[8px] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(216,167,59,0.16)] hover:border-[#d8a73b]/70 hover:bg-[#fffaf0] bg-white">
                <IconByName name={item.icon} size={36} className="mx-auto mb-3" style={{ color: item.color || "#006aff" }} />
                <h4 className="text-[#071d4f] text-[13px] font-bold leading-tight">{item.title}</h4>
                <p className="text-[#334968] text-[11px] leading-[1.5] mt-2">{item.description}</p>
              </div>
            ))}
          </div>

          {facilitators.length > 0 && (
            <>
              <BlockTitle title="Workshop Facilitators" className="mt-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {facilitators.map((item, index) => (
                  <div key={index} className="border border-[#dce3ee] rounded-[8px] overflow-hidden bg-white text-center shadow-[0_6px_18px_rgba(7,29,79,0.06)]">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-[120px] object-cover object-top" />}
                    <div className="p-3">
                      <h4 className="text-[#071d4f] text-[12px] font-bold">{item.name}</h4>
                      <p className="text-[#071d4f] text-[10px] mt-2">{item.designation}<br />{item.organization}</p>
                      <p className="text-[#071d4f] text-[10px] mt-2">{item.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <BlockTitle title="Who Should Attend?" className="mt-8" />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {targetAudience.map((item, index) => (
              <div key={index} className="flex items-center gap-[12px] w-[190px]">
                <IconByName name={item.icon} size={42} strokeWidth={1.7} className="text-[#006aff] shrink-0" />
                <div>
                  <p className="text-[#071d4f] text-[12px] font-bold leading-[1.35]">{item.title}</p>
                  {item.description && <p className="text-[#334968] text-[10px] mt-1">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>

          {schedule.length > 0 && (
            <>
              <BlockTitle title="Workshop Schedule" className="mt-8" />
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="border border-[#dce3ee] rounded-[8px] p-4">
                    <p className="text-[#c99322] text-[12px] font-bold">{item.time} {item.type ? `- ${item.type}` : ""}</p>
                    <h4 className="text-[#071d4f] font-bold text-[14px] mt-1">{item.title}</h4>
                    <p className="text-[#334968] text-[12px] mt-1">{item.speaker}</p>
                    <p className="text-[#071d4f] text-[12px] mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="space-y-5">
          <SideCard title="Registration Details">
            {registrations.map((item, index) => (
              <a key={index} href={item.url || registerUrl} target="_blank" rel="noopener noreferrer" className="border border-[#dce3ee] rounded-[8px] px-4 py-2 flex items-center gap-3 mb-2 bg-white">
                <div className="w-[42px] h-[42px] rounded-full bg-[#eaf2ff] flex items-center justify-center shrink-0">
                  <CalendarDays size={21} strokeWidth={1.9} style={{ color: item.badgeColor || "#0d6efd" }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#071d4f] font-bold text-[13px] leading-tight">{item.title}</h4>
                  <p className="text-[#334968] text-[12px] leading-tight mt-1">{item.endDate ? `Until ${item.endDate}` : item.startDate}</p>
                </div>
                <p className="font-extrabold text-[13px] shrink-0" style={{ color: item.badgeColor || "#0d6efd" }}>
                  {item.currency ? `${item.currency} ` : ""}{item.fee}
                </p>
              </a>
            ))}
            {/* <a href={registerUrl} target="_blank" rel="noopener noreferrer" className="group w-full h-[40px] bg-[#e2ac39] text-white rounded-[6px] font-bold text-[13px] flex justify-center items-center gap-2">
              Register Now <ArrowRight size={16} />
            </a> */}
          </SideCard>

          <SideCard title="Workshop Highlights">
            {highlights.map((item, index) => (
              <p key={index} className="group text-[#071d4f] text-[12px] flex items-center gap-2 mb-1">
                <IconByName name={item.icon} size={14} className="text-[#c99322]" />
                {item.title}
              </p>
            ))}
          </SideCard>

          {timeline.length > 0 && (
            <SideCard title="Important Dates">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-2 pl-[2px] pb-2">
                  <div className="relative flex flex-col items-center shrink-0">
                    <span className="w-[10px] h-[10px] rounded-full border-[2px] border-[#c99322] bg-white z-10" />
                    {index !== timeline.length - 1 && <span className="absolute top-[10px] w-[2px] h-[38px] bg-[#ececec]" />}
                  </div>
                  <div className="leading-[1.2]">
                    <p className="text-[#071d4f] text-[12px] font-bold">{item.date}</p>
                    <p className="text-[#071d4f] text-[12px] mt-[2px]">{item.title}</p>
                    {item.description && <p className="text-[#334968] text-[11px] mt-[2px]">{item.description}</p>}
                  </div>
                </div>
              ))}
            </SideCard>
          )}

          <SideCard title="Contact Organizer">
            <p className="flex gap-2 text-[12px] font-semibold text-[#071d4f] mb-2"><Mail size={16} className="text-[#c99322]" /> {organizer.email || "contact@siaresociety.org"}</p>
            <p className="flex gap-2 text-[12px] font-semibold text-[#071d4f] mb-2"><Phone size={16} className="text-[#c99322]" /> {organizer.phone || "+91 738 735 5544"}</p>
            <p className="flex gap-2 text-[12px] font-semibold text-[#071d4f]"><Globe size={16} className="text-[#c99322]" /> {organizer.website || "siaresociety.org"}</p>
          </SideCard>

          {certificates.available && (
            <SideCard title="Certificates & Materials">
              <p className="text-[#071d4f] text-[12px] flex items-center gap-2 mb-2"><CheckCircle size={14} className="text-[#c99322]" /> Certificate available</p>
              {(certificates.resourceLinks || []).map((url, index) => (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="block text-[#071d4f] text-[12px] font-semibold mb-2 hover:text-[#c99322]">Resource {index + 1}</a>
              ))}
            </SideCard>
          )}

          {sponsors.length > 0 && (
            <SideCard title="Sponsors & Partners">
              {sponsors.map((item, index) => (
                <a key={index} href={item.website || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3">
                  {item.logo && <img src={item.logo} alt={item.name} className="w-10 h-10 object-contain" />}
                  <span className="text-[#071d4f] text-[12px] font-bold">{item.name}</span>
                </a>
              ))}
            </SideCard>
          )}
        </aside>
      </section>

      {gallery.enabled && ((gallery.images || []).length > 0 || (gallery.videos || []).length > 0) && (
        <section className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-8">
          <BlockTitle title="Media Gallery" />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(gallery.images || []).map((src, index) => <img key={index} src={src} alt="" className="h-36 w-full object-cover rounded-[8px]" />)}
            {(gallery.videos || []).map((src, index) => <a key={index} href={src} target="_blank" rel="noopener noreferrer" className="h-36 rounded-[8px] bg-[#071d4f] text-white flex items-center justify-center text-[12px] font-bold">Video {index + 1}</a>)}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-8">
          <BlockTitle title="Testimonials" />
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((item, index) => (
              <div key={index} className="border border-[#dce3ee] rounded-[8px] p-4">
                <p className="text-[#071d4f] text-[13px] leading-[1.6]">{item.review}</p>
                <p className="text-[#c99322] text-[12px] font-bold mt-3">{item.participantName}</p>
                <p className="text-[#334968] text-[11px]">{item.designation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-8">
        <div className="relative overflow-hidden bg-[#071d4f] rounded-[8px] px-9 py-5 min-h-[86px] flex flex-col md:flex-row items-center justify-between gap-4 text-white shadow-[0_8px_22px_rgba(7,29,79,0.18)]">
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-[58px] h-[58px] rounded-full border-2 border-[#c99322] flex items-center justify-center shrink-0">
              <TrendingUp size={30} className="text-[#c99322]" />
            </div>
            <div>
              <p className="font-bold text-[16px] leading-[1.7]">{cta.title || "Enhance your research skills with practical training"}</p>
              {cta.description && <p className="text-white/75 text-[13px]">{cta.description}</p>}
            </div>
          </div>
          <a href={cta.buttonUrl || registerUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 h-[46px] px-7 rounded-full bg-[linear-gradient(180deg,#f3c04d_0%,#e2ac39_52%,#b9851e_100%)] border border-[#c8932a] text-[#071d4f] text-[13px] uppercase font-bold flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
            {cta.buttonText || "Register Now"} <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}

function BulletBlock({ title, items }) {
  return (
    <div className="mt-5">
      <h3 className="text-[#071d4f] text-[14px] font-bold mb-2">{title}</h3>
      <div className="grid md:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <p key={index} className="text-[#071d4f] text-[12px] flex items-center gap-2">
            <CheckCircle size={14} className="text-[#c99322] shrink-0" />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlockTitle({ title, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-[#071d4f] font-bold uppercase text-[20px]">{title}</h2>
      <div className="w-[42px] h-[3px] bg-[#e2ac39] mt-1" />
    </div>
  );
}

function SideCard({ title, children }) {
  return (
    <div className="border border-[#dce3ee] rounded-[10px] p-5 bg-white">
      <BlockTitle title={title} />
      {children}
    </div>
  );
}