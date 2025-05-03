import { useEffect, useState } from "react";
import useShopStore from "../store/shop-store";
import { IoClose } from "react-icons/io5";
import product from "../assets/images/product.png";
import { readProduct } from "../api/product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
  const getProduct = useShopStore((state) => state.getProduct);
  const products = useShopStore((state) => state.products);
  const getCategory = useShopStore((state) => state.getCategory);
  const categories = useShopStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    getProduct(categoryId);
  };

  const handleProductClick = async (productId) => {
    try {
      const res = await readProduct(productId);
      setProductDetail(res.data);
      setSelectedProduct(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setProductDetail(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0
  };

  return (
    <div className="bg-white/20 mt-20">
      <img className="w-full h-auto object-cover " src={product} alt="" />

      <div className="container mx-auto p-4 bg-white shadow-md flex flex-col md:flex-row gap-4">
        <aside className=" w-full md:w-1/4 p-4 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4">สินค้า</h2>
          <button
            className={`bg-white px-4 py-2 rounded-md shadow hover:bg-gray-100 mb-2 ${selectedCategory === null ? 'bg-gray-300' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            สินค้าทั้งหมด
          </button>
          <div className="w-full">
            {categories.length > 0 ? (
              categories.map((item, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 mt-1 rounded-md shadow hover:bg-amber-100 ${selectedCategory === item.category_id ? 'bg-amber-300' : 'bg-amber-50'}`}
                  onClick={() => handleCategoryClick(item.category_id)}
                >
                  {item.category_name}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-600">ไม่มีข้อมูล</p>
            )}
          </div>
        </aside>

        <main className="w-full p-4 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 cursor-pointer" onClick={() => handleProductClick(item.product_id)}>
                <div className="w-full h-70 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  {item.images.length > 0 ? (
                    <img className="w-full h-full object-cover" src={item.images[0].url} alt={item.product_name} />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-lg">{item.product_name}</h3>
                  <p className="text-gray-600">ราคาเริ่มต้น: {item.startingPrice} บาท</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">ไม่มีข้อมูล</p>
          )}
        </main>
      </div>

      {selectedProduct && productDetail && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center relative">
            <button className="absolute top-2 right-2 text-xl font-bold" onClick={closePopup}><IoClose size={40} /></button>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{productDetail.product_name || "ไม่มีชื่อสินค้า"}</h2>
            {productDetail.images.length > 1 ? (
              <Slider key={productDetail.images.length} className="rounded-lg overflow-hidden" {...sliderSettings}>
                {productDetail.images.map((image, index) => (
                  <div key={index}>
                    <img className="w-full h-120 object-cover rounded-lg" src={image.url} alt={`Product ${index}`} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="w-full h-120 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                {productDetail.images.length === 1 ? (
                  <img className="w-full h-120 object-cover rounded-lg" src={productDetail.images[0].url} alt="Product" />
                ) : (
                  "No Image"
                )}
              </div>
            )}

            <p className="text-gray-600 mt-6 text-lg">{productDetail.description || "ไม่มีรายละเอียดสินค้า"}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-4">ราคาเริ่มต้น {productDetail.startingPrice || "N/A"} บาท</p>
            <a href="https://www.facebook.com/people/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%AE%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A1-%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B8%99%E0%B8%84%E0%B8%A3-Nangkram/61562558720273/" className="mt-8 inline-block bg-blue-500 text-white text-lg py-4 px-8 rounded-lg shadow-md hover:bg-blue-600 transition">สนใจสินค้า</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
