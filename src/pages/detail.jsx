import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Logo from "../components/logo";
import Footer from "../components/footer";
import FullPageLoader from "../components/FullPageLoader";
import ErrorOverlay from "../components/ErrorOverlay";

const API_URL = "http://localhost:1337/api";
const BASE_URL = "http://localhost:1337";
const AUTH =
  "Bearer 73085588208a6579d3c9e701d505aff718e187f6017177fc326876db6c2876c2fc5c4e11085582b23060bc1b73f532d8b77ddc477bb5a8a38f05ea56f4156598471e7f7a955b7124f24a6c2ee7663dbd6d738b8406c655f2bf003153abbfe425adbfc4fd5cfade2e19b1df5dbef6be2f43f3a7c453ae67c0b6d2319cb40252a8";

export default function Detail() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const typeKey =
    (searchParams.has("culinaries") && "culinary") ||
    (searchParams.has("natures") && "nature tourism") ||
    (searchParams.has("festivals") && "cultural festival");

  const titleParam =
    searchParams.get("culinaries") ||
    searchParams.get("natures") ||
    searchParams.get("festivals");

  const fetchData = () => {
    if (!titleParam) return;

    setLoading(true);
    setError("");
    setData(null);

    const endpoints = ["culinaries", "natures", "festivals"];

    Promise.all(
      endpoints.map((ep) =>
        fetch(`${API_URL}/${ep}?populate=*&pagination[pageSize]=100`, {
          headers: { Authorization: AUTH },
        }).then((res) => res.json())
      )
    )
      .then((results) => {
        let found = null;
        for (const dataset of results) {
          found = dataset.data.find(
            (item) =>
              item.title === titleParam || item.attributes?.title === titleParam
          );
          if (found) {
            const attributes = found.attributes || found;
            let images = [];

            if (Array.isArray(attributes.image) && attributes.image.length > 0) {
              images = attributes.image.map(
                (img) =>
                  `${BASE_URL}${
                    img.formats?.large?.url ||
                    img.formats?.medium?.url ||
                    img.formats?.small?.url ||
                    img.url
                  }`
              );
            } else if (attributes.image?.url) {
              images = [
                `${BASE_URL}${
                  attributes.image.formats?.large?.url ||
                  attributes.image.formats?.medium?.url ||
                  attributes.image.formats?.small?.url ||
                  attributes.image.url
                }`,
              ];
            } else {
              images = ["/img/default.jpg"];
            }

            setData({
              title: attributes.title,
              description:
                attributes.description || "No description available.",
              images,
              mapEmbed: attributes.mapEmbed,
              mapLink: attributes.mapLink,
            });

            setTimeout(() => setLoaded(true), 200);
            return;
          }
        }
        if (!found) setError("Data not found.");
      })
      .catch(() =>
        setError("Failed to load data from the server. Please try again.")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [titleParam]);

  const nextSlide = () => {
    if (!data?.images) return;
    setCurrentSlide((prev) => (prev + 1) % data.images.length);
  };

  const prevSlide = () => {
    if (!data?.images) return;
    setCurrentSlide((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!data?.images || data.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-[#CCE9FB]">
      <Logo />

      {/* Loader full page */}
      {loading && <FullPageLoader />}

      {/* Error overlay */}
      {!loading && error && <ErrorOverlay message={error} onRetry={fetchData} />}

      {/* Konten Detail */}
      {!loading && !error && data && (
        <>
         
    <nav
      className={`w-[95%] max-w-4xl mx-auto mt-5 text-sm flex gap-2 items-center transition-all duration-700 delay-100 ${
      loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
    }`}
    >
            <Link
              to="/"
              className="text-blue-600 hover:text-[#005f8a] hover:underline"
            >
              Home
            </Link>
            <span>&gt;</span>
            {typeKey && (
              <>
                <Link
                  to={`/menu/${typeKey}`}
                  className="text-blue-600 hover:text-[#005f8a] hover:underline capitalize"
                >
                  {typeKey}
                </Link>
                <span>&gt;</span>
              </>
            )}
            <span className="text-gray-800">{data.title}</span>
          </nav>

          {/* Title */}
         <h1
          className={`w-[95%] max-w-4xl mx-auto mt-2 mb-5 text-3xl font-bold text-gray-800 transition-all duration-700 delay-200 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
>
         {data.title}
          </h1>

         {/* Hero Slider */}
<section
 className={`w-[95%] max-w-4xl mx-auto mb-8 relative transition-all duration-700 delay-300 ${
    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`}
    >
  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-md">
    {data.images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`${data.title} ${idx + 1}`}
        className={`absolute w-full h-full object-cover transition-opacity duration-200 ${
          idx === currentSlide ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>

  {/* Tombol prev & next */}
  {data.images.length > 1 && (
    <>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100"
      >
        <img
          src="/img/right-chevron.png"
          alt="Prev"
          className="w-10 h-10 rotate-180 drop-shadow"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100"
      >
        <img
          src="/img/right-chevron.png"
          alt="Next"
          className="w-10 h-10 drop-shadow"
        />
      </button>

     {/* DOT Indicator */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
  {data.images.map((_, idx) => (
    <div
      key={idx}
      onClick={() => setCurrentSlide(idx)}
      className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
        idx === currentSlide
          ? "bg-[#EC764E] scale-125 animate-pulse"
          : "bg-white/70 hover:bg-white"
      }`}
    ></div>
  ))}
</div>
    </>
  )}
</section>
          {/* Detail */}
          <section
            className={`w-[90%] max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-700 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
           }`}
          >
            <h3 className="text-xl font-semibold mb-3">Detail</h3>
            <p className="text-gray-700 leading-relaxed">
              {data.description}
            </p>
          </section>

          {/* Map */}
         {data.mapEmbed && (
          <section
            className={`w-[90%] max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-700 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
            >
              <h3 className="text-xl font-semibold mb-3">Directions</h3>
              <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src={data.mapEmbed}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
              {data.mapLink && (
                <a
                  href={data.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-5 py-3 bg-[#EC764E] text-white rounded-lg font-bold hover:bg-[#c8512d] transition"
                >
                  Find the destination closest to your current location
                </a>
              )}
            </section>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}
