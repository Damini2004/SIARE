import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={goTop}
      aria-label="Scroll to top"
      className={`
        fixed right-5 bottom-5 z-[9999]

        w-[46px] h-[46px]

        rounded-full

        bg-[linear-gradient(180deg,#ffe29a_0%,#eeba47_48%,#c8932a_100%)]

        text-[#071d4f]

        flex items-center justify-center

        border border-[#d4aa35]

        shadow-[0_10px_24px_rgba(238,186,71,0.35)]

        transition-all duration-500 ease-out

        hover:-translate-y-1
        hover:scale-110
        hover:shadow-[0_16px_32px_rgba(238,186,71,0.50)]
        hover:bg-[linear-gradient(180deg,#fff0b8_0%,#eeba47_50%,#b9851e_100%)]

        active:scale-95

        ${
          show
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible translate-y-5 scale-75"
        }
      `}
    >
      <ChevronUp
        size={26}
        strokeWidth={3}
        className="
          transition-transform duration-300
          group-hover:-translate-y-1
        "
      />
    </button>
  );
}