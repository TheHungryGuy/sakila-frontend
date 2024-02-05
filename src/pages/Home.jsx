import React from "react";
import Navbar from "../components/common/Navbar";
import MovieList from "../components/feature_movies/MovieList";

const home = () => {
  return (
    <div>
      <Navbar />
      <MovieList />
    </div>
  );
};

export default home;
