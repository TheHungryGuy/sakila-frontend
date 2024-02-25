import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Button, Modal } from "flowbite-react";
import { BASE_URL } from "../../utilities/constants";
const MovieList = () => {
  // const movies = [
  //   { title: "Movie 1", rentalCount: 20 },
  //   { title: "Movie 2", rentalCount: 15 },
  //   { title: "Movie 3", rentalCount: 10 },
  //   { title: "Movie 4", rentalCount: 8 },
  //   { title: "Super Long Movie 5", rentalCount: 5 },
  //   // Test Movies list
  // ];

  const [topMovies, setTopMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({
    title: "",
    description: "",
    releaseYear: "",
    rating: "",
    specialFeatures: "",
    rentalCount: 0,
  });

  useEffect(() => {
    // Fetch top 5 most rented movies from Flask backend
    fetch(`${BASE_URL}/top_rented_movies`)
      .then((response) => response.json())
      .then((data) => setTopMovies(data.top_movies))
      .catch((error) => console.error("Error fetching top movies:", error));
  }, []);

  const handleSeeMoreClick = (movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-white flex flex-col gap-24">
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedMovie.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rental Count: {selectedMovie.rentalCount}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Description: {selectedMovie.description}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release: {selectedMovie.releaseYear}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rating: {selectedMovie.rating}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Special Features: {selectedMovie.specialFeatures}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="warning" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="order-first">
        <header className="text-center font-bold text-6xl ">
          Top 5 Movies
        </header>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-5 gap-8">
        {topMovies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            rentalCount={movie.rentalCount}
            onSeeMoreClick={() => {
              console.log(`See more details for ${movie.title}:`, movie);
              handleSeeMoreClick(movie);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
