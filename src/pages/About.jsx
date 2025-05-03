import at from "../assets/images/about.png"
import at2 from "../assets/images/about2.png"
import at3 from "../assets/images/about3.png"
import Gay from "../assets/images/image.png"

const About = () => {
  return (
    <div className="justify-items-center text-white space-y-2 2xl:space-y-5 lg:space-y-3 pb-20 bg-gradient-to-b from-white to-blue-900 mx-20">
      <img
        className="2xl:mx-10 size-8/12 mt-20"
        src={at} alt="" />
      <div className="text-black 2xl:justify-center mx-10 xl:mx-20  2xl:text-3xl xl:text-3xl text-2xl">
        <span className="font-bold 2xl:ml-20 xl:ml-15 ml-10">"เฮือนนางคราม"</span>
        <span>
          เป็นแหล่งผ้าย้อมคราม OTOP 5 ดาว ภายใต้ชื่อแบรนด์ "นางคราม"
          ของคุณฐิติมา บุญต่าย เป็นทั้งศูนย์เรียนรู้การมัดย้อมผ้าครามในครัวเรือนและเป็นผู้ประกอบการรายย่อย
          ที่มีหัวใจอนุรักษ์ธรรมชาติและสิ่งแวดล้อม มีการสนับสนุนภูมิปัญญาท้องถิ่นด้วยการรับซื้อวัตถุดิบ “ผ้าฝ้ายทอมือ” และ “ย้อมสีครามธรรมชาติ” ปราศจากการใช้สารเคมีเจือปนในทุกขั้นตอน มาแปรรูปเป็นผลิตภัณฑ์พื้นบ้าน ดีไซน์สวยทันสมัย
        </span>
        <br />
        <span className="2xl:ml-20 xl:ml-15 ml-10">เฮือนนางครามก่อตั้งขึ้นโดยกลุ่มทอผ้าย้อมครามในชุมชนเพื่อเป็นศูนย์กลางในการอนุรักษ์ และสืบสานภูมิปัญญาการย้อมผ้าครามแบบดั้งเดิม</span>
        <ul className="list-disc">
          <li>ตั้งอยู่ในอำเภอเมืองสกลนคร เป็นสถานที่ที่รวบรวมองค์ความรู้เกี่ยวกับผ้าครามแบบครบวงจร</li>
          <li>ได้รับการสนับสนุนให้เป็นแหล่งท่องเที่ยวเชิงวัฒนธรรมที่สำคัญของจังหวัดสกลนคร</li>
        </ul>
      </div>
      <div className="mx-10 rounded-2xl">
        <img src={at2} />
      </div>
      <div className="flex justify-center ">
        <img 
        className="mx-50 size-2/4"
        src={at3} />
      </div>
      <div className="mx-10 text-2xl md:mx-20 2xl:text-3xl">
        <h1 className="text-center">"เฮือนนางคราม"</h1>
        <p>เป็นศูนย์สาธิตกระบวนการผลิตผ้าครามตั้งแต่การปลูกต้นคราม การสกัดสีคราม การย้อม ไปจนถึงการทอผ้า</p>
        <ul className="list-disc">
          <li>มีการจัดแสดงผลิตภัณฑ์ผ้าครามและสินค้าหัตถกรรมพื้นบ้านเพื่อจำหน่าย</li>
          <li>เปิดให้นักท่องเที่ยวได้ทดลองย้อมผ้าครามด้วยตนเอง เป็นการสร้างประสบการณ์การเรียนรู้แบบมีส่วนร่วม</li>
          <li>มีการจัดกิจกรรมอบรมและถ่ายทอดความรู้เกี่ยวกับการย้อมครามให้กับผู้ที่สนใจ</li>
        </ul>
      </div>
      {/* <div className="justify-center mt-10">
        <h1 className="text-2xl">รูปภาพกิจกรรม</h1>
        <img 
        className="size-3/4"
        src={Gay} alt="" />
      </div> */}
      <h1 className="text-2xl">หากสนใจ สามารถโทรสอบถาม/จองล่วงหน้าได้ที่ : 081 871 2945</h1>
    </div>
  )
}
export default About