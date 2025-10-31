import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleCloseProfile = (e) => {
      if (e.key === "Escape") setShowProfile(false);
      if (!modalRef.current?.contains(e.target) && e.target.classList.contains("overlay")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleCloseProfile);
    document.addEventListener("keydown", handleCloseProfile);
    return () => {
      document.removeEventListener("mousedown", handleCloseProfile);
      document.removeEventListener("keydown", handleCloseProfile);
    };
  }, []);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            ImgSearch
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
                {user.avatar ? (
                  <img
                    src={user.avatar.replace("=s96-c", "=s200-c")}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border object-cover"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name);
                    }}
                  />
                ) : (
                  <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium uppercase">
                    {user.name?.charAt(0)}
                  </div>
                )}
                <FaChevronDown className="text-xs text-gray-600" />
              </button>

              {open && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white border rounded-lg shadow-lg text-sm z-50">
                  <p className="px-3 py-2 font-semibold text-gray-800 border-b truncate">
                    {user.name}
                  </p>
                  <button
                    onClick={() => {
                      setShowProfile(true);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                  >
                    Profile
                  </button>
                  <a
                    href="/auth/logout"
                    className="block px-3 py-2 hover:bg-red-50 text-red-500"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] overlay transition-opacity">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Profile Details
            </h2>

            <div className="flex flex-col items-center text-center space-y-3">
              {user.avatar ? (
                <img
                  src={user.avatar.replace("=s96-c", "=s200-c")}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border object-cover"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-semibold uppercase">
                  {user.name?.charAt(0)}
                </div>
              )}

              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
