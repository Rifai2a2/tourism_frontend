export default function Logo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-5 pt-5 z-[5] relative gap-4 md:gap-0">
      
      {/* Kiri: Logo Tourism Indonesia */}
      <div className="flex items-center gap-2">
        <img
          src="/img/logo.png"
          alt="Logo Tourism Indonesia"
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full"
        />
        <p className="font-['Inknut_Antiqua',serif] text-[18px] sm:text-[22px] font-bold text-white text-center md:text-left">
          Tourism Indonesia
        </p>
      </div>

      {/* Kanan: Logo Kemnaker & WBI */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-end">
        <img
          src="/img/kemnaker.png"
          alt="Logo Kemnaker"
          className="w-[100px] h-[70px] sm:w-[120px] sm:h-[80px] md:w-[150px] md:h-[100px] object-contain"
        />
        <img
          src="/img/wbi.png"
          alt="Logo WBI"
          className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] object-contain"
        />
      </div>
    </div>
  );
}
