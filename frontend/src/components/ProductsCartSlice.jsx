import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/slices/productSlice";

const ProductsCartSlice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_TO_SHOW = 4; // Bir seferde gösterilecek ürün sayısı

  const { products, loading } = useSelector((state) => ({
    products: state.products.products || [],
    loading: state.products.loading,
  }));

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePrevious = () => {
    setStartIndex((prev) =>
      prev === 0
        ? Math.max(0, products.length - ITEMS_TO_SHOW)
        : Math.max(0, prev - ITEMS_TO_SHOW)
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + ITEMS_TO_SHOW >= products.length ? 0 : prev + ITEMS_TO_SHOW
    );
  };

  const handleBuyNow = (productId) => {
    navigate(`/detail/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const visibleProducts = products.slice(
    startIndex,
    startIndex + ITEMS_TO_SHOW
  );

  return (
    <div className="flex-col relative z-20 -mt-[20px] -mr-[50px]">
      <div className="flex items-end justify-end space-x-2 mb-4 ml-auto">
        <div
          onClick={handlePrevious}
          className="flex text-white bg-orange-600 rounded-full p-2 cursor-pointer hover:bg-orange-700 transition-colors duration-200"
        >
          <HiOutlineArrowSmLeft size={30} />
        </div>
        <div
          onClick={handleNext}
          className="flex text-white bg-orange-600 rounded-full p-2 cursor-pointer hover:bg-orange-700 transition-colors duration-200"
        >
          <HiOutlineArrowSmRight size={30} />
        </div>
      </div>

      <div className="flex space-x-4 overflow-hidden">
        {visibleProducts.map((product, index) => (
          <div
            key={product._id}
            onClick={() => handleBuyNow(product._id)}
            className="flex cursor-pointer transform hover:scale-105 transition-transform duration-200"
            style={{
              transform: `translateX(${index * 10}px)`, // Her kart biraz öne çıkıyor
            }}
          >
            <div className="flex relative w-[300px] h-[100px]">
              <div className="flex w-1/3 bg-blue-400 rounded-l-2xl overflow-hidden">
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-[100px] absolute -ml-[10px] mt-[15px] rotate-[-15deg]"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className="flex flex-col w-1/2 text-[#5B5A5A] font-bold items-start justify-start pl-2 pt-3 italic bg-white rounded-r-2xl">
                <div className="truncate w-full">{product.name}</div>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <IoMdStar
                      key={idx}
                      className={
                        idx < (product.rating || 5)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div>{product.price?.toLocaleString("tr-TR")} ₺</div>
                <div className="text-gray-300 text-sm">
                  {product.category || "Men's Shoes"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(products.length / ITEMS_TO_SHOW) }).map(
          (_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                Math.floor(startIndex / ITEMS_TO_SHOW) === idx
                  ? "w-4 bg-orange-600"
                  : "bg-gray-300"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductsCartSlice;
