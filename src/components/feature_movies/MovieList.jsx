import React from "react";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { Button, Modal } from "flowbite-react";

const MovieList = () => {
  const movies = [
    { title: "Movie 1", rentalCount: 20 },
    { title: "Movie 2", rentalCount: 15 },
    { title: "Movie 3", rentalCount: 10 },
    { title: "Movie 4", rentalCount: 8 },
    { title: "Super Long Movie 5", rentalCount: 5 },
    // Test Movies list
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({
    title: "",
    rentalCount: 0,
  });

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
              Description: ipsum Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Omnis accusamus ad, qui ipsam nesciunt nam
              minima modi voluptates debitis quam, iste fugit sed eligendi
              laboriosam, voluptate perferendis accusantium quia soluta. Year
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release: 20XX
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rating: PG-13
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Special Features: Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Ipsam quos voluptates quod quas dicta omnis
              eligendi sit commodi non quisquam nisi, harum inventore cumque
              ipsum architecto tempora nihil. Officia, explicabo.
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
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            rentalCount={movie.rentalCount}
            onSeeMoreClick={() => {
              console.log(`See more details for ${movie.title}`);
              handleSeeMoreClick(movie);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
