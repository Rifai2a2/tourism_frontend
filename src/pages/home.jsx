import React, { useEffect, useState } from "react";
import HeroSlider from "../components/slider";
import Footer from "../components/footer";
import SectionCard from "../components/SectionCard";
import ErrorOverlay from "../components/ErrorOverlay";
import FullPageLoader from "../components/FullPageLoader";

const API_URL = "http://localhost:1337/api";
const BASE_URL = "http://localhost:1337";
const AUTH =
  "Bearer 73085588208a6579d3c9e701d505aff718e187f6017177fc326876db6c2876c2fc5c4e11085582b23060bc1b73f532d8b77ddc477bb5a8a38f05ea56f4156598471e7f7a955b7124f24a6c2ee7663dbd6d738b8406c655f2bf003153abbfe425adbfc4fd5cfade2e19b1df5dbef6be2f43f3a7c453ae67c0b6d2319cb40252a8";

function parseCards(data, type) {
  return (data.data || []).map((item) => {
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
      href: `/detail?${type}=${encodeURIComponent(title)}`,
    };
  });
}

export default function Home() {
  const [culinaryCards, setCulinaryCards] = useState([]);
  const [natureCards, setNatureCards] = useState([]);
  const [festivalCards, setFestivalCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError("");
    setLoaded(false); 

    Promise.all([
      fetch(`${API_URL}/culinaris?populate=*`, {
        headers: { Authorization: AUTH },
      }).then((res) => res.json()),

      fetch(`${API_URL}/natures?populate=*`, {
        headers: { Authorization: AUTH },
      }).then((res) => res.json()),

      fetch(`${API_URL}/festivals?populate=*`, {
        headers: { Authorization: AUTH },
      }).then((res) => res.json()),
    ])
      .then(([culinaryData, natureData, festivalData]) => {
        setCulinaryCards(parseCards(culinaryData, "culinaries"));
        setNatureCards(parseCards(natureData, "natures"));
        setFestivalCards(parseCards(festivalData, "festivals"));
        setTimeout(() => setLoaded(true), 200); 
      })
      .catch(() =>
        setError("Failed to load data from the server. Please try again.")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#CCE9FB] min-h-screen flex flex-col relative">

      {loading && <FullPageLoader />}

      <HeroSlider disabled={loading} className="w-full h-auto" />

      <main className="flex-grow px-4 sm:px-6 md:px-10 max-w-[1200px] mx-auto w-full">

        {error && <ErrorOverlay message={error} onRetry={fetchData} />}

        <div
          className={`transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <SectionCard
            title="Culinary"
            cards={culinaryCards}
            skeleton={loading}
            seeMoreHref="/menu/culinary"
          />
        </div>

        <div
          className={`transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <SectionCard
            title="Nature Tourism"
            cards={natureCards}
            skeleton={loading}
            seeMoreHref="/menu/nature tourism"
          />
        </div>

        <div
          className={`transition-all duration-700 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <SectionCard
            title="Cultural Festival"
            cards={festivalCards}
            skeleton={loading}
            seeMoreHref="/menu/cultural festival"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
