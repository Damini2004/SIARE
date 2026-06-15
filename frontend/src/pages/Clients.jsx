import {
  ArrowRight,
  Handshake,
  User,
  Globe2, Landmark
} from "lucide-react";

import clientsImg from "../assets/clienttt.png";
import quoteBg from "../assets/temp.webp";

import { useEffect, useState } from "react";

import { getMembers } from "../api/memberApi";
import { getCollaborations } from "../api/collaborationApi";

function UnivCard({ name, region, country, logo }) {
  return (
    <div className="bg-white border border-[#dfe6f2] rounded-[8px] p-3 flex flex-col items-center justify-center text-center cursor-pointer min-h-[145px] shadow-[0_3px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(0,27,87,0.12)]">
      <div className="w-[150px] h-[55px] flex items-center justify-center mb-3">
        <img
          src={logo}
          alt={name}
          className="xl:max-w-[150px] max-h-[65px] md:w-[120px] max-w-[100px] object-contain"
        />
      </div>

      <div className="font-medium text-[#001b57] text-[13px] leading-tight mb-1">
        {name}
      </div>

      <div className="text-[#001b57]/70 text-[12px] font-medium">
        {region || country}
      </div>
    </div>
  );
}

export default function Clients() {
  const [members, setMembers] = useState([]);
  const [collaborations, setCollaborations] = useState([]);

  const recentMembers = members.slice(0, 10);

  useEffect(() => {
    getMembers({ limit: 100 })
      .then((res) => {
        console.log("Members API:", res);

        setMembers(res?.data || res?.rows || []);
      })
      .catch((err) => {
        console.log("Members Error:", err);
      });

    getCollaborations()
      .then((res) => {
        console.log("Collaborations API:", res);

        setCollaborations(res?.data || []);
      })
      .catch((err) => {
        console.log("Collaborations Error:", err);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section
        className="
          relative
          bg-navy
          overflow-hidden

          h-auto
          min-h-[360px]
          sm:min-h-[390px]
          md:min-h-[400px]
          lg:h-[400px]

          flex items-end
        "
        style={{
          backgroundImage: `url(${clientsImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#00153d]/20" />

        <div
          className="
            relative z-10
            w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20

            py-20
            sm:py-12
            md:py-12
            lg:py-16
            xl:py-20
            md:pb-[6rem]
          "
        >
          <h1
            className="
              text-[28px]
              sm:text-[34px]
              md:text-[38px]
              lg:text-[40px]
              xl:text-[42px]

              leading-[0.95]
              font-bold
              text-white
              tracking-tight
            "
          >
            OUR <span className="text-[#f6aa13]">MEMBERS</span>
          </h1>

          <div className="flex mt-3 mb-5 overflow-hidden rounded-full w-fit">
            <span className="h-[4px] w-[24px] sm:w-[36px] bg-[#43aa37]" />
            <span className="h-[4px] w-[24px] sm:w-[36px] bg-[#f6a313]" />
            <span className="h-[4px] w-[24px] sm:w-[36px] bg-[#ff352e]" />
            <span className="h-[4px] w-[24px] sm:w-[36px] bg-[#0875c9]" />
          </div>

          <p
            className="
              text-white
              text-[13px]
              sm:text-[14px]
              md:text-[15px]
              lg:text-[16px]

              leading-[1.55]
              font-normal

              mt-4
              max-w-[390px]
            "
          >
            Building global partnerships for research,
            <br className="hidden sm:block" />
            innovation, and academic excellence.
          </p>

          {/* Stats */}
         <div className="flex flex-wrap gap-4 mt-6">
  <div className="group bg-[#061b45]/80 border border-white/40 rounded-[10px] px-4 h-[100px] min-w-[120px] flex items-center gap-4 transition-all duration-500 hover:-translate-y-2 hover:border-[#38d430] hover:shadow-[0_18px_45px_rgba(56,212,48,0.25)]">
    <Globe2
      size={40}
      strokeWidth={2.5}
      className="text-[#38d430] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
    />

    <div>
      <div className="text-[#38d430] font-bold text-[30px] leading-none">
        {collaborations.length}+
      </div>

      <div className="text-white font-semibold text-[12px] leading-[15px] uppercase mt-2">
        International
        <br />
        Collaborations
      </div>
    </div>
  </div>

  <div className="group bg-[#061b45]/80 border border-white/40 rounded-[10px] px-4 h-[100px] min-w-[190px] flex items-center gap-4 transition-all duration-500 hover:-translate-y-2 hover:border-[#f6aa13] hover:shadow-[0_18px_45px_rgba(246,170,19,0.25)]">
    <Landmark
      size={40}
      strokeWidth={2.5}
      className="text-[#f6aa13] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
    />

    <div>
      <div className="text-[#f6aa13] font-bold text-[30px] leading-none">
        {members.length}+
      </div>

      <div className="text-white font-semibold text-[12px] leading-[15px] uppercase mt-2">
        Registerd
        <br />
        Members
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-10 sm:py-12 lg:py-14 bg-[#f7f8fb]">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-16 bg-[#f6aa13]" />

              <span className="text-[#f6aa13]">◆</span>

              <h2 className="text-[20px] font-bold text-[#001b57] uppercase tracking-wide">
                OUR COLLABORATIONS
              </h2>

              <span className="text-[#f6aa13]">◆</span>

              <div className="h-px flex-1 max-w-16 bg-[#f6aa13]" />
            </div>

            <p className="text-[#001b57] text-[14px] mx-auto font-medium">
              SIARE partners with leading universities and institutions across
              the globe.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {collaborations.map((c) => (
              <UnivCard
                key={c.id}
                name={c.name}
                country={c.country}
                logo={c.logo}
              />
            ))}
          </div>
        </div>
      </section>

<section className="w-full bg-white py-6 sm:py-8 lg:py-10 overflow-hidden">
  <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">

    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}

      {/* Recent Members */}
      <div
        className="
          bg-white
          border border-[#dfe8d8]
          rounded-[18px]
          p-5 sm:p-6
          shadow-[0_10px_28px_rgba(0,0,0,0.05)]
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <User className="text-[#43aa37]" size={30} />

          <h2 className="text-[#071d4f] text-[20px] font-bold uppercase">
            OUR RECENT MEMBERS
          </h2>

          <span className="h-[2px] w-[60px] bg-[#43aa37]" />
        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
  {recentMembers.map((m) => (
    <div
      key={m.id}
      className="
        group
        bg-white
        border border-[#e5e7eb]
        rounded-[12px]
        px-4 py-3
        flex items-center gap-4
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_22px_rgba(67,170,55,0.12)]
        hover:border-[#e2ac39]/40
      "
    >
      <div className="w-[82px] h-[82px] rounded-full overflow-hidden bg-[#f7f8fb] border border-[#e6edf5] flex items-center justify-center shrink-0">
        {m.imageUrl ? (
          <img
            src={
              m.imageUrl.startsWith("http")
                ? m.imageUrl
                : `${
                    import.meta.env.VITE_API_URL?.replace("/api", "") ||
                    "http://localhost:5000"
                  }${m.imageUrl}`
            }
            alt={m.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-[#43aa37]" size={38} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="text-[#071d4f] text-[14px] font-bold leading-tight">
            {m.name}
          </h4>

          {/* <span className="text-[10px] font-bold text-[#43aa37] bg-[#43aa37]/10 px-2 py-[2px] rounded-full">
            {m.memberCode || "Member"}
          </span> */}
        </div>

        <p className="text-black text-[12px] leading-[1.45]">
          <span className="font-semibold">Designation:</span>{" "}
          {m.designation || "-"}
          <br />
          <span className="font-semibold">Department:</span>{" "}
          {m.department || "-"}
        </p>

        {/* <div className="mt-2 space-y-1">
          <p className="text-[#071d4f] text-[11px] leading-tight break-all">
            <span className="font-bold">Email:</span> {m.email || "-"}
          </p>

          <p className="text-[#071d4f] text-[11px] leading-tight">
            <span className="font-bold">Phone:</span> {m.phone || "-"}
          </p>
        </div> */}
      </div>
    </div>
  ))}
</div>

        {/* <div className="text-center mt-4">
          <button
            className="
              h-[40px]
              px-8
              rounded-[5px]
              border border-[#9aa9bd]
              text-[#071d4f]
              font-bold
              text-[13px]
              uppercase
              inline-flex items-center gap-6
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#e2ac39]
              hover:text-white
              hover:border-[#e2ac39]
              
            "
          >
            VIEW ALL RECENT MEMBERS
            <ArrowRight size={18} />
          </button>
        </div> */}
      </div>

      {/* Honorary Members */}
      {/* <div
        className="
          bg-white
          border border-[#f0dfbd]
          rounded-[18px]
          p-5 sm:p-6
          shadow-[0_10px_28px_rgba(0,0,0,0.05)]
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <User className="text-[#e2ac39]" size={30} />

          <h2 className="text-[#071d4f] text-[20px] font-bold uppercase">
            OUR HONORARY MEMBERS
          </h2>

          <span className="h-[2px] w-[60px] bg-[#e2ac39]" />
        </div>
 {honoraryMembers.map((m) => (
  <div
    key={m.id}
    className="group bg-white border border-[#e5e7eb] rounded-[9px] px-3 py-2 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(226,172,57,0.14)] hover:border-[#e2ac39]/45"
  >
    <div className="w-[80px] h-[80px] rounded-full overflow-hidden shrink-0 bg-[#f7f8fb] flex items-center justify-center">
      {m.imageUrl ? (
        <img
          src={m.imageUrl}
          alt={m.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="text-[#e2ac39]" size={28} />
      )}
    </div>

    <div className="flex-1 min-w-0">
      <h4 className="text-[#071d4f] text-[13px] font-bold leading-tight">
        {m.name}
      </h4>

      <p className="text-[#334968] font-medium text-[12px] leading-[1.35]">
        {m.designation}
        <br />
        {m.department}
        <br />
        {m.institution}
      </p>

      <p className="text-[#e2ac39] text-[11px] font-bold mt-1">
        {m.memberCode}
      </p>
    </div>

    <div className="flex items-start gap-2 min-w-[95px]">
      <CalendarDays size={14} className="text-[#e2ac39] mt-[2px]" />
      <p className="text-[#071d4f] text-[11px] leading-[1.3] font-medium">
        Appointed
        <br />
        {m.joinedAt ? String(m.joinedAt).slice(0, 10) : "-"}
      </p>
    </div>
  </div>
))}
      </div> */}

    {/* </div> */}
  </div>
</section>

<section className="w-full py-6 sm:py-8 lg:py-10 overflow-hidden">
        {/* Main Container */}
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div
            className="
        relative overflow-hidden

        rounded-[20px]

        px-5 sm:px-7 lg:px-10
        py-[18px] sm:py-[20px]

        flex flex-col
        md:flex-row

        items-start
        md:items-center

        gap-5 md:gap-8

        shadow-[0_18px_35px_rgba(0,0,0,0.08)]

        transition-all duration-500
        hover:shadow-[0_24px_45px_rgba(0,0,0,0.12)]
      "
            style={{
              backgroundImage: `
          linear-gradient(rgba(0,28,85,0.92), rgba(0,28,85,0.92)),
          url(${quoteBg})
        `,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Handshake Icon */}
              <div
                className="
            w-[50px] h-[50px]
            rounded-full
            border-2 border-[#e2ac39]
            flex items-center justify-center
            shrink-0
          "
              >
                <Handshake className="w-[34px] h-[34px] text-[#e2ac39]" />
              </div>

              <h3
                className="
            text-white
            text-[1rem]
            sm:text-[1rem]
            lg:text-[1.10rem]
            font-Medium
            leading-[1.45]
            max-w-[540px]
          "
              >
                Together, we are shaping the future of research
                <br className="hidden sm:block" />
                and education for a better tomorrow.
              </h3>
            </div>

            {/* Right Button */}
            <a
              href="https://membership.siaresociety.org"
              target="_blank"
              rel="noopener noreferrer"
              className="
    group
    relative z-10

    h-[42px]
    sm:h-[46px]

    px-5 sm:px-7

    rounded-full

    bg-[linear-gradient(180deg,#f3c04d_0%,#e2ac39_52%,#b9851e_100%)]

    border border-[#c8932a]

    text-[#071d4f]

    text-[11px]
    sm:text-[13px]

    uppercase
    font-bold

    flex items-center justify-center gap-2

    shadow-[0_10px_22px_rgba(226,172,57,0.28)]

    transition-all duration-300

    hover:-translate-y-1
    hover:bg-none
    hover:bg-[#c8932a]
    hover:text-white
    hover:shadow-[0_14px_28px_rgba(226,172,57,0.38)]

    whitespace-nowrap

    w-full
    sm:w-auto

    md:ml-auto
  "
            >
              BECOME A MEMBER
              <ArrowRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}