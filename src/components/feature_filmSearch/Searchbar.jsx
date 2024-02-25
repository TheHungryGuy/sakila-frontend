// FilmSearchbar.js
import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";

function FilmSearchbar() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms();
  }, []);
  const fetchFilms = () => {
    fetch("http://127.0.0.1:5000/all_films")
      .then((response) => response.json())
      .then((data) => {
        const filmsWithId = data.films.map((film) => ({
          ...film,
          id: film.film_id,
        }));
        setFilms(filmsWithId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const handleSearch = (category) => {
    switch (category) {
      case "Movies":
        console.log("Searching for movies...");

        break;
      case "Actors":
        console.log("Searching for actors...");
        break;
      case "Genres":
        console.log("Searching for customers...");
        break;
      default:
        console.log("Invalid category");
    }
  };

  return (
    <div>
      <Dropdown
        categories={["Movies", "Actors", "Genres"]}
        placeholder="Search by category..."
        onSearch={handleSearch}
      />
    </div>
  );
}

export default FilmSearchbar;
