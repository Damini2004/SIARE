import {
  CalendarDays,
  Users,
  CheckCircle,
  Share2,
  ArrowRight,
  Laptop,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Monitor,
  BookOpen,
  Scale,
  FileText,
} from "lucide-react";
import conferenceImg from "../assets/webinar.webp";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWebinarContent } from "../api/webinarApi";

export default function EventDetailsMiddle() {
  const { id } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(location.state?.event || null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    BookOpen,
    Scale,
    FileText,
    Users,
    TrendingUp,
    ClipboardCheck,
    Mail,
    Monitor,
    CheckCircle,
    CalendarDays,
    Laptop,
    Phone,
    Globe,
  };

  useEffect(() => {
    if (!id) return;

    const fetchWebinarContent = async () => {
      try {
        setLoading(true);

        const res = await getWebinarContent(id);

        console.log("EVENT:", res.event);
        console.log("DETAIL:", res.detail);
        console.log("TOPICS:", res.detail?.topics);
        console.log("JOIN:", res.detail?.joiningSteps);

        setEvent(res.event);
        setDetail(res.detail);
      } catch (error) {
        console.log("Webinar content fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarContent();
  }, [id]);

  if (loading) {
    return <div className="py-[250px] text-center">Loading Webinar...</div>;
  }

  if (!event) {
    return <div className="py-[250px] text-center">Webinar not found</div>;
  }

  const parseJson = (value, fallback) => {
  if (!value) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
};

const toArray = (value, fallback = []) => {
  const parsed = parseJson(value, fallback);
  return Array.isArray(parsed) ? parsed : fallback;
};

const toObject = (value, fallback = {}) => {
  const parsed = parseJson(value, fallback);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed
    : fallback;
};


const basic = toObject(detail?.basic);
const hero = toObject(detail?.hero);
const infoBar = toObject(detail?.infoBar);
const about = toObject(detail?.about);
const organizer = toObject(detail?.organizer);
const cta = toObject(detail?.cta);

const topics = toArray(detail?.topics);
const joiningSteps = toArray(detail?.joiningSteps);
const registrations = toArray(detail?.registrations);
const targetAudience = toArray(detail?.targetAudience);
const highlights = toArray(detail?.highlights);

  return (
    <main className="w-full bg-white">
      {/* HERO */}
      <section
        className="
          relative bg-[#061b45] overflow-hidden
          min-h-[420px]
          max-[670px]:min-h-[400px]
          max-[480px]:min-h-[470px]
          max-[344px]:min-h-[505px]
          max-[320px]:min-h-[560px]
        "
        style={{
          backgroundImage: `url(${conferenceImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 max-[670px]:py-6">
          <div className="text-white/80 text-[12px] max-[670px]:text-[11px] mb-8 max-[670px]:mb-5 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[#e2ac39] transition-colors duration-300">
              Home
            </Link>
            <span>›</span>
            <Link to="/events" className="hover:text-[#e2ac39] transition-colors duration-300">
              Events
            </Link>
            <span>›</span>
            <span className="hidden sm:block">{basic?.title || event.title}</span>
          </div>

          <div className="flex flex-row gap-5 max-[670px]:gap-3 max-[670px]:items-start">
            <div
              className="
                w-[50px] h-[50px]
                max-[670px]:w-[54px] max-[670px]:h-[82px]
                rounded-[8px]
                bg-[linear-gradient(180deg,#eebb48_0%,#d3aa51_55%,#b88922_100%)]
                text-white
                flex flex-col items-center justify-center
                font-medium
                shrink-0
                shadow-[0_10px_22px_rgba(238,187,72,0.28)]
                transition-all duration-500 ease-out
                hover:-translate-y-[4px]
                hover:scale-[1.04]
                hover:bg-[linear-gradient(180deg,#ffd56a_0%,#eebb48_50%,#b97d12_100%)]
                hover:shadow-[0_18px_34px_rgba(238,187,72,0.45)]
                hover:text-[#071d4f]
              "
            >
              <CalendarDays size={28} />
            </div>

            <div className="w-full max-w-[680px] min-w-0">
              <p className="text-white text-[12px] max-[670px]:text-[11px] font-medium uppercase flex items-center gap-2 mb-1">
                <Monitor size={15} />
                {basic?.type || event.type}
              </p>

              <h1 className="text-white text-[1.2rem] sm:text-[1.6rem] lg:text-[1.9rem] max-[670px]:text-[1.28rem] max-[420px]:text-[1.08rem] font-bold leading-[1.15] w-full max-w-[450px]">
                {basic?.title || event.title}
              </h1>

              <div className="flex flex-wrap gap-6 max-[670px]:gap-4 mt-5 max-[670px]:mt-4 text-white text-[14px] max-[670px]:text-[12px]">
                <span className="flex items-center gap-2">
                  <CalendarDays size={18} />
                 {hero.date || event.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={18} />
                 {hero.time || event.time}
                </span>

                <span className="flex items-center gap-2">
                  <Monitor size={18} />
                  {hero.platform || event.location}
                </span>
              </div>

              <p className="text-white/90 text-[13px] max-[670px]:text-[12px] leading-[1.7] mt-3 max-w-[520px] max-[670px]:max-w-full">
                {basic?.shortDescription || event.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href={hero.ctaUrl || event.link || "https://membership.siaresociety.org/register"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="group h-[44px] px-6 max-[670px]:px-4 rounded-[8px] bg-[linear-gradient(180deg,#ffe29a_0%,#eeba47_48%,#c8932a_100%)] text-white font-bold text-[13px] max-[670px]:text-[11px] flex items-center justify-center gap-2 border border-[#d4aa35] shadow-[0_10px_22px_rgba(226,172,57,0.28)] transition-all duration-500 ease-out hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white hover:bg-[linear-gradient(180deg,#fff0bc_0%,#eeba47_48%,#b9851e_100%)] hover:shadow-[0_18px_36px_rgba(226,172,57,0.50)] active:scale-[0.96]">
                 {hero.ctaText || "REGISTER NOW"}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </a>

                <button className="group h-[44px] px-6 max-[670px]:px-4 rounded-[8px] border border-white/70 bg-white/8 backdrop-blur-sm text-white font-bold text-[13px] max-[670px]:text-[11px] flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#e2ac39] hover:text-white hover:-translate-y-[3px] hover:scale-[1.03] active:scale-[0.96]">
                  <CalendarDays size={16} />
                  ADD TO CALENDAR
                </button>

                <button className="group h-[44px] w-[44px] max-[670px]:w-[44px] max-[670px]:h-[44px] rounded-[8px] border border-white/70 bg-white/8 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-500 hover:bg-[#e2ac39] hover:text-white hover:-translate-y-[3px] hover:border-[#e2ac39] active:scale-[0.92]">
                  <Share2 size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="relative -mt-10 z-10">
        <div className="w-full xl:max-w-[1150px] lg:max-w-[950px] mx-auto px-5">
          <div className="bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,.12)] border border-[#e5e7eb] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-hidden">
           {[
  ["DATE", infoBar.date || event.date, CalendarDays],
  ["TIME", infoBar.time || event.time, Clock],
  ["EVENT TYPE", infoBar.eventType || event.type, Monitor],
  ["LOCATION", infoBar.platform || event.location, Laptop],
  ["SPEAKER", infoBar.mainSpeaker || event.speaker, Users],
  ["STATUS", infoBar.status || event.status, CheckCircle],
].map(([title, value, Icon], i) => (
              <div key={i} className="group relative p-5 flex gap-3 border-r border-b lg:border-b-0 last:border-r-0 border-[#dce3ee] transition-all duration-300 hover:bg-[#faf7ff] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(124,58,237,0.12)] hover:z-10">
                <Icon size={28} className="text-[#0055e0] shrink-0 transition-all duration-300 group-hover:scale-110 mt-2" />
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#071d4f] transition-all duration-300">{title}</p>
                  <p className="text-[13px] font-bold text-[#071d4f] mt-1 transition-all duration-300 group-hover:translate-x-[2px]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-9 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <BlockTitle title={about.title || "About The Webinar"} />

          <p className="text-[#041743] text-[14px] leading-[1.65] mb-4 w-full max-w-[580px]">
            {about.description || event.description}
          </p>

          <BlockTitle title="Topics To Be Covered" className="mt-8" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topics.map((topic, i) => {
              const Icon = iconMap[topic.icon] || BookOpen;

              return (
                <div key={i} className="group border border-[#dce3ee] rounded-[8px] p-4 text-center bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#e2ac39]/70 hover:shadow-[0_14px_30px_rgba(0,27,87,0.10)]">
                  <div
                    className="w-[50px] h-[50px] rounded-full mx-auto mb-3 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[6deg]"
                    style={{
                      background: `linear-gradient(180deg, ${topic.color || "#0d6efd"}, ${topic.color || "#0d6efd"}dd)`,
                    }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  <h4 className="text-[#071d4f] text-[12px] font-bold leading-tight transition-all duration-300 group-hover:text-[#b9851e]">
                    {topic.title}
                  </h4>

                  <p className="text-[#334968] text-[10px] leading-[1.45] mt-2">
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>

          <BlockTitle title="How To Join" className="mt-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {joiningSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || ClipboardCheck;

              return (
                <div key={i} className="group flex items-center gap-4">
                  <div className="w-[58px] h-[58px] rounded-full bg-[linear-gradient(180deg,#1251a0_0%,#0f468d_45%,#071d4f_100%)] text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_rgba(12,48,103,0.30)] transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:bg-[linear-gradient(180deg,#1a63c5_0%,#1251a0_45%,#071d4f_100%)] hover:shadow-[0_16px_30px_rgba(18,81,160,0.45)]">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h4 className="text-[#071d4f] text-[14px] font-bold">
                      {step.title}
                    </h4>
                    <p className="text-[#334968] text-[14px] leading-[1.55]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-3">
          <SideCard title="Registration Details">
            {registrations.map((item, i) => (
              <div key={i} className="group border border-[#dce3ee] rounded-[8px] p-4 flex gap-3 mb-2 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#e2ac39]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#fff7e2] text-[#e2ac39] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#e2ac39] group-hover:text-white group-hover:scale-110">
                  <CalendarCheck size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#071d4f] font-bold text-[13px]">{item.title}</h4>
                  <p className="text-[#334968] text-[12px] mt-1">
                    {item.startDate || item.endDate
                      ? `${item.startDate || ""}${item.startDate && item.endDate ? " - " : ""}${item.endDate || ""}`
                      : "Open Registration"}
                  </p>
                </div>
                <span className="text-[#e2ac39] text-[12px] font-bold">{item.fee}</span>
              </div>
            ))}

            <a
              href={registrations?.[0]?.url || hero.ctaUrl || event.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <button className="group w-full h-[42px] bg-[linear-gradient(180deg,#ffe29a_0%,#c8932a_48%,#eeba47_100%)] hover:text-[#071d4f] rounded-[6px] font-bold text-[13px] flex justify-center items-center gap-2 transition-all duration-300 hover:-translate-y-1 text-white hover:shadow-[0_12px_26px_rgba(226,172,57,0.38)] active:scale-[0.97]">
                {detail?.hero?.ctaText || "REGISTER NOW"}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button> */}
            </a>
          </SideCard>

          <SideCard title="Who Should Attend?">
            {targetAudience.map((item, i) => (
              <p key={i} className="group text-[#071d4f] text-[12px] flex items-center gap-2 mb-1 transition-all duration-300 hover:translate-x-1 hover:text-[#b9851e]">
                <CheckCircle size={14} className="text-[#e2ac39] shrink-0 transition-all duration-300 group-hover:scale-125" />
                {item.title}
              </p>
            ))}
          </SideCard>

          <SideCard title="Webinar Highlights">
            {highlights.map((item, i) => (
              <p key={i} className="group text-[#071d4f] text-[12px] flex items-center gap-2 mb-1 transition-all duration-300 hover:translate-x-1 hover:text-[#b9851e]">
                <CheckCircle size={14} className="text-[#e2ac39] shrink-0 transition-all duration-300 group-hover:scale-125" />
                {item.title}
              </p>
            ))}
          </SideCard>

          <SideCard title="Event Organizer">
           {[
  [Users, `${organizer.name || ""} ${organizer.description || ""}`.trim()],
  [Mail, organizer.email],
  [Globe, organizer.website],
  [Phone, organizer.phone],
]
  .filter(([, text]) => text)
  .map(([Icon, text], i) => (
                <p key={i} className="group flex items-center gap-3 text-[12px] text-[#071d4f] mb-2 last:mb-0 transition-all duration-300 hover:translate-x-1 hover:text-[#b9851e]">
                  <span className="w-[30px] h-[30px] rounded-full bg-[#fff7e2] text-[#e2ac39] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#e2ac39] group-hover:text-white group-hover:scale-110">
                    <Icon size={15} />
                  </span>
                  {text}
                </p>
              ))}
          </SideCard>
        </aside>
      </section>

      {/* CTA */}
      <section className="w-full pb-8">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="group relative overflow-hidden rounded-[10px] px-5 sm:px-7 py-4 flex flex-col md:flex-row items-center justify-between gap-5 text-white bg-[linear-gradient(90deg,#071d4f_0%,#082965_45%,#061b45_100%)] border border-[#143a77] shadow-[0_14px_32px_rgba(7,29,79,0.22)] transition-all duration-500 hover:shadow-[0_18px_42px_rgba(7,29,79,0.34)]">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-full border-2 border-[#e2ac39] bg-[#082965] flex items-center justify-center text-[#e2ac39] transition-all duration-500">
                <CalendarDays size={24} />
              </div>

              <p className="font-semibold text-[14px] sm:text-[16px] leading-[1.55] max-w-[480px]">
               {cta.description || "Gain valuable insights and learn best practices for ethical and impactful research publishing."}
              </p>
            </div>

            <a
              href={cta.buttonUrl || hero.ctaUrl || event.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="group/btn relative h-[46px] px-8 rounded-[26px] bg-[linear-gradient(180deg,#ffe29a_0%,#eeba47_48%,#c8932a_100%)] border border-[#d4aa35] text-[#071d4f] font-bold text-[13px] uppercase flex items-center justify-center gap-3 shadow-[0_10px_24px_rgba(226,172,57,0.28)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:text-white hover:shadow-[0_16px_34px_rgba(226,172,57,0.42)] w-full sm:w-auto">
                {cta.buttonText || "REGISTER NOW"}
                <ArrowRight size={18} className="transition-all duration-300 group-hover/btn:translate-x-1" />
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function BlockTitle({ title, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-[#071d4f] font-bold uppercase text-[20px]">{title}</h2>
      <div className="w-[52px] h-[3px] rounded-sm bg-[#e2ac39] mt-2" />
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