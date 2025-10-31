import { useState, useEffect } from "react";

export default function ImageGrid({ images = [] }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 mt-10 columns-1 sm:columns-2 md:columns-3 gap-4">
        {images
          .filter((img) => img.small || img.thumb)
          .map((img) => (
            <div
              key={img.id}
              className="mb-4 break-inside-avoid cursor-pointer"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.small || img.thumb}
                alt={img.alt || "Image"}
                className="w-full rounded-lg shadow-md hover:opacity-90 transition"
              />
            </div>
          ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.full || selected.regular || selected.small}
            alt="Selected"
            className="max-w-[95%] max-h-[95%] object-contain rounded-lg shadow-2xl transition-transform transform scale-100 hover:scale-[1.02]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
