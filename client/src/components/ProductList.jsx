import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => {
    console.log("Current Redux State:", state);
    return state.products;
  });

  useEffect(() => {
    console.log("ProductList mounted, fetching products...");
    dispatch(getProducts());
  }, [dispatch]);

  console.log("ProductList render:", { products, loading, error });

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h2>Ürünler ({products.length})</h2>
      {products.length === 0 ? (
        <p>Henüz ürün bulunmuyor.</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Fiyat: {product.price} TL</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
