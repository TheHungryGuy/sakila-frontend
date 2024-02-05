import React from "react";
import ActorCard from "./ActorCard";

const ActorList = () => {
  const actors = [
    { actorName: "Actor 1", MovieCount: 20 },
    { actorName: "Actor 2", MovieCount: 15 },
    { actorName: "Actor 3", MovieCount: 10 },
    { actorName: "Actor 4", MovieCount: 8 },
    { actorName: "Super Long Actor 5", MovieCount: 5 },
    // Test Actor List
  ];

  return (
    <div className="w-full py-[10rem] px-4 bg-[#000300] flex flex-col gap-24">
      <div className="order-first">
        <header className="text-center font-bold text-6xl text-white ">
          Top 5 Actors
        </header>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-5 gap-8">
        {actors.map((Actor, index) => (
          <ActorCard
            key={index}
            actorName={Actor.actorName}
            movieCount={Actor.MovieCount}
            onSeeMoreClick={() =>
              console.log(`See more details for ${Actor.actorName}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ActorList;
