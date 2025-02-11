import { useParams } from "react-router-dom";
import Products from "./products";

const Category = () => {
  const { categoryName } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {categoryName}
          </h1>
          <p className="text-gray-600 mt-2">
            {categoryName} kategorisindeki tüm ürünleri keşfedin
          </p>
        </div>
        <Products />
      </div>
    </div>
  );
};

export default Category;
