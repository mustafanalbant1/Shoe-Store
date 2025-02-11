import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ProductCart from "../components/ProductCart";
import Vector from "../assets/Vector.png";
import ProductsCartSlice from "../components/ProductsCartSlice";
import Basket from "../components/basket";
import { useState } from "react";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const handleVsible = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex w-screen h-screen relative  bg-[#1b212c]">
      <img
        src={Vector}
        className="absolute w-screen h-full ml-[450px] -mt-[30px] rotate-[-5deg]"
        style={{
          filter: "contrast(10%) sepia(100%) saturate(10%) hue-rotate(200deg)",
        }}
      />

      <div className="flex w-1/6 relative justify-center ml-[-70px]">
        <Footer />
      </div>
      {visible ? (
        <div className="flex items-end z-30 pl-5">
          <Basket setVisible={handleVsible} />
        </div>
      ) : null}

      <div className="flex flex-col w-5/6 ml-[10px] ">
        <Header setVisible={handleVsible} />

        <div className="flex flex-row mt-1 space-x-6">
          <div>
            <Content />
          </div>
          <div className="relative">
            <ProductCart />
          </div>
        </div>

        <div className="flex flex-col items-end justify-end mr-[100px] mb-4">
          <div className="ml-4">
            <ProductsCartSlice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
