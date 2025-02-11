import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productSlice";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  const { products, loading } = useSelector((state) => ({
    products: state.products.products || [],
    loading: state.products.loading,
  }));

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [activeFilters, setActiveFilters] = useState({
    type: null,
    brand: null,
    size: null,
    color: null,
    priceRange: null,
  });

  // Component mount olduğunda ürünleri getir
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Products değiştiğinde filteredProducts'ı güncelle
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      // Eğer aynı değer tekrar seçilirse filtreyi kaldır
      if (prev[filterType] === value) {
        return { ...prev, [filterType]: null };
      }
      // Yeni filtre değerini ekle
      return { ...prev, [filterType]: value };
    });
  };

  useEffect(() => {
    let filtered = [...products];

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Marka filtresi
    if (activeFilters.brand) {
      filtered = filtered.filter(
        (product) => product.brand === activeFilters.brand
      );
    }

    // Numara filtresi
    if (activeFilters.size) {
      filtered = filtered.filter(
        (product) => String(product.size) === activeFilters.size
      );
    }

    // Renk filtresi
    if (activeFilters.color) {
      filtered = filtered.filter(
        (product) => product.color === activeFilters.color
      );
    }

    // Fiyat aralığı filtresi
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange.split("-").map(Number);
      filtered = filtered.filter((product) => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    setFilteredProducts(filtered);
  }, [products, activeFilters, searchQuery]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Detay sayfasına yönlendirmeyi engelle
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        size: product.size,
        color: product.color,
        quantity: 1,
      })
    );

    // Kullanıcıya bildirim göster
    toast.success("Ürün sepete eklendi!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="md:w-1/4 shrink-0">
        <CategoryFilter onFilterChange={handleFilterChange} />
        {/* Aktif Filtreler */}
        {Object.entries(activeFilters).some(([_, value]) => value !== null) && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Aktif Filtreler</h3>
              <button
                onClick={() =>
                  setActiveFilters({
                    type: null,
                    brand: null,
                    size: null,
                    color: null,
                    priceRange: null,
                  })
                }
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Tümünü Temizle
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([key, value]) => {
                if (value) {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700"
                    >
                      {value}
                      <button
                        onClick={() =>
                          setActiveFilters((prev) => ({ ...prev, [key]: null }))
                        }
                        className="ml-2 hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} ürün bulundu
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Sırala:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="border rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
              <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
              <option value="name-asc">İsim (A-Z)</option>
              <option value="name-desc">İsim (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative group">
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>

              <div className="p-4">
                <h2 className="text-md font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-orange-600">
                      {product.price?.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-xs text-gray-600">
                    <span>Numara: {product.size}</span>
                    <span>Renk: {product.color}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Seçilen filtrelere uygun ürün bulunamadı.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
