import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ImageGrid from "../components/ImageGrid";
import { FaArrowUp } from "react-icons/fa";

const API = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export default function Home({ user }) {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [open, setOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const dropdownRef = useRef(null);

  const fetchRandom = async () => {
    const { data } = await axios.get(`${API}/images/random`);
    setImages(data);
  };

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    const { data } = await axios.get(`${API}/history`);
    setHistory(data.history.slice(0, 5));
  }, [user]);

  const fetchTopSearches = async () => {
    try {
      const { data } = await axios.get(`${API}/top-searches`);
      setTopSearches(data.top.slice(0, 5));
    } catch (err) {
      console.error("Top Searches Fetch Error:", err);
    }
  };

  const searchImages = async (term) => {
    if (typeof term !== "string") term = query;
    if (!term.trim()) return fetchRandom();

    try {
      setQuery(term);
      setOpen(false);
      const { data } = await axios.post(`${API}/search`, { term });
      setImages(data.results);
      fetchHistory();
      fetchTopSearches();
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
    }
  };

  const deleteHistory = async (id) => {
    await axios.delete(`${API}/history/${id}`);
    setHistory(history.filter((h) => h._id !== id));
  };

  useEffect(() => {
    fetchRandom();
    fetchHistory();
    fetchTopSearches();
  }, [fetchHistory]);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white relative">
      <Navbar user={user} />
      <section className="pt-20 pb-8 px-6 max-w-7xl mx-auto flex flex-col  md:items-start md:justify-between gap-8">

        <div className="flex-1" ref={dropdownRef}>
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-6">
            Discover Amazing <span className="text-indigo-600">Images</span>
          </h1>

          <div className="w-full bg-white rounded-2xl shadow-xl border relative">
            <div className="flex items-center gap-2 p-3">
              <input
                type="text"
                value={query}
                placeholder="Search anything..."
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onKeyDown={(e) => e.key === "Enter" && searchImages()}
                className="w-full px-3 py-2 focus:outline-none"
              />
              <button
                onClick={searchImages}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
              >
                Search
              </button>
            </div>

            {open && history.length > 0 && (
              <div
                className="absolute left-0 top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50"
              >
                <p className="text-gray-600 text-xs mb-2 px-2 text-left font-semibold pt-2">
                  Recent Searches
                </p>
                {history.map((h) => (
                  <div
                    key={h._id}
                    className="flex justify-between px-3 py-2 hover:bg-gray-100"
                  >
                    <button
                      onClick={() => searchImages(h.term)}
                      className="text-left w-full"
                    >
                      {h.term}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistory(h._id);
                      }}
                      className="text-gray-400 hover:text-red-600 font-bold transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block absolute top-24 right-8 w-64 bg-white rounded-2xl shadow-xl border p-4">
          <h2 className="text-lg font-semibold text-indigo-600 mb-3 flex items-center gap-1">
            🔥 Top Searches
          </h2>
          {topSearches.length > 0 ? (
            <div className="flex flex-col gap-2">
              {topSearches.map((t, i) => (
                <button
                  key={t.term}
                  onClick={() => searchImages(t.term)}
                  className="w-full text-left px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition"
                >
                  #{i + 1} {t.term}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No top searches yet</p>
          )}
        </div>

      </section>

      <ImageGrid images={images} />

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-110 focus:outline-none"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
