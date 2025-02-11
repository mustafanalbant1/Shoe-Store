import Image from "../assets/1.png";
import { FaRegTrashCan } from "react-icons/fa6";
const ProductsBasket = () => {
  return (
    <div>
      <div className="flex justify-between items-center m-3">
        <img src={Image} alt="" className="w-[100px] h-[100px]" />
        <div>
          <h1>Product Name</h1>
          <h1>Product Price</h1>
        </div>
        <div>
          <h1>Quantity</h1>
          <h1>Total Price</h1>
        </div>
        <div>
          <FaRegTrashCan size={25} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ProductsBasket;
