import React from "react";

const Navbar = () => {
  // const [nav, setNav] = useState(true);
  // const handleNav = () => {
  //   setNav(!nav);
  // };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-yellow-400">
        {" "}
        <a href="/">SAKILA.</a>
      </h1>
      <ul className="flex ">
        <li className="p-4">
          <a href="/">Home</a>
        </li>
        <li className="p-4">
          <a href="/films">Films</a>
        </li>
        <li className="p-4">
          <a href="/customer">Customer</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
