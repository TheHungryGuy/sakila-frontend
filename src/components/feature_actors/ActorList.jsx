import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import ActorCard from "./ActorCard";

const ActorList = () => {
  // const actors = [
  //   { actorName: "Actor 1", movieCount: 20 },
  //   { actorName: "Actor 2", movieCount: 15 },
  //   { actorName: "Actor 3", movieCount: 10 },
  //   { actorName: "Actor 4", movieCount: 8 },
  //   { actorName: "Super Long Actor 5", movieCount: 5 },
  //   // Test Actor List
  // ];

  const [actors, setActors] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedActor, setSelectedActor] = useState({
    full_name: "",
    film_count: 0,
  });

  useEffect(() => {
    // Fetch actors data from Flask backend when the component mounts
    fetch("http://127.0.0.1:5000/top_actors")
      .then((response) => response.json())
      .then((data) => setActors(data.top_actors))
      .catch((error) => console.error("Error fetching actor data", error));
  }, []);

  const handleSeeMoreClick = (actor) => {
    setSelectedActor(actor);

    // Fetch top movies for the selected actor
    fetch(`http://localhost:5000/top_movies_for_actor/${actor.actor_id}`)
      .then((response) => response.json())
      .then((data) => {
        setTopMovies(data.top_movies);
        setOpenModal(true);
      })
      .catch((error) => console.error("Error fetching top movies data", error));
  };

  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-[#000300] flex flex-col gap-24">
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedActor.full_name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Top Films
            </p>
            {topMovies.map((movie, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                {movie.title} - Rentals: {movie.rental_count}
              </p>
            ))}
            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {selectedActor.film_count}
            </p> */}
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
            actorName={actor.full_name}
            movieCount={actor.film_count}
            onSeeMoreClick={() => {
              console.log(`See more details for ${actor.full_name}`, actor);
              handleSeeMoreClick(actor);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ActorList;
