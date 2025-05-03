import { FaFacebookSquare, FaInstagram, FaLine } from "react-icons/fa";
import logo from "../assets/images/logo.ico"

const Contact = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24 bg-gray-50 py-20 mx-10 mt-10">
      <div className="justify-items-center">
        <h1 className="text-3xl font-bold mb-6 text-left text-gray-800">
          "เฮือนนางคราม"
        </h1>
      </div>
      <div className="flex justify-center space-x-2">

        <div>
          <div>
            <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              แหล่งเรียนรู้ครามธรรมชาติจังหวัดสกลนคร ตั้งแต่กระบวนการปลูก การทำเนื้อคราม การก่อหม้อคราม ย้อมครามธรรมชาติ
              ผลิตและจัดจำหน่ายวัตถุดิบในการก่อหม้อคราม รวมถึงของฝากของที่ระลึก ผ้าครามธรรมชาติ
            </p>
          </div>
          <div className="flex">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="bg-white rounded-lg p-8 max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ช่องทางติดต่อ</h2>
              <p className="text-gray-600 mb-2">เปิดบริการทุกวัน 9:00 - 17:00 น.</p>
              <p className="text-gray-600 mb-2">เบอร์โทร: <span className="font-semibold">081 871 2945</span></p>
              <p className="text-gray-600 mb-2">อีเมล: <span className="font-semibold">Thitimaboontai@gmail.com</span></p>
              <p className="text-gray-600 mb-6">ที่อยู่: <span className="font-semibold">116/1 เมือง สกลนคร 47000</span></p>

              <div className="flex justify-center space-x-6">
                <a href="https://line.me/R/ti/p/@632fmncd" className="text-green-500 hover:text-green-700">
                  <FaLine className="w-10 h-10" />
                </a>
                <a href="https://www.facebook.com/share/18yiJSvUtP/?mibextid=wwXIfr" className="text-blue-600 hover:text-blue-800">
                  <FaFacebookSquare className="w-10 h-10" />
                </a>
                <a href="https://www.instagram.com/nangkram_?igsh=anhsY3R3YTd0dmJj" className="bg-gradient-to-bl from-pink-500 via-purple-500 to-orange-500 p-2 rounded-lg hover:scale-105 transition transform">
                  <FaInstagram className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
