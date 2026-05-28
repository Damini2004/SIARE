import {
  ArrowRight,
  CalendarDays,
  Handshake,
  User,
} from "lucide-react";

import clientsImg from "../assets/clienttt.png";
import quoteBg from "../assets/temp.jpeg";

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
            <div className="bg-[#061b45]/78 border border-white/40 rounded-[8px] px-4 h-[95px] min-w-[180px] flex items-center gap-3">
              <div>
                <div className="text-[#38d430] font-bold text-[30px]">
                  {collaborations.length}+
                </div>

                <div className="text-white text-[11px] uppercase">
                  International
                  <br />
                  Collaborations
                </div>
              </div>
            </div>

            <div className="bg-[#061b45]/78 border border-white/40 rounded-[8px] px-4 h-[95px] min-w-[180px] flex items-center gap-3">
              <div>
                <div className="text-[#f6aa13] font-bold text-[30px]">
                  {members.length}+
                </div>

                <div className="text-white text-[11px] uppercase">
                  Registered
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
    </div>
  );
}