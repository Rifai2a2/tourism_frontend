// Komponen Footer
export default function Footer() {
  return (
    // Elemen utama footer dengan background warna biru keabu-abuan, padding, font sans, dan teks putih
    <footer className="bg-[#4C606D] pt-2 pb-5 px-2 font-sans text-white mt-auto">
      
      {/* Grid dengan 1 kolom di mobile dan 3 kolom di layar medium ke atas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
        
        {/* Bagian About */}
        <div className="footer-about">
          <h3 className="mb-1 text-[20px] font-bold text-white">About</h3>
          <p className="text-[15px] leading-relaxed text-[#e0e0e0]">
            Indonesia tourism introduces the cuisine, natural attractions, 
            and cultural festivals that are present in Indonesia.
          </p>
        </div>

        {/* Bagian Quick Links */}
        <div className="footer-links">
          <h4 className="mb-1 text-[20px] font-bold text-white">Quick Links</h4>
          <ul className="list-none p-0 m-0">
            {/* Setiap item link akan berubah warna jadi oranye (#EC764E) saat di-hover */}
            <li className="mb-1">
              <a href="/" className="text-white text-[15px] transition-colors duration-300 hover:text-[#EC764E]">Home</a>
            </li>
            <li className="mb-1">
              <a href="/menu/culinary" className="text-white text-[15px] transition-colors duration-300 hover:text-[#EC764E]">Culinary</a>
            </li>
            <li className="mb-1">
              <a href="/menu/nature tourism" className="text-white text-[15px] transition-colors duration-300 hover:text-[#EC764E]">Nature Tourism</a>
            </li>
            <li className="mb-1">
              <a href="/menu/cultural festival" className="text-white text-[15px] transition-colors duration-300 hover:text-[#EC764E]">Cultural Festival</a>
            </li>
          </ul>
        </div>

        {/* Bagian Contact & Social Media */}
        <div className="footer-contact">
          <h4 className="mb-1 text-[20px] font-bold text-white">Contact & Social Media</h4>
          <p className="text-[15px] leading-relaxed text-[#e0e0e0]">Email: info@tourismindonesia.com</p>
          <p className="text-[15px] leading-relaxed text-[#e0e0e0]">Instagram: @tourism_indonesia</p>
        </div>
      </div>

      {/* Bagian copyright */}
      <div className="text-center mt-3 pt-3 border-t border-white/20 text-[#e0e0e0] text-[14px]">
        <p>Copyright © 2025 All Right Reserved, Tourism Indonesia</p>
      </div>
    </footer>
  );
}
