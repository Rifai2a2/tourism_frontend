export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      {/* Animasi teks loading */}
      <p className="text-xl font-semibold text-[#EC764E] mb-4 flex gap-1">
        Loading
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-150">.</span>
        <span className="animate-bounce delay-300">.</span>
      </p>

      {/* Spinner kecil tambahan */}
      <div className="w-10 h-10 border-4 border-[#EC764E] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
