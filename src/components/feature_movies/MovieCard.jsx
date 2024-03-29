import React from "react";
import { MdLocalMovies } from "react-icons/md";

const MovieCard = ({ title, rentalCount, onSeeMoreClick }) => {
  return (
    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
      <MdLocalMovies
        size={80}
        className="w-20 mx-auto mt-[-3rem] bg-yellow-400"
      />
      <h2 className="text-2xl font-bold text-center py-6">{title}</h2>
      <p className="text-center font-medium py-2 border-b mx-8">
        Rental Count: {rentalCount}
      </p>
      <button
        onClick={onSeeMoreClick}
        className="bg-[#000300] text-yellow-400 lg:w-[150px] rounded-md font-medium my-6 mx-auto px-6 py-3"
      >
        See More
      </button>
    </div>
  );
};

export default MovieCard;
