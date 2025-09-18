import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/footer";
import Logo from "../components/logo";
import ErrorOverlay from "../components/ErrorOverlay";
import FullPageLoader from "../components/FullPageLoader";

const API_URL = "http://localhost:1337/api";
const BASE_URL = "http://localhost:1337";
const AUTH =
  "Bearer 73085588208a6579d3c9e701d505aff718e187f6017177fc326876db6c2876c2fc5c4e11085582b23060bc1b73f532d8b77ddc477bb5a8a38f05ea56f4156598471e7f7a955b7124f24a6c2ee7663dbd6d738b8406c655f2bf003153abbfe425adbfc4fd5cfade2e19b1df5dbef6be2f43f3a7c453ae67c0b6d2319cb40252a8";

export default function Menu() {
  const { type } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const fetchData = () => {
    let endpoint = "";
    let queryKey = "";

    if (type === "culinary") {
      endpoint = "culinaris";
      queryKey = "culinaries";
    }
    if (type === "nature tourism") {
      endpoint = "natures";
      queryKey = "natures";
    }
    if (type === "cultural festival") {
      endpoint = "festivals";
      queryKey = "festivals";
    }

    if (!endpoint) return;

    setLoading(true);
    setError("");

    fetch(`${API_URL}/${endpoint}?populate=*`, {
      headers: { Authorization: AUTH },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data from the server");
        return res.json();
      })
      .then((data) => {
        const parsed = (data.data || []).map((item) => {
          const attributes = item.attributes || item;
          const title = attributes.title || "No Title";

          let imgUrl = null;
          if (Array.isArray(attributes.image) && attributes.image.length > 0) {
            imgUrl =
              attributes.image[0].formats?.medium?.url ||
              attributes.image[0].formats?.small?.url ||
              attributes.image[0].url;
          } else if (attributes.image?.url) {
            imgUrl =
              attributes.image.formats?.medium?.url ||
              attributes.image.formats?.small?.url ||
              attributes.image.url;
          }

          const fullImg = imgUrl
            ? imgUrl.startsWith("http")
              ? imgUrl
              : `${BASE_URL}${imgUrl}`
            : "/img/default.jpg";

          return {
            title,
            img: fullImg,
            href: `/detail?${queryKey}=${encodeURIComponent(title)}`,
          };
        });

        setCards(parsed);
        setTimeout(() => setLoaded(true), 200); 
      })
      .catch(() =>
        setError("Failed to load data from the server. Please try again.")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div className="flex flex-col min-h-screen bg-[#CCE9FB] relative">
      {/* Loader full page */}
      {loading && <FullPageLoader />}

      <Logo />

      <div className="w-[70%] max-w-[1000px] mx-auto flex-1">
        
        <nav
          className={`text-sm my-5 transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
          }`}
        >
          <Link to="/" className="text-[#0077b6] hover:underline">
            Home
          </Link>{" "}
          <span>&gt;</span>{" "}
          <span className="text-gray-700 capitalize">{type}</span>
        </nav>

        {/* Hero Title */}
        <h1
          className={`text-3xl font-bold mb-6 capitalize transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {type}
        </h1>

        {/* Error */}
        {error && <ErrorOverlay message={error} onRetry={fetchData} />}

        {/* No Data */}
        {!loading && !error && cards.length === 0 && (
          <p className="text-center text-gray-600 py-10">No data found.</p>
        )}

        {/* Cards */}
        {!loading && !error && cards.length > 0 && (
          <section
            className={`mb-16 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ transitionDelay: `${i * 100}ms` }} 
                >
                  <Link to={card.href}>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-[250px] object-cover rounded-t-2xl transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="text-center py-3 font-bold text-lg hover:text-[#0077b6]">
                      {card.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
