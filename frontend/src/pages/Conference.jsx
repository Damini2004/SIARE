import {
  CalendarDays,
  MapPin,
  Users,
  Target,
  CheckCircle,
  Download,
  Share2,
  ArrowRight,
  Settings,
  Building2,
  Cpu,
  Laptop,
  TrendingUp,
  HeartPulse,
  Leaf,
  MoreHorizontal,
  Mail,
  Phone,
  Globe,
  CalendarCheck,
  ClipboardCheck,
} from "lucide-react";
import conferenceImg from "../assets/conferencebg.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getEventById } from "../api/eventApi";
import { getConferenceContent } from "../api/conferenceApi";
import conf from "../assets/conf.png";

const iconMap = {
  CalendarDays,
  MapPin,
  Users,
  Settings,
  Building2,
  Cpu,
  Laptop,
  TrendingUp,
  HeartPulse,
  Leaf,
  MoreHorizontal,
  CheckCircle,
};

function IconByName({ name, ...props }) {
  const Icon = iconMap[name] || CheckCircle;
  return <Icon {...props} />;
}

export default function EventDetailsMiddle() {
  const { id } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(location.state?.event || null);
  const [content, setContent] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const conferenceId = id || location.state?.event?.id;

        if (!conferenceId) return;

        const contentRes = await getConferenceContent(conferenceId);

        console.log("Conference CMS", contentRes);

        setContent(contentRes?.detail || contentRes?.data?.detail || {});

        setEvent(
          contentRes?.event ||
            contentRes?.data?.event ||
            location.state?.event ||
            {},
        );
      } catch (err) {
        console.log("Conference Load Error", err);
      }
    }

    load();
  }, [id]);

  if (!event) {
    return (
      <div className="py-40 text-center text-[#071d4f] font-bold">
        Loading event details...
      </div>
    );
  }

  const basic = content?.basic || {};
  const hero = content?.hero || {};
  const infoBar = content?.infoBar || {};
  const about = content?.about || {};
  const venue = content?.venue || {};
  // const organizer = content?.organizer || {};
  const cta = content?.cta || {};
  const title = content?.basic?.title || event?.title || "Conference";

  const themes = content?.themes || [];

  const registrations = content?.registrations || [];

  const highlights = content?.highlights || [];

  const importantDates = content?.importantDates || [];
  const registerUrl =
    hero.ctaUrl || event.link || "https://membership.siaresociety.org/register";
  console.log("Hero Background:", hero.backgroundImage);

  return (
    <main className="w-full bg-white">
      {/* HERO */}
      <section
        className="
    relative
    bg-[#061b45]
    overflow-hidden

    min-h-[420px]
    max-[670px]:min-h-[400px]
    max-[480px]:min-h-[470px]
    max-[344px]:min-h-[505px]
    max-[320px]:min-h-[540px]
  "
        style={{
          backgroundImage: `url(${
            hero?.backgroundImage
              ? hero.backgroundImage.startsWith("http")
                ? hero.backgroundImage
                : `http://localhost:5000${hero.backgroundImage}`
              : conferenceImg
          })`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="
      w-full max-w-[1320px] mx-auto
      px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
      py-8 max-[670px]:py-6
    "
        >
          {/* Breadcrumbs */}
          <div
            className="
        text-white/80
        text-[12px] max-[670px]:text-[11px]
        mb-8 max-[670px]:mb-5
        flex flex-wrap items-center gap-2
      "
          >
            <Link
              to="/"
              className="hover:text-[#e2ac39] transition-colors duration-300"
            >
              Home
            </Link>

            <span>›</span>

            <Link
              to="/events"
              className="hover:text-[#e2ac39] transition-colors duration-300"
            >
              Events
            </Link>

            <span>›</span>

            <span className="hidden sm:block">
              {content?.basic?.title || event.title}
            </span>
          </div>

          <div
            className="
        flex flex-row
        gap-5
        max-[670px]:gap-3
        max-[670px]:items-start
      "
          >
            {/* Date Box */}
            <div
              className="
          w-[60px] h-[90px]
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
              <CalendarDays size={22} />

              {(() => {
                const rawDate =
                  hero?.date ||
                  infoBar?.date ||
                  event?.startDate ||
                  event?.date ||
                  "";

                const parsed = rawDate ? new Date(rawDate) : null;

                const valid = parsed && !isNaN(parsed.getTime());

                return (
                  <>
                    <span className="text-[14px] max-[670px]:text-[13px] leading-none mt-1">
                      {valid ? parsed.getDate() : "15"}
                    </span>

                    <span className="text-[13px] max-[670px]:text-[12px] mt-1">
                      {valid
                        ? parsed
                            .toLocaleString("en-US", { month: "short" })
                            .toUpperCase()
                        : "JUL"}
                    </span>

                    <span className="text-[14px] max-[670px]:text-[13px]">
                      {valid ? parsed.getFullYear() : "2025"}
                    </span>
                  </>
                );
              })()}
            </div>

            {/* Content */}
            <div className="w-full max-w-[680px] min-w-0">
              <p
                className="
            text-white
            text-[12px] max-[670px]:text-[11px]
            font-medium
            uppercase
            flex items-center gap-2
            mb-1
          "
              >
                <CalendarDays size={15} />
                {basic.type || event.type || "Conference"}
              </p>

              <h1
                className="
            text-white
            text-[1.2rem]
            sm:text-[1.6rem]
            lg:text-[1.9rem]
            max-[670px]:text-[1.28rem]
            max-[420px]:text-[1.08rem]
            font-bold
            leading-[1.15]
            w-full max-w-[550px]
          "
              >
                {title}
              </h1>

              <div
                className="
            flex flex-wrap
            gap-6 max-[670px]:gap-4
            mt-5 max-[670px]:mt-4
            text-white
            text-[14px] max-[670px]:text-[12px]
          "
              >
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {hero.location || event.location || "Global Event"}
                </span>

                <span className="flex items-center gap-2">
                  <Users size={18} />
                  In-Person Event
                </span>
              </div>

              <p
                className="
            text-white/90
            text-[13px] max-[670px]:text-[12px]
            leading-[1.7]
            mt-3
            max-w-[420px]
            max-[670px]:max-w-full
          "
              >
                {basic.shortDescription ||
                  about.description ||
                  event.description}
              </p>

              <div
                className="
            flex flex-wrap
            gap-3
            mt-4
          "
              >
                <a href={registerUrl} target="_blank" rel="noopener noreferrer">
                  <button
                    className="
      group

      h-[44px]
      px-6 max-[670px]:px-4

      rounded-[8px]

      bg-[linear-gradient(180deg,#eebb48_0%,#d3aa51_55%,#b88922_100%)]

      text-[#eff1f6]

      font-bold
      text-[13px] max-[670px]:text-[11px]

      flex items-center justify-center gap-2

      border border-[#d8a73b]

      shadow-[0_10px_22px_rgba(238,187,72,0.28)]

      transition-all duration-500 ease-out

      hover:-translate-y-[3px]
      hover:scale-[1.03]
      hover:bg-[linear-gradient(180deg,#ffd56a_0%,#eebb48_45%,#b97d12_100%)]
      hover:shadow-[0_18px_36px_rgba(238,187,72,0.50)]

      active:scale-[0.96]
    "
                  >
                    <CalendarDays
                      size={16}
                      className="
        transition-all duration-300
        group-hover:rotate-[-10deg]
      "
                    />
                    {hero.ctaText || "REGISTER NOW"}
                  </button>
                </a>
                {/* DOWNLOAD */}

                <a
                  href={hero.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      group
      h-[44px]
      px-6 max-[670px]:px-4
      rounded-[8px]
      border border-white/70
      bg-white/8
      backdrop-blur-sm
      text-white
      font-bold
      text-[13px] max-[670px]:text-[11px]
      flex items-center justify-center gap-2
      transition-all duration-500
      hover:bg-[#d8a73b]
      hover:text-white
      hover:-translate-y-[3px]
      hover:scale-[1.03]
      hover:shadow-[0_16px_34px_rgba(255,255,255,0.18)]
      active:scale-[0.96]
    "
                >
                  <Download size={16} />
                  DOWNLOAD BROCHURE
                </a>

                {/* SHARE */}
                <Link to="/">
                  <button
                    className="
              group

              h-[44px]
              w-[44px]

              max-[670px]:w-[44px]
              max-[670px]:h-[44px]

              rounded-[8px]

              border border-white/70

              bg-white/8
              backdrop-blur-sm

              text-white

              flex items-center justify-center

              transition-all duration-500

              hover:bg-[linear-gradient(180deg,#eebb48_0%,#d3aa51_55%,#b88922_100%)]
              hover:text-[#071d4f]
              hover:-translate-y-[3px]
              hover:border-[#d8a73b]
              hover:shadow-[0_16px_30px_rgba(238,187,72,0.40)]

              active:scale-[0.92]
            "
                  >
                    <Share2
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="relative -mt-10 z-10">
        <div className="w-full xl:max-w-[1150px] lg:max-w-[950px] mx-auto px-5">
          <div
            className="
        bg-white
        rounded-[10px]

        shadow-[0_8px_24px_rgba(0,0,0,.12)]

        border border-[#e5e7eb]

        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-6

        overflow-hidden
      "
          >
            {[
              [
                "DATE",
                infoBar.date || hero.date || event.date || "-",
                CalendarDays,
              ],
              [
                "LOCATION",
                infoBar.location || hero.location || event.location || "-",
                MapPin,
              ],
              [
                "EVENT TYPE",
                infoBar.eventType || basic.type || "Conference",
                Users,
              ],
              ["SPEAKER", infoBar.mainSpeaker || event.speaker || "-", Users],
              [
                "ORGANIZED BY",
                infoBar.organizedBy || event.instructor || "SIARE",
                Target,
              ],
              [
                "EVENT STATUS",
                infoBar.status || event.status || "Upcoming",
                CheckCircle,
              ],
            ].map(([title, value, Icon], i) => (
              <div
                key={i}
                className="
            group

            relative

            p-5

            flex gap-3

            border-r
            border-b

            lg:border-b-0

            last:border-r-0

            border-[#dce3ee]

            transition-all
            duration-400

            hover:bg-[linear-gradient(180deg,#ffffff_0%,#fffaf0_100%)]

            hover:-translate-y-[3px]

            hover:shadow-[0_14px_28px_rgba(216,167,59,0.12)]

            hover:z-10
          "
              >
                {/* Icon */}
                <Icon
                  size={28}
                  className="
              text-[#0d6efd]

              shrink-0

              transition-all
              duration-300

              group-hover:text-[#d8a73b]

              group-hover:scale-110

              group-hover:-rotate-6
            "
                />

                {/* Text */}
                <div>
                  <p
                    className="
                text-[11px]
                font-bold
                uppercase

                text-[#071d4f]

                transition-all
                duration-300

                group-hover:text-[#b88922]
              "
                  >
                    {title}
                  </p>

                  <p
                    className="
                text-[13px]
                font-bold

                text-[#071d4f]

                mt-1

                transition-all
                duration-300

                group-hover:translate-x-[2px]
              "
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="w-full max-w-[1320px] mx-auto
      px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-9 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8"
      >
        <div>
          <BlockTitle title={about.title || "About The Event"} />

          <div
            className="
      transition-all duration-300
      hover:translate-x-1
    "
          >
            <p className="text-[#041743] text-[14px] leading-[1.65] mb-4 w-full max-w-[610px]">
              {about.description || basic.fullDescription || event.description}
            </p>

            {about.secondDescription && (
              <p className="text-[#041743] text-[14px] leading-[1.65] w-full max-w-[610px]">
                {about.secondDescription}
              </p>
            )}
          </div>

          <BlockTitle title="Conference Themes" className="mt-9" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((item, i) => (
              <div
                key={i}
                className="
group
border border-[#dce3ee]
rounded-[8px]
p-4
text-center
bg-white
transition-all duration-300
hover:-translate-y-1
hover:border-[#d8a73b]/70
"
              >
                <IconByName
                  name={item.icon}
                  size={30}
                  style={{
                    color: item.color || "#0d6efd",
                  }}
                  className="
mx-auto mb-3
group-hover:scale-110
"
                />

                <h4
                  className="
text-[#071d4f]
text-[13px]
font-bold
"
                >
                  {item.title}
                </h4>

                <p
                  className="
text-[#334968]
text-[11px]
mt-2
"
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <BlockTitle
            title={venue.title || "Venue Information"}
            className="mt-9"
          />

          <div className="grid md:grid-cols-2 gap-5 items-center">
            <div className="overflow-hidden rounded-[8px]">
              <img
                src={
                  venue?.image
                    ? venue.image.startsWith("http")
                      ? venue.image
                      : `${import.meta.env.VITE_API_URL}${venue.image}`
                    : conf
                }
                alt={venue.location || "Conference Venue"}
                className="
      rounded-[8px]
      h-[180px]
      w-full
      object-cover
      transition-all duration-500
      hover:scale-105
    "
                onError={(e) => {
                  e.target.src = conf;
                }}
              />
            </div>

            <div>
              <h4 className="text-[#071d4f] font-bold text-[15px] mb-1">
                {venue.location || "Nagpur"}
              </h4>

              <p className="text-[#334968] text-[13px] mb-2">
                {venue.subAddress || "Venue information will be updated soon."}
              </p>

              {[
                "State-of-the-art conference facilities",
                "High-speed internet connectivity",
                "Accessible location with transport links",
                "Nearby accommodation and dining options",
              ].map((x, i) => (
                <p
                  key={i}
                  className="group text-[#071d4f] text-[12px] mb-1 flex gap-2 transition-all duration-300 hover:translate-x-1 hover:text-[#b88922]"
                >
                  <CheckCircle
                    size={14}
                    className="text-[#d8a73b] shrink-0 transition-all duration-300 group-hover:scale-125"
                  />
                  {x}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-3">
          {/* Registration Details */}
          <SideCard title="Registration Details">
            {registrations.length > 0 ? (
              registrations.map((item, i) => {
                const Icon =
                  i === 0
                    ? CalendarCheck
                    : i === 1
                      ? CalendarDays
                      : ClipboardCheck;

                return (
                  <div
                    key={i}
                    className="
            group
            border border-[#dce3ee]
            rounded-[8px]
            p-4
            flex gap-3
            mb-2
            bg-white
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#d8a73b]
          "
                  >
                    <div
                      className="
              w-[38px] h-[38px]
              rounded-full
              bg-[#fff6dc]
              text-[#d8a73b]
              flex items-center justify-center
              shrink-0
              transition-all duration-300
              group-hover:bg-[#d8a73b]
              group-hover:text-white
              group-hover:scale-110
            "
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <h4 className="text-[#071d4f] font-bold text-[13px]">
                        {item.title}
                      </h4>

                      <p className="text-[#334968] text-[12px] mt-1">
                        {item.date ||
                          item.description ||
                          item.endDate ||
                          item.startDate ||
                          "-"}
                      </p>

                      {(item.fee || item.currency) && (
                        <p className="text-[#b88922] text-[12px] font-bold mt-1">
                          {item.currency ? `${item.currency} ` : ""}
                          {item.fee}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-[#334968] text-[12px]">
                Registration details will be updated soon.
              </p>
            )}
          </SideCard>

          {/* Conference Highlights */}
          <SideCard title="Conference Highlights">
            {highlights.length ? (
              highlights.map((item, i) => (
                <p
                  key={i}
                  className="
          group
          text-[#071d4f]
          text-[12px]
          flex items-center
          gap-2
          mb-1

          transition-all duration-300

          hover:translate-x-1
          hover:text-[#b9851e]
        "
                >
                  <CheckCircle
                    size={14}
                    className="
            text-[#e2ac39]
            shrink-0
            transition-all duration-300
            group-hover:scale-125
          "
                  />

                  {item.title}
                </p>
              ))
            ) : (
              <p className="text-[#334968] text-[12px]">
                Conference highlights will be updated soon.
              </p>
            )}
          </SideCard>

          {/* Important Dates */}
          <SideCard title="Important Dates">
            {importantDates.map((item, i) => (
              <p
                key={i}
                className="group text-[#071d4f] text-[12px] flex gap-2 mb-3 leading-[1.45] transition-all duration-300 hover:translate-x-1 hover:text-[#b88922]"
              >
                <span className="w-3 h-3 rounded-full border-2 border-[#d8a73b] mt-1 shrink-0 transition-all duration-300 group-hover:bg-[#d8a73b] group-hover:scale-125" />
                {item.date} - {item.title}
              </p>
            ))}
          </SideCard>

          {/* Contact Organizer */}
          <SideCard title="Contact Organizer">
            {[
              [Mail, content?.organizer?.email],

              [Phone, content?.organizer?.phone],

              [Globe, content?.organizer?.website],
            ].map(([Icon, text], i) => (
              <p
                key={i}
                className="
          group
          flex items-center gap-3
          text-[12px]
          text-[#071d4f]
          mb-2 last:mb-0
          transition-all duration-300
          hover:translate-x-1
          hover:text-[#b88922]
        "
              >
                <span
                  className="
            w-[30px] h-[30px]
            rounded-full
            bg-[#fff6dc]
            text-[#d8a73b]
            flex items-center justify-center
            shrink-0
            transition-all duration-300
            group-hover:bg-[#d8a73b]
            group-hover:text-white
            group-hover:scale-110
          "
                >
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
        <div
          className="
      w-full
      max-w-[1320px]
      mx-auto
      px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
    "
        >
          <div
            className="
        group

        relative
        overflow-hidden

        rounded-[10px]

        px-5
        sm:px-7

        py-4

        flex
        flex-col
        md:flex-row

        items-center
        justify-between

        gap-5

        text-white

        bg-[linear-gradient(90deg,#071d4f_0%,#082965_45%,#061b45_100%)]

        border border-[#143a77]

        shadow-[0_14px_32px_rgba(7,29,79,0.22)]

        transition-all duration-500

        hover:shadow-[0_18px_42px_rgba(7,29,79,0.34)]
      "
          >
            {/* Background Glow */}
            <div
              className="
          absolute
          inset-0

          opacity-[0.08]

          bg-[radial-gradient(circle_at_right,#eeba47_0%,transparent_45%)]

          group-hover:opacity-[0.18]

          transition-all duration-700
        "
            />

            {/* Left */}
            <div className="relative z-10 flex items-center gap-4">
              {/* Icon */}
              <div
                className="
            w-[52px]
            h-[52px]

            rounded-full

            border-2 border-[#eeba47]

            bg-[#082965]

            flex items-center justify-center

            text-[#eeba47]

            shadow-[0_0_22px_rgba(238,186,71,.18)]

            transition-all duration-500

            
          "
              >
                <Users size={24} strokeWidth={2.3} />
              </div>

              {/* Text */}
              <p
                className="
font-semibold
text-[14px]
sm:text-[16px]
leading-[1.55]
max-w-[360px]
"
              >
                {cta.title ||
                  "Be part of ICET 2025 and contribute to shaping the future of engineering and technology."}
              </p>
            </div>

            {/* Button */}
            <a
              href={cta.buttonUrl || registerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="relative z-10 h-[46px] px-7 rounded-full bg-[linear-gradient(180deg,#f3c04d_0%,#e2ac39_52%,#b9851e_100%)] border border-[#c8932a] text-[#071d4f] text-[13px] uppercase font-bold flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto
"
              >
                {cta.buttonText || "REGISTER NOW"}

                <ArrowRight size={18} />
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
      <h2 className="text-[#071d4f] font-bold uppercase text-[20px]">
        {title}
      </h2>
      <div className="w-[52px] h-[3px] rounded-sm bg-[#d8a73b] mt-2" />
    </div>
  );
}

function SideCard({ title, children }) {
  return (
    <div className="border border-[#dce3ee] rounded-[10px] p-4 bg-white">
      <BlockTitle title={title} />
      {children}
    </div>
  );
}