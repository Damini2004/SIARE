// API Integration: events loaded from GET /api/events
import { useState, useEffect } from "react";
import {
  Send,
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  MonitorPlay,
  GraduationCap,
  Handshake,
  Globe2,
  Lightbulb,
  TrendingUp,
  FileCheck2,
  UsersRound,
} from "lucide-react";
import { getEvents } from "../api/eventApi";
import eventsImg from "../assets/events.png";
import event1 from "../assets/event1.png";
import event2 from "../assets/event2.png";
import event3 from "../assets/event3.png";
import event4 from "../assets/event4.png";
import quoteBg from "../assets/temp.webp";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
  "http://localhost:5000";

const getImageSrc = (url, fallback = event1) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const staticEvents = [
  { icon: Users, text: "INTERNATIONAL\nCONFERENCES" },
  { icon: MonitorPlay, text: "WEBINARS" },
  { icon: GraduationCap, text: "SUMMER SCHOOLS" },
  { icon: Handshake, text: "INDUSTRY\nCOLLABORATIONS" },
];

const events = [
  {
    img: event1,
    date: "2025-07-15",
    type: "International Conference",
    typeColor: "text-siare-green",
    title: "International Conference on Engineering & Technology",
    location: "Dubai, UAE",
    btnColor: "border-siare-green text-siare-green hover:bg-siare-green",
    dateBg: "bg-[#43aa37]",
    route: "/eventConference",
  },
  {
    img: event2,
    date: "2025-08-22",
    type: "International Conference",
    typeColor: "text-orange-500",
    title: "Global Conference on Sustainability & Environment",
    location: "Copenhagen, Denmark",
    btnColor: "border-orange-400 text-orange-500 hover:bg-orange-500",
    dateBg: "bg-[#f97316]",
    route: "/eventConference",
  },
  {
    img: event3,
    date: "2025-09-10",
    type: "Workshop",
    typeColor: "text-red-500",
    title: "Workshop on Artificial Intelligence & Data Science",
    location: "Singapore",
    btnColor: "border-red-400 text-red-500 hover:bg-red-500",
    dateBg: "bg-[#ff352e]",
    route: "/eventWorkshop",
  },
  {
    img: event4,
    date: "2025-10-05",
    type: "Webinar",
    typeColor: "text-siare-blue",
    title: "Webinar on Research Publishing & Ethics",
    location: "Online",
    btnColor: "border-siare-blue text-siare-blue hover:bg-siare-blue",
    dateBg: "bg-[#1558c8]",
    route: "/eventWebinar",
  },
];

const benefits = [
  {
    icon: Globe2,
    color: "text-[#43aa37]",
    title: "GLOBAL NETWORKING",
    desc: "Connect with researchers, professionals, and institutions worldwide.",
  },
  {
    icon: Lightbulb,
    color: "text-[#f6a313]",
    title: "KNOWLEDGE SHARING",
    desc: "Exchange ideas and research findings across diverse disciplines.",
  },
  {
    icon: TrendingUp,
    color: "text-[#ff352e]",
    title: "CAREER GROWTH",
    desc: "Enhance your academic profile and professional opportunities.",
  },
  {
    icon: FileCheck2,
    color: "text-[#0875c9]",
    title: "CERTIFICATION",
    desc: "Receive e-certificates for participation and presentation.",
  },
  {
    icon: UsersRound,
    color: "text-[#7a45c9]",
    title: "REAL IMPACT",
    desc: "Collaborate on solutions that address global challenges.",
  },
];

export default function Events() {
  const [apiEvents, setApiEvents] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  useEffect(() => {
    getEvents({ limit: 100 })
      .then((res) => {
        console.log("Events API:", res);
        const rows = res?.rows || res?.data || [];
        setApiEvents(rows.length > 0 ? rows : null);
      })
      .catch((err) => {
        console.log("Events Error:", err);
        setApiEvents(null);
      })
      .finally(() => {
        setEventsLoading(false);
      });
  }, []);

  const mapApiEvent = (ev) => {
    const typeMap = {
      conference: {
        typeColor: "text-[#c8932a]",
        btnColor: "border-[#c8932a] text-[#c8932a] hover:bg-[#c8932a]",
        dateBg: "bg-[#c8932a]",
        route: "/eventConference",
      },
      webinar: {
        typeColor: "text-[#c8932a]",
        btnColor: "border-[#c8932a] text-[#c8932a] hover:bg-[#c8932a]",
        dateBg: "bg-[#c8932a]",
        route: "/eventWebinar",
      },
      workshop: {
        typeColor: "text-[#c8932a]",
        btnColor: "border-[#c8932a] text-[#c8932a] hover:bg-[#c8932a]",
        dateBg: "bg-[#c8932a]",
        route: "/eventWorkshop",
      },
    };

    const style = typeMap[ev.type?.toLowerCase()] || typeMap.conference;

    return {
      id: ev.id,
      img: getImageSrc(ev.imageUrl, event1),
      imageUrl: ev.imageUrl,
      date: ev.date || "",
      time: ev.time || "",
      type: ev.type
        ? ev.type.charAt(0).toUpperCase() + ev.type.slice(1)
        : "Event",
      rawType: ev.type,
      typeColor: style.typeColor,
      title: ev.title,
      description: ev.description,
      speaker: ev.speaker,
      instructor: ev.instructor,
      location: ev.location || "Online",
      link: ev.link,
      status: ev.status,
      btnColor: style.btnColor,
      dateBg: style.dateBg,
      route: style.route,
    };
  };

  const displayEvents = apiEvents ? apiEvents.map(mapApiEvent) : events;
  const totalPages = Math.ceil(displayEvents.length / eventsPerPage);

  const paginatedEvents = displayEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="animate-fade-in">
      <section
        className="relative min-h-[340px] md:min-h-[360px] lg:h-[400px] flex items-center overflow-hidden bg-[#001247]"
        style={{
          backgroundImage: `url(${eventsImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#001247]/25"></div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-[560px]">
            <h1 className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[40px] font-bold text-white uppercase leading-[1.05] tracking-tight">
              EVENTS THAT
              <br />
              <span className="text-[#43aa37]">INSPIRE KNOWLEDGE.</span>
              <br />
              <span className="text-[#f6a313]">DRIVE INNOVATION.</span>
            </h1>

            <div className="flex mt-5 mb-6 overflow-hidden rounded-full w-fit">
              <span className="h-[4px] w-[30px] sm:w-[50px] bg-[#43aa37]"></span>
              <span className="h-[4px] w-[30px] sm:w-[50px] bg-[#f6a313]"></span>
              <span className="h-[4px] w-[30px] sm:w-[50px] bg-[#ff352e]"></span>
              <span className="h-[4px] w-[30px] sm:w-[50px] bg-[#0875c9]"></span>
            </div>

            <p className="text-white text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.55] mb-8 max-w-[560px]">
              SIARE organizes and collaborates in academic events that bring
              together global researchers, innovators, and industry leaders to
              exchange ideas and create impact.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <button className="group bg-[#c8932a] text-white font-semibold px-7 py-3 rounded-[50px] flex items-center gap-2 text-[12px] uppercase transition-all duration-300 hover:bg-[#d9a53b] hover:shadow-[0_8px_22px_rgba(200,147,42,0.35)] hover:-translate-y-[2px] active:scale-[0.98]">
                  <Send size={14} />
                  <span>SUBMIT PROPOSAL</span>
                </button>
              </Link>

              <a
                href="https://academicproceeding.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group border border-[#c8932a] bg-[#c8932a]/10 text-[#f7d38a] font-semibold px-7 py-3 rounded-[50px] flex items-center gap-2 text-[12px] uppercase transition-all duration-300 hover:bg-[#c8932a] hover:text-white hover:shadow-[0_8px_22px_rgba(200,147,42,0.28)] hover:-translate-y-[2px] active:scale-[0.98]">
                  <Calendar size={14} />
                  <span>BROWSE PROCEEDINGS</span>
                </button>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-col w-[180px] shrink-0 text-white">
            {staticEvents.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="group flex items-center gap-4 py-[13px] border-b border-white/20 cursor-pointer transition-all duration-300 hover:translate-x-2"
                >
                  <div className="w-[50px] h-[50px] rounded-full border-2 border-[#0875c9] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-[#ffb347] group-hover:shadow-[0_0_20px_rgba(67,170,55,0.45)]">
                    <Icon
                      size={24}
                      strokeWidth={2.2}
                      className="text-white transition-all duration-300 group-hover:text-[#ffb347]"
                    />
                  </div>

                  <span className="whitespace-pre-line text-[14px] font-normal leading-[1.25] uppercase tracking-wide transition-all duration-300 group-hover:text-[#ffb347]">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-6 px-4 bg-gray-50">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="flex flex-col items-center text-center mb-[22px]">
            <h2 className="text-[22px] md:text-[24px] font-bold text-[#001b57] uppercase">
              UPCOMING EVENTS
            </h2>

            <div className="flex mt-3 mb-2 overflow-hidden rounded-full w-fit">
              <span className="h-[4px] w-[30px] sm:w-[40px] bg-[#43aa37]"></span>
              <span className="h-[4px] w-[30px] sm:w-[40px] bg-[#f6a313]"></span>
              <span className="h-[4px] w-[30px] sm:w-[40px] bg-[#ff352e]"></span>
              <span className="h-[4px] w-[30px] sm:w-[40px] bg-[#0875c9]"></span>
            </div>

            <p className="mx-auto text-[14px] md:text-[14px] leading-[1.55] font-medium text-[#001b57]">
              Discover our list of upcoming academic events happening around the
              world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[28px] max-w-[1200px] mx-auto">
            {eventsLoading
              ? [1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-[12px] overflow-hidden border border-[#e6edf5] animate-pulse"
                  >
                    <div className="h-[160px] bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                      <div className="h-9 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))
              : paginatedEvents.map((ev) => (
                  <div
                    key={ev.id || ev.title}
                    className="group bg-white rounded-[12px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-[#e6edf5] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_38px_rgba(0,0,0,0.18)]"
                  >
                    <div className="relative h-[160px] overflow-hidden">
                      <img
                        src={ev.img}
                        alt={ev.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />

                      <div
                        className={`absolute top-[14px] left-[14px] w-[50px] h-[75px] rounded-[10px] flex flex-col items-center justify-center text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] ${ev.dateBg}`}
                      >
                        <Calendar size={14} strokeWidth={2.5} />

                        <span className="text-[13px] font-bold leading-none mt-[4px]">
                          {ev.date ? new Date(ev.date).getDate() : "-"}
                        </span>

                        <span className="text-[11px] font-semibold uppercase leading-none mt-[2px]">
                          {ev.date
                            ? new Date(ev.date).toLocaleString("en-US", {
                                month: "short",
                              })
                            : "-"}
                        </span>

                        <span className="text-[11px] font-bold leading-none mt-[2px]">
                          {ev.date ? new Date(ev.date).getFullYear() : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="px-[18px] pt-[18px] pb-[20px]">
                      <div
                        className={`flex items-center gap-2 text-[13px] font-bold ${ev.typeColor} mb-[14px]`}
                      >
                        <Calendar size={15} strokeWidth={2.4} />
                        {ev.type}
                      </div>

                      <h4 className="font-semibold text-[#001b57] text-[15px] leading-[1.25] mb-[12px] min-h-[44px]">
                        {ev.title}
                      </h4>

                      <div className="flex items-center gap-2 text-[#001b57] text-[13px] font-medium mb-[22px]">
                        <MapPin size={15} />
                        {ev.location}
                      </div>

                      <Link to={`${ev.route}/${ev.id}`} state={{ event: ev }}>
                        <button
                          className={`group/btn border ${ev.btnColor} font-semibold px-4 py-[10px] rounded-[10px] flex items-center justify-center gap-8 text-[13px] uppercase transition-all duration-300 w-full hover:text-white`}
                        >
                          VIEW DETAILS
                          <ArrowRight
                            size={20}
                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-[30px]">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="w-[40px] h-[40px] rounded-full border border-[#e2ac39] text-[#071d4f] font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:bg-[#e2ac39] hover:text-white"
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-[38px] h-[38px] rounded-full font-bold text-[13px] transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-[#e2ac39] text-white shadow-[0_8px_18px_rgba(226,172,57,0.35)]"
                      : "bg-white text-[#071d4f] border border-[#d9e3ef] hover:border-[#e2ac39]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-[40px] h-[40px] rounded-full border border-[#e2ac39] text-[#071d4f] font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:bg-[#e2ac39] hover:text-white"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}