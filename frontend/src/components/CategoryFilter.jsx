import React from "react";

const CategoryFilter = ({ onFilterChange }) => {
  // Sabit marka ve numara seçenekleri
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "New Balance",
    "Reebok",
    "Under Armour",
    "Asics",
    "Converse",
  ];

  const sizes = Array.from({ length: 15 }, (_, i) => i + 36); // 36-50 arası numaralar

  return (
    <div className="space-y-6">
      {/* Marka Filtresi */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Markalar</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => onFilterChange("brand", brand)}
                className="form-checkbox h-4 w-4 text-orange-600 rounded border-gray-300"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Numara Filtresi */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Numaralar</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterChange("size", size.toString())}
              className="p-2 text-sm border rounded-md hover:bg-orange-50 hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı Filtresi */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Fiyat Aralığı</h3>
        <select
          onChange={(e) => onFilterChange("priceRange", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          <option value="">Tümü</option>
          <option value="0-500">0 - 500 TL</option>
          <option value="500-1000">500 - 1000 TL</option>
          <option value="1000-2000">1000 - 2000 TL</option>
          <option value="2000-99999">2000 TL ve üzeri</option>
        </select>
      </div>

      {/* Renk Filtresi */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Renkler</h3>
        <div className="grid grid-cols-3 gap-2">
          {["Siyah", "Beyaz", "Kırmızı", "Mavi", "Yeşil", "Sarı"].map(
            (color) => (
              <button
                key={color}
                onClick={() => onFilterChange("color", color)}
                className="p-2 text-sm border rounded-md hover:bg-orange-50 hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
              >
                {color}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
