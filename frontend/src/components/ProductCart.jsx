import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";

const ProductCart = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => ({
    products: state.products.products || [],
    loading: state.products.loading,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const handleBuyNow = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Eğer ürün yoksa veya yüklenmediyse varsayılan değerler göster
  const currentProduct = products[currentIndex] || {
    name: "NIKE AIR MAX III",
    price: 189,
    rating: 4,
  };

  return (
    <div className="relative z-20 w-full h-[600px]">
      <div className="mt-[80px] relative group">
        <img
          src={currentProduct.images?.[0]?.url || "/placeholder.jpg"}
          className="w-[600px] transition-opacity duration-300 group-hover:opacity-90"
          alt={currentProduct.name}
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-row w-full items-center justify-center -mt-[150px] ml-[250px]">
        <IoIosArrowBack
          onClick={handlePrevious}
          className="text-white text-5xl cursor-pointer hover:text-orange-700 mr-10 transform hover:scale-110 transition-transform duration-200"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-white italic text-[30px] hover:text-orange-200 transition-colors duration-200">
            {currentProduct.name}
          </div>
          <div className="flex items-center justify-center text-white text-lg space-x-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <IoMdStar
                  key={index}
                  className={`${
                    index < (currentProduct.rating || 4)
                      ? "text-yellow-300"
                      : "text-white"
                  } transition-colors duration-200`}
                />
              ))}
            </div>

            <div>
              |{" "}
              <span className="text-orange-200">
                {currentProduct.price?.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleBuyNow(currentProduct._id)}
              className="px-10 py-2 bg-transparent font-bold text-orange-600 border-[4px] border-orange-600 rounded-xl 
                hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              BUY NOW
            </button>
          </div>
        </div>

        <IoIosArrowForward
          onClick={handleNext}
          className="text-white text-5xl cursor-pointer hover:text-orange-700 ml-10 transform hover:scale-110 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default ProductCart;
