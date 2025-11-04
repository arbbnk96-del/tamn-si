import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  if (
    window.location.pathname === "/verfiy" ||
    window.location.pathname === "/navaz"
  )
    return <div></div>;
  return (
    <div
      className={`w-full  flex justify-center px-4 py-1 items-center  `}
    >
      <img
        src="/logo.png"
        alt="logo"
        onClick={() => (window.location.href = "/")}
        className=" w-5/6 -mr-6"
      />
    </div>
  );
};

export default Navbar;
