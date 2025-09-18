// Komponen ErrorOverlay digunakan untuk menampilkan pesan error di layar
// dengan opsi tombol "Retry" jika ada fungsi retry yang diberikan.
export default function ErrorOverlay({ message, onRetry }) {
  return (
    // Membuat layer penuh (full screen) dengan posisi tetap (fixed)
    <div className="fixed inset-0 flex items-center justify-center bg-[#CCE9FB] z-50">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-red-600 font-semibold mb-4">{message}</p>
        {/* Jika properti onRetry ada, tampilkan tombol "Retry" */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2 bg-[#EC764E] text-white rounded-lg font-bold hover:bg-[#c8512d] transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
