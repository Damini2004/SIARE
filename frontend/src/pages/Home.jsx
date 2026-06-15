import { Send, Search, UsersRound, GraduationCap, CalendarDays, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import homeBg from "../assets/home.png";
import image from "../assets/image.png";
import quoteBg from "../assets/temp.webp";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import siare from "../assets/siare2.webp";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
<section className="relative  overflow-hidden bg-white max-[370px]:h-[380px] h-[320px] xs:h-[300px] sm:h-[360px] md:h-[450px] lg:h-[480px] xl:h-[515px]">

  {/* Background Image Full Width */}
  <img
    src={homeBg}
    alt="SIARE Hero Background"
    className="
      absolute 
     h-full w-full
      z-0
     object-cover
     object-center
      
    "
  />

  {/* Main Content */}
  <div
    className="
      relative z-10
      w-full h-full
      xl:px-8 lg:px-6 md:px-4 sm:px-3 px-3 
      xl:pt-5 lg:pt-4 md:pt-3 sm:pt-2 pt-1
      xl:mx-8 lg:mx-6 md:mx-4 sm:mx-3 mx-3
      flex flex-col
      justify-between
    "
  >
    {/* Top Content */}
    <div className="relative w-full">

      {/* Logo */}
      <div className="w-[160px] sm:w-[200px] md:w-[210px] lg:w-[260px] xl:w-[290px] ">
        <img
          src={image}
          alt="SIARE Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Left Text */}
      <div className="max-w-[620px] ml-1 sm:ml-3 lg:ml-6 mt-2 ">

        <h1
          className="
            font-[650]
            leading-[1]
            tracking-[-0.03em]
            text-[#071d4f]
            text-[1.4rem]
            sm:text-[1.6rem]
            md:text-[2rem]
            lg:text-[2.2rem]
            xl:text-[2.3rem]
          "
        >
          GLOBAL RESEARCH.
          <br />

          <span className="text-[#0057a8]">
            MEANINGFUL CONNECTIONS.
          </span>

          <br />
          REAL IMPACT.
        </h1>

        {/* Color Line */}
        <div className="flex mt-3 xl:mb-4 lg:mb-3 md:mb-2 sm:mb-1 mb-1 items-center overflow-hidden rounded-full w-fit" >
          
          <span className="h-[4px] w-[26px] bg-[#22a83a]" />
          <span className="h-[4px] w-[26px] bg-[#f8b51b]" />
          <span className="h-[4px] w-[26px] bg-[#f05a24]" />
          <span className="h-[4px] w-[26px] bg-[#0875c9]" />
        </div>

        {/* Description */}
        <p
          className="
            text-[#071d4f]
            text-[0.75rem]
            sm:text-[0.95rem]
            md:text-[0.90rem]
            lg:text-[1rem]
            leading-[1.45]
            font-medium
            max-w-[500px] 
          "
        >
          SIARE is a trusted platform for publishing high-quality
          conference proceedings across diverse disciplines and emerging
          technologies.
        </p>

        {/* Buttons */}
  <div
  className="
    mt-6
    flex flex-wrap items-center
    gap-2 sm:gap-3

    md:flex-col
    md:items-start

    lg:flex-row
    lg:items-center
  "
>
  
 {/* Submit */}
 <Link to="/contact">
<button
  className="
    h-[36px]
    xl:h-[46px]
    lg:h-[44px]
    md:h-[42px]
    sm:h-[40px]

    xl:min-w-[185px]
    lg:min-w-[175px]
    md:min-w-[170px]
    sm:min-w-[155px]
    min-w-[120px]

    xl:px-5
    lg:px-4
    md:px-5
    sm:px-2
    px-2
    max-[370px]:px-4

    rounded-full

    
    bg-[#0057a8]
    text-white
    text-[0.75rem]
    sm:text-[0.83rem]
    uppercase

    flex items-center justify-center gap-2

    shadow-[0_8px_18px_rgba(12,48,103,0.32)]

    transition-all duration-300 ease-out

    hover:bg-[linear-gradient(180deg,#1251a0_0%,#0f468d_45%,#0c3067_100%)]
    hover:shadow-[0_12px_26px_rgba(22,111,207,0.45)]
    hover:-translate-y-[1px]

    active:translate-y-0
    active:scale-[0.98]
    active:bg-[linear-gradient(180deg,#0c3067_0%,#09244d_100%)]
  "
>
  <span
    className="
      w-7 h-7
      rounded-full
      bg-white
      text-[#0c3067]
      flex items-center justify-center
      shadow-inner
    "
  >
    <Send size={14} strokeWidth={2.4} />
  </span>

  SUBMIT PROPOSAL
</button>
</Link>
  {/* Explore */}
 <a
  href="https://academicproceeding.org/"
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    className="
      h-[36px] xl:h-[46px] lg:h-[44px] md:h-[42px] sm:h-[40px]
      xl:min-w-[185px] lg:min-w-[175px] md:min-w-[165px] sm:min-w-[155px] min-w-[120px]
      xl:px-5 lg:px-4 md:px-3 sm:px-2 px-2

      rounded-full

      bg-white/85
      text-[#0c3067]

      text-[0.75rem]
      sm:text-[0.83rem]
      uppercase

      flex items-center justify-center gap-2

      border-2 border-[#0c3067]

      backdrop-blur-[2px]

      shadow-[0_6px_14px_rgba(12,48,103,0.12)]

      transition-all duration-300 ease-out

      hover:bg-[#0057a8]
      hover:text-white
      hover:shadow-[0_10px_22px_rgba(12,48,103,0.30)]
      hover:-translate-y-[1px]

      active:translate-y-0
      active:scale-[0.98]
      active:bg-[#09244d]
      active:border-[#09244d]
    "
  >
    <Search size={18} />
    EXPLORE PROCEEDINGS
  </button>
</a>
</div>
      </div>

      {/* Right Feature Icons */}
      <div
        className="
           md:flex hidden
          absolute
          right-[2.5%]
          bottom-1
          items-end
        "
      >
        {[
        
          { icon: icon2, label: "QUALITY\nPROCEEDINGS" },
          { icon: icon3, label: "WIDER\nVISIBILITY" },
          { icon: icon4, label: "INDEXING &\nGLOBAL REACH" },
          { icon: icon5, label: "SUSTAINABLE" },
        ].map((f, i, arr) => (
          <div
            key={i}
            className={`
              flex flex-col items-center justify-start
              px-2 
              min-w-[85px] lg:min-w-[95px] xl:min-w-[108px]
              ${
                i !== arr.length - 1
                  ? "border-r border-[#9aa9bd]"
                  : ""
              }
            `}
          >
            <img
              src={f.icon}
              alt={f.label}
              className="
                w-[28px] h-[28px]
                lg:w-[38px] lg:h-[38px]
                xl:w-[44px] xl:h-[44px]
                object-contain
              "
            />

            <span
              className="
                text-[#071d4f]
                text-[0.54rem]
                lg:text-[0.64rem]
                xl:text-[0.7rem]
                font-medium
                uppercase
                text-center
                leading-[1.18]
                whitespace-pre-line
                mt-1
              "
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  </div>

  

</section>

{/* About Section */}
{/* ================= ABOUT SECTION ================= */}
<section className="w-full bg-[#f3f4f6] py-8 sm:py-10 lg:py-12 overflow-hidden">
  <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-8 lg:gap-10

        items-center
      "
    >

      {/* Right Content - First On Mobile */}
      <div
        className="
          order-1 lg:order-2

          pt-1 lg:pt-0
        "
      >

        {/* Small Title */}
        <span
          className="
            text-[#d4aa35]

            uppercase

            tracking-[0.15em]

            font-bold

            text-[0.78rem]
            sm:text-[0.82rem]
          "
        >
          About SIARE
        </span>

        {/* Heading */}
        <h2
          className="
            mt-3

            font-bold

            leading-[1.14]

            tracking-[-0.03em]

            text-[1.55rem]
            sm:text-[1.8rem]
            md:text-[2rem]
            lg:text-[2.1rem]

            text-[#0057a8]
          "
        >
          Advancing Scholarly
          <br />

          <span className="text-[#0057a8]">
            Global Collaboration.
          </span>
        </h2>

        {/* Line */}
        <div className="flex mt-4">
          <span className="h-[3px] w-[86px] bg-[#d4aa35] rounded-full" />
        </div>

        {/* Description */}
        <p
          className="
            mt-4

            font-serif

            text-[#0b2953]

            text-[14px]
            sm:text-[15px]

            leading-[1.75]

            font-[400]

            text-justify
          "
        >
          The Society of Integrated Academic Research and Education
          (SIARE) is an international scholarly organization dedicated
          to advancing cross-disciplinary research, promoting academic
          excellence, and supporting global collaboration.
        </p>

        <p
          className="
            mt-4

            font-serif

            text-[#0b2953]

            text-[14px]
            sm:text-[15px]

            leading-[1.75]

            font-[400]

            text-justify
          "
        >
          SIARE connects leading scholars, emerging researchers,
          universities, and research organizations through conferences,
          proceedings publications, and collaborative projects that
          accelerate knowledge creation.
        </p>

        {/* Button */}
        <Link to="/about">
          <button
            className="
              mt-6

              h-[44px]
              sm:h-[46px]

              px-6 sm:px-7

              rounded-[24px]

              bg-[linear-gradient(180deg,#1251a0_0%,#0f468d_45%,#0c3067_100%)]

              border border-[#0c3067]

              text-white

              text-[0.78rem]
              sm:text-[0.88rem]

              uppercase
              font-semibold

              flex items-center justify-center gap-2

              shadow-[0_10px_22px_rgba(12,48,103,0.38)]

              transition-all duration-300

              hover:-translate-y-1
              hover:shadow-[0_14px_28px_rgba(12,48,103,0.45)]
            "
          >
            Learn More About Us →
          </button>
        </Link>
      </div>

      {/* Left Image - Second On Mobile */}
      <div
        className="
          relative

          order-2 lg:order-1

          flex justify-center lg:justify-start
        "
      >
        <div
          className="
            rounded-[22px]

            overflow-hidden

            shadow-[0_18px_35px_rgba(0,0,0,0.08)]

            w-full
            max-w-[520px]
            md:max-w-[640px]
          "
        >
          <img
            src={siare}
            alt="About SIARE"
            className="
              w-full

              h-[240px]
              sm:h-[300px]
              md:h-[360px]
              lg:h-[400px]
               
              object-cover

              transition-all duration-500

              hover:scale-[1.03]
            "
          />
        </div>
      </div>

    </div>
  </div>
</section>


{/* ================= WHY CHOOSE SECTION ================= */}
<section className="w-full bg-[#f5f5f5] py-8 sm:py-10 lg:py-12 overflow-hidden">

  <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">

    {/* Heading */}
    <div className="text-center mb-8 sm:mb-10">

      <h2
        className="
          text-[#0057a8]

          text-[1.45rem]
          sm:text-[1.7rem]
          lg:text-[2rem]

          font-bold

          uppercase

          tracking-[0.02em]
        "
      >
        What SIARE Does
      </h2>

      <div className="flex items-center justify-center mt-3 mb-4">
        <span className="h-[3px] w-[90px] bg-[#d4aa35] rounded-full" />
      </div>

      <p
        className="
          text-[#7a7b7d]

          text-[0.82rem]
          sm:text-[0.92rem]
          lg:text-[1rem]

          leading-[1.6]

          max-w-[820px]

          mx-auto
        "
      >
        SIARE functions as a global academic ecosystem providing
        specialized services for research growth.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">

      {/* Card 1 */}
      <div
        className="
          group

          bg-[#f8f8f8]

          rounded-[28px]

          px-6 sm:px-8
          py-7 sm:py-8

          flex flex-col
          sm:flex-row

          items-start

          gap-5

          shadow-[0_14px_35px_rgba(0,0,0,0.06)]

          transition-all duration-500

          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
        "
      >

        {/* Icon */}
        <div
          className="
            w-[55px]
            h-[55px]
hover:bg-[#eab542]
            rounded-[20px]

            bg-[#0057a8]

            flex items-center justify-center

            shrink-0

            transition-all duration-500

            group-hover:scale-110
            group-hover:rotate-3
          "
        >
          <BookOpen className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <div>

          <h3
            className="
              

              text-[1rem]
              sm:text-[1.25rem]

              font-bold
              text-[#0057a8]

              leading-[1.2]

              mb-3
            "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Conference Proceedings Publication
          </h3>

          <p
            className="
              text-[#6d6e71]

              text-[1rem]
              sm:text-[1.1rem]

              leading-[1.55]
            "
          >
            We publish peer-reviewed proceedings across disciplines such
            as Engineering, Social Sciences, Management, Agriculture,
            Biological Sciences, Pharmacy, Humanities, and more.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="
          group

          bg-[#f8f8f8]

          rounded-[28px]

          px-6 sm:px-8
          py-7 sm:py-8

          flex flex-col
          sm:flex-row

          items-start

          gap-5

          shadow-[0_14px_35px_rgba(0,0,0,0.06)]

          transition-all duration-500

          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
        "
      >

        <div
          className="
            w-[55px]
            h-[55px]

            rounded-[20px]
hover:bg-[#eab542]
            bg-[#0057a8]

            flex items-center justify-center

            shrink-0

            transition-all duration-500

            group-hover:scale-110
            group-hover:rotate-3
          "
        >
          <CalendarDays className="w-7 h-7 text-white" />
        </div>

        <div>

          <h3
            className="
              text-[#0057a8]

              text-[1rem]
              sm:text-[1.25rem]

              font-bold
             

              leading-[1.2]

              mb-3
            "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Academic Events & Conferences
          </h3>

          <p
            className="
              text-[#6d6e71]

              text-[1rem]
              sm:text-[1.1rem]

              leading-[1.55]
            "
          >
            SIARE partners with universities and organizations worldwide
            to host conferences, research summits, and thematic
            symposiums.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div
        className="
          group

          bg-[#f8f8f8]

          rounded-[28px]

          px-6 sm:px-8
          py-7 sm:py-8

          flex flex-col
          sm:flex-row

          items-start

          gap-5

          shadow-[0_14px_35px_rgba(0,0,0,0.06)]

          transition-all duration-500

          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
        "
      >

        <div
          className="
            w-[55px]
            h-[55px]

            rounded-[20px]

            bg-[#0057a8]

            flex items-center justify-center

            shrink-0

            transition-all duration-500
             hover:bg-[#eab542]
            group-hover:scale-110
            group-hover:rotate-3
          "
        >
          <GraduationCap className="w-7 h-7 text-white" />
        </div>

        <div>

          <h3
            className="
              text-[#0057a8]

              text-[1rem]
              sm:text-[1.25rem]

              font-bold
              

              leading-[1.2]

              mb-3
            "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Training & Capacity Building
          </h3>

          <p
            className="
              text-[#6d6e71]

              text-[1rem]
              sm:text-[1.1rem]

              leading-[1.75]
            "
          >
            Workshops and training modules on research writing,
            publishing ethics, research analytics, and digital tools.
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div
        className="
          group

          bg-[#f8f8f8]

          rounded-[28px]

          px-6 sm:px-8
          py-7 sm:py-8

          flex flex-col
          sm:flex-row

          items-start

          gap-5

          shadow-[0_14px_35px_rgba(0,0,0,0.06)]

          transition-all duration-500

          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
        "
      >

        <div
          className="
            w-[55px]
            h-[55px]
hover:bg-[#eab542]
            rounded-[20px]

            bg-[#0057a8]

            flex items-center justify-center

            shrink-0

            transition-all duration-500

            group-hover:scale-110
            group-hover:rotate-3
          "
        >
          <UsersRound className="w-7 h-7 text-white" />
        </div>

        <div>

          <h3
            className="
              text-[#0057a8]

              text-[1rem]
              sm:text-[1.25rem]

              font-bold
          

              leading-[1.2]

              mb-3
            "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Research Collaboration Facilitation
          </h3>

          <p
            className="
              text-[#6d6e71]

              text-[1rem]
              sm:text-[1.1rem]

              leading-[1.75]
            "
          >
            Connecting researchers with institutions and global partners
            for collaborative projects.
          </p>
        </div>
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
            md:text-[17px]

            leading-[1.75]

            font-medium

            max-w-[760px]
          "
        >
         Publish. Collaborate. Create Impact.
          <br />

     

          <span className="text-[#e2ac39] font-semibold text-[12px] sm:text-[13px] md:text-[14px]">
            Join researchers and institutions worldwide in advancing
          knowledge.
          </span>
        </p>
      </div>

      {/* Right Button */}
      <Link to="/contact">
      <button
        className="
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
        <Send
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

        Submit Proposal
      </button>
</Link>
    </div>
  </div>
</section>


    </div>
  );
}