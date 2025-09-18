import { useRef, useEffect, useState } from "react";

export default function SectionCard({ title, cards, seeMoreHref, skeleton, onLoading }) {
  const scrollRef = useRef();
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Animasi muncul setelah load
  useEffect(() => {
    if (!skeleton) {
      const t = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(t);
    } else {
      setLoaded(false);
    }
  }, [skeleton]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const tolerance = 10;

    setShowPrev(scrollLeft > tolerance);
    setShowNext(scrollLeft < maxScroll - tolerance);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [cards]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section className="pt-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-5 mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-800">
          {title}
        </h2>
        {!skeleton && seeMoreHref && (
          <a
            href={seeMoreHref}
            className="text-[#0077b6] hover:underline font-semibold transition-colors text-sm sm:text-base"
            onClick={(e) => {
              if (onLoading) onLoading(); // ✅ trigger loader full page
            }}
          >
            See More
          </a>
        )}
      </div>

      {/* Content */}
      <div className="relative flex items-center px-2 z-[1]">
        {/* Fade kiri */}
        {!skeleton && showPrev && (
          <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-[#CCE9FB] to-transparent pointer-events-none z-[5]" />
        )}

        {/* Prev Button */}
        {!skeleton && showPrev && (
          <button
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 rotate-180 z-10 cursor-pointer hidden sm:block"
            onClick={() => scroll("left")}
            aria-label="Prev"
          >
            <img
              src="/img/right-chevron.png"
              alt="Prev"
              className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow hover:scale-125 transition-transform duration-300"
            />
          </button>
        )}

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-12 no-scrollbar"
        >
          {skeleton
            ? // SKELETON LOADER
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-none w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] bg-white rounded-[15px] shadow-md overflow-hidden animate-pulse snap-center"
                >
                  <div className="w-full h-[140px] sm:h-[160px] md:h-[180px] bg-gray-300" />
                  <div className="h-6 bg-gray-300 m-3 rounded w-3/4" />
                </div>
              ))
            :
              cards.map((card, idx) => (
                <div
                  key={card.title + idx}
                  className={`flex-none w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] bg-white rounded-[15px] shadow-md overflow-hidden transform transition duration-700 ease-out snap-center ${
                    loaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  } hover:scale-105 hover:shadow-xl`}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <a
                    href={card.href}
                    className="block no-underline text-inherit"
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-t-[15px] object-cover object-center transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/img/default.jpg";
                      }}
                    />
                    <h3 className="p-3 text-[#474747] text-sm sm:text-base md:text-lg font-semibold text-center line-clamp-2">
                      {card.title}
                    </h3>
                  </a>
                </div>
              ))}
        </div>

        {/* Next Button */}
        {!skeleton && showNext && (
          <button
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer hidden sm:block"
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <img
              src="/img/right-chevron.png"
              alt="Next"
              className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow hover:scale-125 transition-transform duration-300"
            />
          </button>
        )}

        {/* Fade kanan */}
        {!skeleton && showNext && (
          <div className="absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-[#CCE9FB] to-transparent pointer-events-none z-[5]" />
        )}
      </div>
    </section>
  );
}
