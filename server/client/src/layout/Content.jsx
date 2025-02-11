import logoImage from "../assets/logo.png";
const Content = () => {
  return (
    <div className="flex relative">
      <div className="flex flex-col leading-none  items-start justify-start pt-[90px] pl-4">
        <img
          src={logoImage}
          className="w-[70px]  absolute h-auto -mt-[20px] "
        />

        <div className="flex flex-col  items-start justify-start text-left  pt-[-30px]">
          <div className="font-bold text-[130px] pt-5 text-[#FFD6AE]">
            BORING
          </div>
          <div className="text-[130px] text-8xl text-[#FFD6AE]">SHOSE?</div>
          <div className="text-[20px] mt-[15px] text-white">
            Let Us <span className="font-bold">HELP</span> you fix it...
          </div>
        </div>
        <button className="font-bold text-white bg-orange-500 hover:bg-orange-800 p-2 pl-3  pr-3 rounded-xl mt-[20px] space-x-2">
          <span className="writing-mode-wide">EXPLORE</span>
          <span className="tracking-wide">OUR</span>
          <span className="tracking-wide">STORE</span>
        </button>
      </div>
    </div>
  );
};

export default Content;
