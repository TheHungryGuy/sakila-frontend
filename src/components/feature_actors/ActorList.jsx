import React from "react";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import ActorCard from "./ActorCard";

const ActorList = () => {
  const actors = [
    { actorName: "Actor 1", movieCount: 20 },
    { actorName: "Actor 2", movieCount: 15 },
    { actorName: "Actor 3", movieCount: 10 },
    { actorName: "Actor 4", movieCount: 8 },
    { actorName: "Super Long Actor 5", movieCount: 5 },
    // Test Actor List
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedActor, setSelectedActor] = useState({
    actorName: "",
    movieCount: 0,
  });

  const handleSeeMoreClick = (actor) => {
    setSelectedActor(actor);
    setOpenModal(true);
  };

  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-[#000300] flex flex-col gap-24">
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedActor.actorName}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Top Films
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {selectedActor.movieCount}
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
        <header className="text-center font-bold text-6xl text-white ">
          Top 5 Actors
        </header>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-5 gap-8">
        {actors.map((actor, index) => (
          <ActorCard
            key={index}
            actorName={actor.actorName}
            movieCount={actor.movieCount}
            onSeeMoreClick={() => {
              console.log(`See more details for ${actor.actorName}`);
              handleSeeMoreClick(actor);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ActorList;
