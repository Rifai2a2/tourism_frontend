import { useState, useEffect } from "react";
import Logo from "./logo";
import Navbar from "./Navbar";

const slides = [
  { src: "/img/slider.jpg", alt: "Raja Ampat" },
  { src: "/img/toba.jpg", alt: "Pantai" },
  { src: "/img/bromo.jpg", alt: "Gunung Bromo" },
  { src: "/img/gili.png", alt: "Gili Trawangan" },
];

export default function HeroSlider({ disabled = false }) {
  const [current, setCurrent] = useState(0);

  // Auto slide hanya aktif kalau tidak disabled
  useEffect(() => {
    if (disabled) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [disabled]);

  const prevSlide = () => {
    if (disabled) return;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (disabled) return;
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <header className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Wrapper untuk gambar */}
      <div className="absolute w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              current === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}

        {/* Tombol Prev */}
        <button
          className="prev absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 rotate-180 z-10"
          onClick={prevSlide}
          aria-label="Previous"
          disabled={disabled}
        >
          <img
            src="/img/right-chevron.png"
            alt="Prev"
            className={`w-7 h-7 sm:w-10 sm:h-10 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
              disabled ? "opacity-50" : "hover:scale-125"
            }`}
          />
        </button>

        {/* Tombol Next */}
        <button
          className="next absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10"
          onClick={nextSlide}
          aria-label="Next"
          disabled={disabled}
        >
          <img
            src="/img/right-chevron.png"
            alt="Next"
            className={`w-7 h-7 sm:w-10 sm:h-10 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
              disabled ? "opacity-50" : "hover:scale-125"
            }`}
          />
        </button>

        {/* Dot Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => !disabled && setCurrent(idx)}
              className={`rounded-full transition-all duration-300 ${
                current === idx
                  ? "w-4 h-4 bg-[#EC764E] scale-110"
                  : "w-3 h-3 bg-white/60 hover:bg-white"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <Logo />
      <Navbar />
    </header>
  );
}
