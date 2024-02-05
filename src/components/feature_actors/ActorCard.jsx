import React from "react";
import { MdPerson } from "react-icons/md";

const ActorCard = ({ actorName, movieCount, onSeeMoreClick }) => {
  return (
    <div className="w-full shadow-xl shadow-amber-400 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
      <MdPerson size={80} className="w-20 mx-auto mt-[-3rem] bg-yellow-400" />
      <h2 className="text-2xl font-bold text-center py-6 text-white">
        {actorName}
      </h2>
      <p className="text-center font-medium py-2 border-b mx-8 text-white">
        Movie Count: {movieCount}
      </p>
      <button
        onClick={onSeeMoreClick}
        className="bg-yellow-400 lg:w-[150px] rounded-md font-medium my-6 mx-auto px-6 py-3"
      >
        See More
      </button>
    </div>
  );
};

export default ActorCard;
