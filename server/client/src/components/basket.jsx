import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

const Basket = ({ setVisible }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleVisible = () => {
    setVisible(false);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Ürün sepetten kaldırıldı");
  };

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ _id: itemId, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute top-0 right-0 w-[500px] h-full bg-white rounded-l-2xl">
        <div className="flex justify-between items-center border-b-2 border-gray-300 p-3 m-3">
          <h1 className="text-xl font-semibold">
            Sepetim ({cartItems.length} Ürün)
          </h1>
          <RxCross2
            onClick={handleVisible}
            size={30}
            className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
          />
        </div>

        <div className="flex flex-col overflow-y-auto h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🛒</span>
              <p>Sepetiniz boş</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="relative p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <RxCross2 size={20} />
                </button>

                <div className="flex items-center">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>Numara: {item.size}</span>
                      <span className="mx-2">|</span>
                      <span>Renk: {item.color}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity, -1)
                          }
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <IoRemoveOutline size={20} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity, 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <IoAddOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-orange-600">
                      {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.price.toLocaleString("tr-TR")} ₺ / adet
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Toplam Tutar:</span>
              <span className="text-2xl font-bold text-orange-600">
                {calculateTotal().toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full font-semibold transition-colors">
              Sipariş Ver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
