import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, clearProduct } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
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

      toast.success("Ürün sepete eklendi!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl">Hata: {error}</div>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-xl">Ürün bulunamadı</div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="relative aspect-square mb-4">
            <img
              src={product.images?.[selectedImage]?.url || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = "/placeholder.jpg";
              }}
            />
          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden
                    ${
                      selectedImage === index
                        ? "border-orange-600"
                        : "border-transparent"
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-24 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating?.toFixed(1) || "0.0"} / 5.0
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex justify-between items-center mb-6">
            <span className="text-3xl font-bold text-orange-600">
              {product.price?.toLocaleString("tr-TR")} ₺
            </span>
            <span className="text-lg text-gray-600">Stok: {product.stock}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {product.category && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Kategori</span>
                <p className="font-semibold">{product.category}</p>
              </div>
            )}
            {product.brand && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Marka</span>
                <p className="font-semibold">{product.brand}</p>
              </div>
            )}
            {product.color && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Renk</span>
                <p className="font-semibold">{product.color}</p>
              </div>
            )}
            {product.size && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Numara</span>
                <p className="font-semibold">{product.size}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-full text-lg font-semibold transition-colors duration-200"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
