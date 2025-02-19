import { TbMenu3 } from "react-icons/tb";
import { FiInstagram } from "react-icons/fi";
import { IoLogoFacebook } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-full items-center justify-between text-white py-6 space-y-6">
      <TbMenu3 className="w-10 h-10 text-white hover:text-orange-600" />
      <div className="flex flex-col items-center text-lg font-bold">
        <div className="hover:text-orange-500 cursor-pointer transform writing-mode -rotate-90">
          DELIVERY
        </div>
        <div className="hover:text-white text-orange-500 cursor-pointer transform writing-mode -rotate-90 mt-[120px]">
          PACKAGING
        </div>
        <div className="hover:text-orange-500 cursor-pointer transform writing-mode -rotate-90 mt-[100px]">
          FAQ
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <FaXTwitter className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
        <FiInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
        <IoLogoFacebook className="w-6 h-6 hover:text-blue-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
