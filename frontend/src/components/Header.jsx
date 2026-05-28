import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/image.png";
import logo1 from "../assets/footerlogo.png";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/proceedings", label: "PROCEEDINGS" },
  { to: "/events", label: "EVENTS" },
  { to: "/membership", label: "MEMBERSHIP" },
  { to: "/members", label: "MEMBERS" },
  { to: "/contact", label: "CONTACT US" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // GET CURRENT PATH
  const location = useLocation();

  // CHECK HOME PAGE
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 left-0 z-[1000] w-full h-[70px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]
      ${isHomePage ? "bg-[#001247]" : "bg-white"}`}
    >
      <div className="w-full h-full px-[4%] flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center shrink-0 no-underline"
        >
        
             <img
    src={location.pathname === "/" ? logo1 : logo}
    alt="SIARE Logo"
   className="h-[60px] max-[768px]:h-[44px] max-[480px]:h-[40px] w-auto object-contain"
  />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative inline-flex items-center px-[13px] py-2 text-[13px] max-[1200px]:text-[12px] max-[1200px]:px-[10px] font-semibold uppercase whitespace-nowrap transition-colors duration-300
                after:content-[''] after:absolute after:left-1/2 after:bottom-[2px] after:h-[2px] after:bg-[#e2ac39] after:rounded-full after:-translate-x-1/2 after:transition-all after:duration-300
                hover:text-[#e2ac39] hover:after:w-[55%]
                ${
                  isActive
                    ? "text-[#e2ac39] after:w-[55%]"
                    : isHomePage
                    ? "text-white after:w-0"
                    : "text-black after:w-0"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

{/* Mobile Toggle */}
<button
  type="button"
  onClick={() => setOpen(!open)}
  aria-label="Toggle navigation"
  className={`lg:hidden fixed top-[14px] right-[16px] z-[3001]
  w-[40px] h-[40px] rounded-[12px]
  flex items-center justify-center
  text-[28px] leading-none
  transition-all duration-300 border-2
  ${
    isHomePage
      ? "text-white border-white bg-transparent"
      : "text-black border-black bg-white"
  }`}
>
  {open ? "×" : "☰"}
</button>
      </div>

      {/* Mobile Sidebar */}
<div
  className={`fixed top-0 right-0 z-[2000] w-[240px] max-w-[85%] h-screen
  ${isHomePage ? "bg-[#001247]" : "bg-white"}
  pt-[70px] px-[30px] pb-5 flex flex-col items-start gap-[2px]
  overflow-y-auto transition-all duration-500 lg:hidden
  ${
    open
      ? "translate-x-0 opacity-100 visible pointer-events-auto"
      : "translate-x-full opacity-0 invisible pointer-events-none"
  }`}
>
  {navLinks.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === "/"}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `w-full py-4 text-[14px] font-semibold uppercase transition-all duration-300
        ${isHomePage ? "border-b border-white/10" : "border-b border-black/10"}
        hover:text-[#e2ac39] hover:pl-2
        ${
          isActive
            ? "text-[#e2ac39] pl-2"
            : isHomePage
            ? "text-white"
            : "text-[#001247]"
        }`
      }
    >
      {link.label}
    </NavLink>
  ))}
</div>
    </header>
  );
}