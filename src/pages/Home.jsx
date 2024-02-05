import React from "react";
import Navbar from "../components/common/Navbar";
import MovieList from "../components/MovieList";

const home = () => {
  return (
    <div>
      <Navbar />
      <MovieList />
    </div>
  );
};

export default home;
