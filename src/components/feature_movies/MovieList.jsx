import React from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const movies = [
    { title: "Movie 1", rentalCount: 20 },
    { title: "Movie 2", rentalCount: 15 },
    { title: "Movie 3", rentalCount: 10 },
    { title: "Movie 4", rentalCount: 8 },
    { title: "Super Long Movie 5", rentalCount: 5 },
    // Test Movies list
  ];

  return (
    <div className="w-full py-[10rem] px-4 bg-white flex flex-col gap-24">
      <div className="order-first">
        <header className="text-center font-bold text-6xl ">
          Top 5 Movies
        </header>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-5 gap-8">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            rentalCount={movie.rentalCount}
            onSeeMoreClick={() =>
              console.log(`See more details for ${movie.title}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
