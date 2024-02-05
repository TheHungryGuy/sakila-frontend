import React from "react";

const Navbar = () => {
  // const [nav, setNav] = useState(true);
  // const handleNav = () => {
  //   setNav(!nav);
  // };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-yellow-400">SAKILA.</h1>
      <ul className="flex ">
        <li className="p-4">Home</li>
        <li className="p-4">Films</li>
        <li className="p-4">Customer</li>
      </ul>
    </div>
  );
};

export default Navbar;
