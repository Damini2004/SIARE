import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, Phone } from "lucide-react";
import logo from "../assets/fot.png";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/proceedings", label: "Proceedings" },
  { to: "/events", label: "Events" },
  { to: "/membership", label: "Membership" },
  { to: "/members", label: "Members" },
  { to: "/contact", label: "Contact Us" },
];

const proceedings = [
  " Engineering Sciences",
  "Agriculture and Biological Sciences",
  "Pharmacology and Biotechnology",
  "Arts and Humanities",
  "Social Sciences",
  "Management Innovations",
];

export default function Footer() {
  return (
    <footer className="bg-[#071b44] text-white">
      {/* Main Footer */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-5 pt-[28px] pb-[18px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.5fr_1.6fr] gap-8 lg:gap-[58px]">
        
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="SIARE"
            className="w-[215px] h-auto object-contain"
          />

          {/* Social Icons */}
          <div className="flex gap-[18px] mt-[20px] ml-[20px]">
            {["in", "𝕏", "f", "▶"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="w-[30px] h-[30px] rounded-full border border-[#6b7b99] flex items-center justify-center text-white/80 hover:text-[#e2ac39] hover:border-[#e2ac39] transition-all duration-300 hover:-translate-y-1 text-[15px] font-bold"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[14px] font-bold uppercase mb-[14px] text-[#e2ac39]">
            QUICK LINKS
          </h4>

          <ul className="space-y-[3px]">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[13px] font-medium text-white hover:text-[#e2ac39] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Proceedings */}
        <div>
          <h4 className="text-[14px] font-bold uppercase mb-[14px] text-[#e2ac39]">
            PROCEEDINGS
          </h4>

          <ul className="space-y-[3px]">
            {proceedings.map((item, i) => (
              <li key={i}>
                <a
                  href="https://academicproceeding.org/"
                  target="_blank"
  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-white hover:text-[#e2ac39] transition-colors duration-300"
                >
     
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[14px] font-bold uppercase mb-[14px] text-[#e2ac39]">
            CONTACT US
          </h4>

          <ul className="space-y-[10px]">
            <li className="flex gap-2 items-start text-[13px] font-medium leading-[1.35]">
              <MapPin
                size={16}
                className="text-[#8fb1de] mt-[2px] shrink-0"
              />

              <span>
                Society of Integrated Academic Research and Education
                <br />
                109/C, Sukhdev Nagar Ex2, Airport Rd, Indore,
                Madhya Pradesh 452005
              </span>
            </li>

            <li className="flex gap-2 items-center text-[13px] font-medium">
              <Mail size={15} className="text-[#8fb1de] shrink-0" />
              <span>contact@siaresociety.org</span>
            </li>

            <li className="flex gap-2 items-center text-[13px] font-medium">
              <Globe size={15} className="text-[#8fb1de] shrink-0" />
              <span>siaresociety.org</span>
            </li>

            <li className="flex gap-2 items-center text-[13px] font-medium">
              <Phone size={15} className="text-[#8fb1de] shrink-0" />
              <span>+91 738 735 5544</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#263b63]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-5 py-[10px] flex flex-col md:flex-row justify-between items-center gap-2 text-[12px] text-[#9fb2d2]">
          
          <p>© 2026 SIARE. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="#"
              className="hover:text-[#e2ac39] transition-colors duration-300"
            >
              Privacy Policy
            </a>

            <span>|</span>

            <a
              href="#"
              className="hover:text-[#e2ac39] transition-colors duration-300"
            >
              Terms of Use
            </a>

            <span>|</span>

            <a
              href="#"
              className="hover:text-[#e2ac39] transition-colors duration-300"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}