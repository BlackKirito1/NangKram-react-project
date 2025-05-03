import { FaFacebookSquare, FaInstagram, FaLine } from "react-icons/fa";
import Map from "../assets/images/mapp.png";
import { MdAttachEmail } from "react-icons/md";

const MainFooter = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center py-10 bg-[#394D72] text-white text-center md:text-left">
      <div className="text-lg md:text-2xl px-6">
        <h1 className="underline mb-3">ช่องทางติดต่อ</h1>
        <p>เปิดบริการทุกวัน 9:00 - 17:00 น.</p>
        <p className="font-bold">
          เบอร์โทร: <span className="font-normal">081 871 2945</span>
        </p>
        <p className="font-bold">
          อีเมล: <span className="font-normal">heaunnangkram@gmail.com</span>
        </p>
        <p className="font-bold">
          ที่อยู่: <span className="font-normal">116/1 เมือง สกลนคร 47000</span>
        </p>
        <div className="flex justify-center md:justify-start mt-4 space-x-4">
          <a href="https://line.me/R/ti/p/@632fmncd">
            <FaLine className="w-10 h-10 text-green-500" />
          </a>
          <a href="https://www.facebook.com/share/18yiJSvUtP/?mibextid=wwXIfr">
            <FaFacebookSquare className="w-10 h-10 text-blue-500" />
          </a>
          <a href="https://www.instagram.com/nangkram_?igsh=anhsY3R3YTd0dmJj">
            <FaInstagram className="w-10 h-10 bg-gradient-to-bl rounded-lg from-pink-500 via-purple-500 to-orange-500 text-white p-2" />
          </a>
          <a
            href="mailto:heaunnangkram@gmail.com"
            className="flex items-center justify-center md:justify-start gap-2 text-white text-lg hover:underline"
          >
            <MdAttachEmail className="w-10 h-10 text-yellow-500" />
          </a>
        </div>
      </div>
      <div>
        <img
          className="bg-white rounded-md w-[400px] md:[250px] flex items-center justify-center text-black text-lg"
          src={Map}
          alt=""
        />
      </div>
    </footer>
  );
};

export default MainFooter;
