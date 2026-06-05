// API Integration: membership tiers loaded from GET /api/membership-tiers
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import membershipImg from "../assets/membership.webp";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import { getMembershipTiers } from "../api/companyApi";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import document from "../assets/document.png";
import people from "../assets/people.png";
// import protect from "../assets/protect.png";
import security from "../assets/security.png";
// import bar from "../assets/bar.png";
// import quoteImg from "../assets/q.png";
import quoteBg from "../assets/temp.jpg";


const membershipTypes = [
  {
    icon: icon5,
    title: "STUDENT",
    subtitle: "MEMBERSHIP",
    color: "text-siare-green",
    border: "border-siare-green",
    indLabel: "INDIAN STUDENTS",
    intlLabel: "INTERNATIONAL STUDENTS",
    indPrice: "₹500",
    intlPrice: "$20",
    indUnit: "INR",
    intlUnit: "USD",
    note: "For students and research scholars",
    noteBg: "bg-green-50",
    iconBg: "bg-[#2f8a2f]",
  },
  {
    icon: icon1,
    title: "PROFESSOR &\nACADEMICIAN",
    subtitle: "MEMBERSHIP",
    color: "text-siare-blue",
    border: "border-siare-blue",
    indLabel: "INDIAN ACADEMICIANS",
    intlLabel: "INTERNATIONAL ACADEMICIANS",
    indPrice: "₹2000",
    intlPrice: "$50",
    indUnit: "INR",
    intlUnit: "USD",
    note: "For faculty members, researchers and academicians",
    noteBg: "bg-blue-50",
    iconBg: "bg-[#0052b8]",
  },
  {
    icon: icon3,
    title: "INSTITUTIONAL",
    subtitle: "MEMBERSHIP",
    color: "text-orange-500",
    border: "border-orange-400",
    indLabel: "INDIAN INSTITUTIONS",
    intlLabel: "INTERNATIONAL INSTITUTIONS",
    indPrice: "₹99,000",
    intlPrice: "$1999",
    indUnit: "INR",
    intlUnit: "USD",
    note: "For universities, colleges and research institutes",
    noteBg: "bg-orange-50",
    popular: true,
    iconBg: "bg-[#ff6b00]",
  },
  {
    icon: icon4,
    title: "CORPORATE",
    subtitle: "MEMBERSHIP",
    color: "text-purple-600",
    border: "border-purple-500",
    indLabel: "CORPORATE EMPLOYEES",
    intlLabel: "COMPANY MEMBERSHIP",
    indPrice: "₹5000",
    intlPrice: "$3000",
    indUnit: "INR",
    intlUnit: "USD",
    note: "For professionals, organizations and industry partners",
    noteBg: "bg-purple-50",
    iconBg: "bg-[#6b35b8]",
  },
];

const benefits = [
  {
    icon: icon2,
    text: "Publication support in peer-reviewed & Scopus indexed journals",
    bg: "bg-[#e9f7e9]",
  },
  {
    icon: document,
    text: "Turnitin reports with AI check",
    bg: "bg-[#e9f7e9]",
  },
  {
    icon: people,
    text: "Conference collaboration discount",
    bg: "bg-[#eaf2ff]",
  },
  {
    icon: security,
    text: "Webinar access & workshop discount",
    bg: "bg-[#fff1dc]",
  },
  {
    icon: icon3,
    text: "International collaboration opportunities",
    bg: "bg-[#f3eaff]",
  },
  {
    icon: icon1,
    text: "Recognition and academic profile enhancement",
    bg: "bg-[#eaf2ff]",
  },
];

// const heroFeatures = [
//   { icon: icon3, label: "Global\nNetwork" },
//   { icon: icon2, label: "Research &\nPublishing" },
//   { icon: icon5, label: "Events &\nOpportunities" },
//   { icon: icon4, label: "Recognition &\nImpact" },
// ];

export default function Membership() {
  // API Integration: fetch membership tiers from backend; fall back to static membershipTypes

 const [apiTiers, setApiTiers] = useState([]);
const [tiersLoading, setTiersLoading] = useState(true);

useEffect(() => {
  const loadMembershipTiers = async () => {
    try {
      const res = await getMembershipTiers();

      const rows =
        res?.data ||
        res?.rows ||
        [];

      setApiTiers(
        Array.isArray(rows)
          ? rows
          : []
      );

    } catch (error) {
      console.log(
        "Membership API Error:",
        error
      );
    } finally {
      setTiersLoading(false);
    }
  };

  loadMembershipTiers();
}, []);

const iconMap = {
  GraduationCap: icon5,
  Briefcase: icon1,
  Building2: icon3,
};

const displayTiers =
  apiTiers.length > 0
    ? apiTiers.map((tier, index) => ({
        icon: iconMap[tier.icon] || membershipTypes[index]?.icon || icon5,
        title: tier.name || membershipTypes[index]?.title || "MEMBERSHIP",
        subtitle: "MEMBERSHIP",
        color: membershipTypes[index]?.color || "text-siare-blue",
        border: membershipTypes[index]?.border || "border-siare-blue",
        indLabel: "INDIAN MEMBERS",
        intlLabel: "INTERNATIONAL MEMBERS",
        indPrice: tier.priceINR || "₹0",
        intlPrice: tier.priceUSD || "$0",
        indUnit: "INR",
        intlUnit: "USD",
        note: tier.description || "",
        noteBg: membershipTypes[index]?.noteBg || "bg-blue-50",
        iconBg: membershipTypes[index]?.iconBg || "bg-[#0052b8]",
        popular: index === 1,
      }))
    : membershipTypes;


  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section
        className="relative overflow-hidden
  min-h-[340px] md:min-h-[360px] lg:h-[400px]
  flex items-center"
        style={{
          backgroundImage: `url(${membershipImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="relative z-10
  w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
    py-8
    flex flex-col lg:flex-row
    items-center justify-between
    gap-10"
        >
          {/* LEFT CONTENT */}
          <div className="max-w-[610px]">
            {/* Heading */}
            <h1 className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[40px] font-bold uppercase text-white">
              SIARE <span className="text-[#f6a313]">MEMBERSHIP</span>
            </h1>

            <div className="flex mt-2 mb-4 overflow-hidden rounded-full w-fit">
              <span className="h-[4px] w-[38px] sm:w-[50px] bg-[#43aa37]"></span>
              <span className="h-[4px] w-[38px] sm:w-[50px] bg-[#f6a313]"></span>
              <span className="h-[4px] w-[38px] sm:w-[50px] bg-[#ff352e]"></span>
              <span className="h-[4px] w-[38px] sm:w-[50px] bg-[#0875c9]"></span>
            </div>

            {/* Paragraph */}
            <p className="text-white text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.55] font-normal mb-6">
              Join SIARE and become a part of a global network of researchers,
              academicians, and institutions working together to advance
              research, innovation, and academic excellence.
            </p>

            {/* Bottom Features */}
            <div
              className="
  mt-[34px]

  flex flex-wrap lg:flex-nowrap
  items-center

  gap-y-[18px]
  gap-x-[24px]

  w-full
"
            >
              {[
                {
                  icon: icon3,
                  title: "Global\nNetwork",
                  color: "bg-[#43aa37]",
                },
                {
                  icon: icon2,
                  title: "Research &\nPublishing",
                  color: "bg-[#43aa37]",
                },
                {
                  icon: icon5,
                  title: "Events &\nOpportunities",
                  color: "bg-[#ff7b00]",
                },
                {
                  icon: icon4,
                  title: "Recognition &\nImpact",
                  color: "bg-[#1d66ff]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`
      flex items-center gap-[14px]

      min-w-fit

      pr-[18px] lg:pr-[26px]

      ${i !== 3 ? "lg:border-r lg:border-white/18" : ""}
    `}
                >
                  {/* Icon Circle */}
                  <div
                    className={`
        w-[39px] h-[39px]
        rounded-full

        ${item.color}

        flex items-center justify-center

        shrink-0

        shadow-[0_8px_18px_rgba(0,0,0,0.22)]

        transition-all duration-300
        hover:scale-105
      `}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="
          w-[48px] h-[48px]
          object-contain
          brightness-0 invert
        "
                    />
                  </div>

                  {/* Text */}
                  <span
                    className="
        whitespace-pre-line

        text-white

        text-[12px]
        lg:text-[12px]

        font-medium

        leading-[1.45]
        tracking-[0.2px]
      "
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership Categories */}
      <section className="bg-white py-[20px]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Heading */}
          <div className="flex items-center justify-center gap-3 mb-[10px]">
            <div className="h-px w-[95px] bg-[#e2ac39]"></div>
            <span className="text-[#e2ac39] text-[13px]">◆</span>

            <h2 className="text-[22px] md:text-[24px] font-bold text-[#001b57] uppercase">
              MEMBERSHIP CATEGORIES & FEES
            </h2>

            <span className="text-[#e2ac39] text-[13px]">◆</span>
            <div className="h-px w-[95px] bg-[#e2ac39]"></div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
            {/* API Integration: show loading skeleton while fetching, then static or API tiers */}
            {tiersLoading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-[8px] border border-gray-200 p-5 animate-pulse">
                  <div className="h-[60px] bg-gray-200 rounded-full w-[60px] mx-auto mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))
            ) : (
    displayTiers.map((m, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-[8px] border ${m.border}
          shadow-[0_4px_14px_rgba(0,0,0,0.08)]
          overflow-hidden transition-all duration-300 hover:-translate-y-1`}
              >
                {m.popular && (
                  <div className="absolute top-[9px] right-[-38px] rotate-45 bg-[#f97316] text-white text-[10px] font-medium px-[42px] py-[4px]">
                    POPULAR
                  </div>
                )}

                <div className="p-[14px]">
                  <div className="flex items-center gap-[12px] pb-[12px] border-b border-[#e5eaf0]">
                    <div
                      className={`w-[52px] h-[52px] rounded-full ${m.iconBg} flex items-center justify-center`}
                    >
                      <img
                        src={m.icon}
                        alt=""
                        className="w-[32px] h-[32px] object-contain brightness-0 invert"
                      />
                    </div>

                    <h3
                      className={`whitespace-pre-line text-[15px] font-bold leading-[1.15] ${m.color}`}
                    >
                      {m.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 py-[14px] text-center">
                    <div className="pr-3 border-r border-[#d9e0ea]">
<p className="text-[11px] font-bold text-[#071d4f] uppercase leading-[1.15] mb-2 whitespace-pre-line">
  {String(m.indLabel || "").split(" ").join("\n")}
</p>
                      <h4
                        className={`text-[20px] font-bold leading-none ${m.color}`}
                      >
                        {m.indPrice}
                      </h4>
                      <p className="text-[12px] font-semibold text-[#071d4f] mt-1">
                        {m.indUnit}
                      </p>
                    </div>

                    <div className="pl-3">
<p className="text-[11px] font-bold text-[#071d4f] uppercase leading-[1.15] mb-2 whitespace-pre-line">
  {String(m.intlLabel || "").split(" ").join("\n")}
</p>
                      <h4
                        className={`text-[20px] font-bold leading-none ${m.color}`}
                      >
                        {m.intlPrice}
                      </h4>
                      <p className="text-[12px] font-semibold text-[#071d4f] mt-1">
                        {m.intlUnit}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`${m.noteBg} rounded-[7px] py-[13px] px-4 text-center`}
                  >
                    <p className="text-[14px] leading-[1.35] font-medium text-black">
                      {m.note}
                    </p>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white pb-[10px] h-auto">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2 className="text-[22px] md:text-[24px] font-bold text-[#001b57] uppercase text-center mb-2">
            MEMBERSHIP BENEFITS
          </h2>

          <div className="bg-white rounded-[8px] border border-[#e3e8f0] shadow-[0_4px_14px_rgba(0,0,0,0.08)] px-[14px] py-[10px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-[12px] px-[12px] min-h-[58px]
            ${i !== benefits.length - 1 ? "xl:border-r xl:border-[#d9e0ea]" : ""}`}
                >
                  <div
                    className={`${b.bg} w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0`}
                  >
                    <img
                      src={b.icon}
                      alt=""
                      className="w-[30px] h-[30px] object-contain"
                    />
                  </div>

                  <p className="text-[12px] leading-[1.28] font-semibold text-[#071d4f]">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
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
            <div className="flex-1 relative z-10">
              <p
                className="
                text-white
    
                text-[13px]
                sm:text-[14px]
                md:text-[15px]
    
                leading-[1.75]
    
                font-medium
    
                max-w-[760px]
              "
              >
                At SIARE, we believe that meaningful research leads to
                real-world impact.
                <br />
                Together, we{" "}
                <span className="text-[#e2ac39] font-semibold">
                  advance knowledge, inspire innovation, and build a better
                  future.
                </span>
              </p>
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