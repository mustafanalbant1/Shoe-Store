import { CgShoppingBag } from "react-icons/cg";
import { SiNike } from "react-icons/si";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ setVisible }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  // Arama sonuçlarını filtrele
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // İlk 5 sonucu göster
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const handleVisible = () => {
    setVisible(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/category/search?q=${searchTerm}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/detail/${productId}`);
    setShowSearch(false);
    setSearchTerm("");
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  // Dışarı tıklandığında arama kutusunu kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && !event.target.closest(".search-container")) {
        setShowSearch(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return (
    <div className="flex w-[1500px] relative items-center justify-between">
      <div className="flex">
        <SiNike size={100} className="text-white cursor-pointer" />
      </div>

      <div className="flex space-x-[70px] text-[30px] font-bold text-white">
        <Link
          to="/category/men"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          MEN
        </Link>
        <Link
          to="/category/women"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          WOMEN
        </Link>
        <Link
          to="/category/kids"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          KIDS
        </Link>
        <Link
          to="/category/collections"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          COLLECTIONS
        </Link>
      </div>

      <div className="flex space-x-7 p-[10px] items-center">
        {/* Arama Bölümü */}
        <div className="relative search-container">
          <IoSearchOutline
            size={30}
            className="text-orange-600 cursor-pointer"
            onClick={toggleSearch}
          />
          {showSearch && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg p-2 z-50">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Ürün ara..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-orange-600"
                autoFocus
              />
              {/* Arama Sonuçları */}
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleResultClick(product._id)}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    >
                      <img
                        src={product.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.price?.toLocaleString("tr-TR")} ₺
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchTerm && searchResults.length === 0 && (
                <div className="p-2 text-gray-500 text-sm">
                  Sonuç bulunamadı
                </div>
              )}
            </div>
          )}
        </div>

        <div
          onClick={handleVisible}
          className="text-white bg-orange-600 rounded-full cursor-pointer"
        >
          <CgShoppingBag className="m-2" size={25} />
        </div>
      </div>
    </div>
  );
};

export default Header;
