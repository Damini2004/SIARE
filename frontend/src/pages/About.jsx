import aboutImg from "../assets/about.jpeg";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import glob from "../assets/globeicon.png";
import sec from "../assets/security.png";
import ppl from "../assets/people.png";
import bar from "../assets/bar.png";
import quoteImg from "../assets/q.png";
import quoteBg from "../assets/temp.webp";
import {
  Globe2,
  FileText,
  Building2,
  CalendarDays,
  Lightbulb,
  Zap,
  ShieldCheck,
  Trophy,
  UsersRound,
  Target,
} from "lucide-react";

const whatWeDo = [
  {
    icon: glob,
    color: "bg-[#43A834]",
    text: "Publish high-quality, peer-reviewed conference proceedings across diverse disciplines.",
  },
  {
    icon: sec,
    color: "bg-[#F6A313]",
    text: "Connect global researchers, academicians, and institutions.",
  },
  {
    icon: ppl,
    color: "bg-[#0875C9]",
    text: "Organize and support academic events, conferences, and workshops.",
  },
  {
    icon: bar,
    color: "bg-[#7A45C9]",
    text: "Ensure global visibility, indexing, and long-term impact for published research.",
  },
];

const impactStats = [
  { icon: icon1, num: "10K+", label: "Researchers\nWorldwide" },
  { icon: icon2, num: "500+", label: "Proceedings\nPublished" },
  { icon: icon3, num: "80+", label: "Countries\nReached" },
  { icon: icon4, num: "300+", label: "Partner\nInstitutions" },
];

const coreObjectives = [
  {
    icon: Globe2,
    text: "Promote international\nacademic research and\nscholarly communication",
  },
  {
    icon: FileText,
    text: "Support high-quality, peer-\nreviewed conference\nproceedings",
  },
  {
    icon: Building2,
    text: "Build bridges between\nuniversities, researchers,\nand research societies",
  },
  {
    icon: CalendarDays,
    text: "Organize conferences,\nsymposiums, and academic\ntraining programs",
  },
  {
    icon: Lightbulb,
    text: "Encourage multidisciplinary\nand cross-domain\nknowledge creation",
  },
  {
    icon: Zap,
    text: "Enhance research visibility\nthrough indexing, DOI\nassignment, and open\nscholarly access",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "ETHICAL, TRANSPARENT, AND\nRELIABLE ACADEMIC PRACTICES",
  },
  {
    icon: Trophy,
    title: "Quality",
    desc: "MAINTAINING RIGOROUS\nINTERNATIONAL PUBLISHING\nSTANDARDS",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "ENCOURAGING DIGITAL TOOLS,\nADOPTION, AND NEW\nMETHODOLOGIES",
  },
  {
    icon: UsersRound,
    title: "Inclusivity",
    desc: "PROVIDING EQUAL OPPORTUNITIES\nFOR SCHOLARS WORLDWIDE",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "ENSURING RESEARCH CONTRIBUTES\nTO GLOBAL DEVELOPMENT",
  },
];

const organizationStructure = [
  {
    title: "Executive Committee",
    desc: "A team of senior scholars and advisors who guide the strategic direction of SIARE.",
  },
  {
    title: "Editorial & Proceedings\nCommittee",
    desc: "Handles peer review coordination, ethical checks, and proceedings publication.",
  },
  {
    title: "Academic Council",
    desc: "Experts from multiple disciplines who oversee academic quality, event partnerships, and research programs.",
  },
];

// const siareDoes = [
//   {
//     icon: BookOpen,
//     title: "Conference Proceedings Publication",
//     desc: "We publish peer-reviewed proceedings across disciplines such as Engineering, Social Sciences, Management, Agriculture, Biological Sciences, Pharmacy, Humanities, and more.",
//   },
//   {
//     icon: CalendarDays,
//     title: "Academic Events & Conferences",
//     desc: "SIARE partners with universities and organizations worldwide to host conferences, research summits, and thematic symposiums.",
//   },
//   {
//     icon: GraduationCap,
//     title: "Training & Capacity Building",
//     desc: "Workshops and training modules on research writing, publishing ethics, research analytics, and digital tools.",
//   },
//   {
//     icon: UsersRound,
//     title: "Research Collaboration Facilitation",
//     desc: "Connecting researchers with institutions and global partners for collaborative projects.",
//   },
// ];

export default function About() {
  return (
    <div className="w-full bg-[#f4f9ff] text-[#07194f] animate-fade-in">
      {/* HERO */}
      <section
        className="relative h-auto min-h-[340px] md:min-h-[360px] lg:h-[400px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute  bg-[#001948]/65"></div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 py-8 lg:py-5">
          {/* Left Content */}
          <div className="max-w-[600px] w-full">
            <h1 className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[42px] leading-[0.95] font-bold text-white tracking-tight">
              ABOUT <span className="text-[#f6aa13]">SIARE</span>
            </h1>

            <div className="flex mt-3 mb-5 overflow-hidden rounded-full w-fit">
              <span className="h-[4px] w-[32px] sm:w-[45px] bg-[#43aa37]"></span>
              <span className="h-[4px] w-[32px] sm:w-[45px] bg-[#f6a313]"></span>
              <span className="h-[4px] w-[32px] sm:w-[45px] bg-[#ff352e]"></span>
              <span className="h-[4px] w-[32px] sm:w-[45px] bg-[#0875c9]"></span>
            </div>

            <p className="max-w-[570px] text-white text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.55] font-normal">
              The Society of Integrated Academic Research and Education (SIARE)
              is an international scholarly organization dedicated to advancing
              cross-disciplinary research, promoting academic excellence, and
              supporting global collaboration.
            </p>
          </div>

          {/* Right Icons - desktop only */}
          <div className="flex flex-wrap xl:flex-col w-full xl:w-[200px] gap-4 xl:gap-0 shrink-0 text-white font-light mt-4 xl:mt-0">
            {[
              [glob, "GLOBAL REACH"],
              [sec, "QUALITY\nASSURED"],
              [ppl, "RESEARCH\nCOMMUNITY"],
              [bar, "REAL IMPACT"],
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 w-full sm:w-[48%] xl:w-full py-4 border border-white/20 xl:border-b xl:border-t-0 xl:border-l-0 xl:border-r-0 rounded-xl xl:rounded-none px-4 xl:px-0 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:bg-white/10"
              >
                <div className="w-[46px] h-[46px] rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.45)]">
                  <img
                    src={item[0]}
                    alt=""
                    className="w-[27px] h-[27px] object-contain brightness-0 invert transition-all duration-300"
                  />
                </div>

                <span className="whitespace-pre-line text-[13px] font-semibold leading-tight tracking-wide transition-all duration-300 group-hover:text-[#43d12f]">
                  {item[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#f4f8fc] w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-[28px] pb-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.05fr_1fr_1.05fr] gap-8 xl:gap-[55px]">
          {/* Mission Vision */}
          <div className="pr-0 xl:pr-[35px]">
            <div className="mb-[56px]">
              <h2 className="text-[20px] font-bold text-[#001b57]">
                OUR MISSION
              </h2>
              <div className="w-[58px] h-[4px] bg-[#43aa37] mt-[12px] mb-[31px] rounded-full"></div>
              <p className="text-[14px] leading-[1.55] font-medium text-[#001b57]">
                To empower global academic communities by enabling high-quality
                research dissemination, fostering multidisciplinary
                collaboration, and building an ecosystem where researchers can
                exchange ideas, publish outcomes, and contribute to global
                scientific advancement.
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold text-[#001b57]">
                OUR VISION
              </h2>
              <div className="w-[58px] h-[4px] bg-[#f6a313] mt-[12px] mb-[31px] rounded-full"></div>
              <p className="text-[14px] leading-[1.55] font-medium text-[#001b57]">
                To become a globally trusted academic society known for shaping
                impactful research, integrating innovation with education, and
                providing a unified platform for scholarly exchange across all
                major disciplines.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="md:border-l md:border-[#c6d1dc] md:pl-8 xl:pl-[54px] xl:pr-[20px]">
            <h2 className="text-[20px] font-bold text-[#001b57]">WHAT WE DO</h2>
            <div className="w-[58px] h-[4px] bg-[#0875c9] mt-[12px] mb-[31px] rounded-full"></div>

            <div className="space-y-[25px]">
              {whatWeDo.map((item, i) => (
                <div key={i} className="flex gap-[18px] items-start">
                  <div
                    className={`w-[45px] h-[45px] rounded-full ${item.color} flex items-center justify-center shrink-0`}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="w-[23px] h-[23px] object-contain brightness-0 invert"
                    />
                  </div>
                  <p className="text-[14px] leading-[1.55] font-medium text-[#001b57]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="md:col-span-2 xl:col-span-1 xl:border-l xl:border-[#c6d1dc] xl:pl-[54px]">
            <h2 className="text-[20px] font-bold text-[#001b57]">OUR IMPACT</h2>
            <div className="w-[58px] h-[4px] bg-[#ff352e] mt-[12px] mb-[42px] rounded-full"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 max-w-full xl:max-w-[360px] gap-4 xl:gap-0">
              {impactStats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-[14px] py-[10px] px-3 xl:px-0 border border-[#d8e0e8] xl:border-0 rounded-xl xl:rounded-none ${
                    i < 2 ? "border-b border-[#d8e0e8]" : ""
                  } ${i % 2 === 0 ? "pr-[17px]" : "pl-[17px] border-l border-[#d8e0e8]"}`}
                >
                  <img
                    src={stat.icon}
                    alt=""
                    className="w-[62px] h-[62px] object-contain shrink-0"
                  />
                  <div>
                    <h3 className="text-[20px] leading-none font-semibold text-[#001b57]">
                      {stat.num}
                    </h3>
                    <p className="whitespace-pre-line text-[14px] mt-[8px] leading-tight font-medium text-[#001b57]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Objectives */}
        <section className="bg-[#f4f8fc] py-8 sm:py-10 lg:py-[46px] px-4">
          <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="text-center mb-8 sm:mb-10 lg:mb-[62px]">
              <h2 className="text-[20px] sm:text-[22px] font-bold uppercase text-[#001b57]">
                Our Core Objectives
              </h2>

              <div className="w-[70px] sm:w-[80px] h-[4px] bg-[#c8932a] mx-auto mt-[10px]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-[24px]">
              {coreObjectives.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="bg-white rounded-[14px] border border-[#e5ebf1]
            shadow-[0_3px_10px_rgba(0,0,0,0.06)]
            px-4 sm:px-5 lg:px-[24px]
            py-5 lg:py-[26px]
            min-h-[96px] lg:min-h-[104px]
            flex items-center gap-4 lg:gap-[18px]
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.10)]"
                  >
                    <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-[12px] bg-[#fbf3df] flex items-center justify-center shrink-0">
                      <Icon
                        size={22}
                        strokeWidth={2}
                        className="text-[#d5a21f]"
                      />
                    </div>

                    <p className="whitespace-pre-line text-[12px] sm:text-[14px] md:text-[14px] lg:text-[14px] leading-[1.25] font-semibold text-[#344154]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>

      {/* Our Values */}
      <section className="bg-[#071b44] py-[44px] sm:py-[36px] lg:py-[46px] w-full">
        <div
          className="
    sm:mx-6
    md:mx-8
    lg:mx-auto
    w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
  "
        >
          <div className="text-center mb-[50px]">
            <h2 className="text-[20px] sm:text-[24px] font-bold uppercase text-white">
              Our Values
            </h2>
            <div className="w-[64px] h-[3px] bg-[#c8932a] mx-auto mt-[8px]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-[40px] gap-x-[36px]">
            {values.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-[16px]">
                    <Icon
                      size={25}
                      strokeWidth={2}
                      className="text-[#c8932a]"
                    />
                  </div>

                  <h3 className="text-[15px] font-bold text-[#c8932a] leading-none mb-[6px]">
                    {item.title}
                  </h3>

                  <p className="whitespace-pre-line text-[9px] sm:text-[10px] leading-[1.35] font-semibold tracking-[0.8px] text-white/70 uppercase">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="bg-white py-[62px] w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="">
          <div className="text-center mb-[60px]">
            <h2 className="text-[20px] sm:text-[22px] font-bold uppercase text-[#001b57]">
              Organizational Structure
            </h2>

            <div className="w-[80px] h-[3px] bg-[#c8932a] mx-auto mt-[10px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {organizationStructure.map((item, i) => (
              <div
                key={i}
                className="bg-[#f7f9fc] rounded-[22px] min-h-[205px]
          px-[36px] py-[34px]
          flex flex-col items-center justify-center text-center
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.10)]"
              >
                <h3 className="whitespace-pre-line text-[20px] sm:text-[18px] font-bold text-[#001b57] leading-[1.25] mb-[18px]">
                  {item.title}
                </h3>

                <p className="text-[14px] sm:text-[14px] leading-[1.6] font-medium text-black/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <div 
        className="mt-[34px] max-w-[1100px] mx-auto rounded-[20px]
  px-[20px] sm:px-[38px]
  py-[18px] my-[40px] bg-white
  flex flex-col sm:flex-row items-start sm:items-center
  gap-[18px] sm:gap-[28px]
  shadow-[0_18px_35px_rgba(0,0,0,0.08)]
  overflow-hidden relative"
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
        {/* Quote Circle */}
        <div className="w-[62px] h-[62px] rounded-full bg-[#0875c9] flex items-center justify-center shrink-0 relative z-10">
          <img
            src={quoteImg}
            alt="quote"
            className="w-[50px] h-[50px] object-contain"
          />
        </div>

        {/* Text */}
        <p className="relative z-10 text-white text-[14px] sm:text-[15px] leading-[1.75] font-medium">
          At SIARE, we believe that meaningful research leads to real-world
          impact.
          <br />
          Together, we{" "}
          <span className="text-[#f6a313] font-semibold">
            advance knowledge, inspire innovation, and build a better future.
          </span>
        </p>
      </div>
    </div>
  );
}