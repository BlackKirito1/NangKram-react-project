import { useEffect, useState } from "react";
import useShopStore from "../store/shop-store";
import main from "../assets/images/main.png";
import main2 from "../assets/images/main2.jpg";
import Slider from "react-slick";
import { AiOutlineClose } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Home = () => {
  const getContent = useShopStore((state) => state.getContent);
  const contents = useShopStore((state) => state.contents);

  useEffect(() => {
    getContent();
  }, [getContent]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const openModal = (imgUrl) => {
    setCurrentImg(imgUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImg("");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen md:mt-20 mt-1">
      <div className="bg-white/20 pb-10">
        <img className="w-full h-auto object-cover" src={main} alt="" />

        <div className="container mx-auto mt-10 px-4 md:px-10">
          {/* ประชาสัมพันธ์ */}
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 [text-shadow:2px_2px_6px_rgba(0,0,0,0.7)]">
              ประชาสัมพันธ์/ข่าวสาร
            </h2>
            <div className="bg-white w-full md:w-2/3 lg:w-1/3 mx-auto shadow-2xl p-6 rounded-2xl">
              {contents.length > 0 ? (
                <Slider {...sliderSettings}>
                  {contents.map((item, index) => (
                    <div key={index} className="px-2">
                      <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden w-full mx-auto flex flex-col items-center">
                        <div className="w-full h-60 md:h-[500px] flex items-center justify-center bg-gray-200">
                          {item.images.length > 0 ? (
                            <img
                              className="h-full max-h-full w-auto object-cover cursor-pointer"
                              src={item.images[0].url}
                              alt="Content"
                              onClick={() => openModal(item.images[0].url)}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="text-center text-gray-500 w-full">ไม่มีข้อมูล</div>
              )}
            </div>
          </section>

          {/* ความเป็นมา */}
          <section className="mt-10">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-4 [text-shadow:2px_2px_6px_rgba(0,0,0,0.7)]">
              ความเป็นมา
            </h2>
            <div className="bg-white/90 shadow-md p-6 flex flex-col overflow-hidden">
              <img className="w-full h-60 md:h-[500px] object-cover object-bottom" src={main2} alt="" />
              <p className="text-lg md:text-2xl text-gray-800 leading-relaxed my-5 px-4 md:px-10">
                <span className="font-bold">"เฮือนนางคราม"</span> เป็นแหล่งผ้าย้อมคราม OTOP 5 ดาว
                ภายใต้ชื่อแบรนด์ <span >"นางคราม"</span> ของคุณฐิติมา บุญต่าย
                เป็นทั้งศูนย์เรียนรู้การมัดย้อมผ้าครามในครัวเรือนและเป็นผู้ประกอบการรายย่อย
                ที่มีหัวใจอนุรักษ์ธรรมชาติและสิ่งแวดล้อม มีการสนับสนุนภูมิปัญญาท้องถิ่น
                ด้วยการรับซื้อวัตถุดิบ <span >“ผ้าฝ้ายทอมือ”</span> และ
                <span > “ย้อมสีครามธรรมชาติ”</span> ปราศจากการใช้สารเคมีเจือปนในทุกขั้นตอน
                มาแปรรูปเป็นผลิตภัณฑ์พื้นบ้าน ดีไซน์สวยทันสมัย
              </p>
              <div className="flex justify-center mt-10">
                <button className="bg-[#394D72] text-white text-lg md:text-xl rounded-md py-3 px-6 md:py-4 md:px-10 hover:text-gray-600 hover:bg-sky-400">
                  <Link to={"/about"}>อ่านเพิ่มเติม</Link>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-transparent"
        onClick={closeModal}
      >
        <div
          className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            onClick={closeModal}
          >
            <AiOutlineClose size={40} />
          </button>
    
          <img
            src={currentImg}
            alt="Full"
            className="max-w-full max-h-[80vh] object-contain mx-auto"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
