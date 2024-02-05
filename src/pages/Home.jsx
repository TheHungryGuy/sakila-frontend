import React from "react";
import MovieList from "../components/feature_movies/MovieList";
import ActorList from "../components/feature_actors/ActorList";

const home = () => {
  return (
    <div>
      <MovieList />
      <ActorList />
    </div>
  );
};

export default home;
