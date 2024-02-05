import React from "react";
import Navbar from "../components/common/Navbar";
import MovieList from "../components/feature_movies/MovieList";
import ActorList from "../components/feature_actors/ActorList";

const home = () => {
  return (
    <div>
      <Navbar />
      <MovieList />
      <ActorList />
    </div>
  );
};

export default home;
