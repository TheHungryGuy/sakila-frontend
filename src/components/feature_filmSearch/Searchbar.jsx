// Searchbar.jsx
import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import { BASE_URL } from "../../utilities/constants";

function FilmSearchbar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const fetchFilmsByGenre = (genre) => {
    fetch(`${BASE_URL}/films_by_genre?genre_name=${encodeURIComponent(genre)}`)
      .then((response) => response.json())
      .then((data) => {
        const filmsWithId = data.films.map((film) => ({
          ...film,
          id: film.film_id,
        }));
        onSearch(filmsWithId); // Update parent component with search results
        console.log(searchText);
      })
      .catch((error) => console.error("Error fetching films by genre:", error));
  };

  const fetchFilmsByActor = (actorName) => {
    fetch(
      `${BASE_URL}/films_by_actor?actor_name=${encodeURIComponent(actorName)}`
    )
      .then((response) => response.json())
      .then((data) => {
        const filmsWithId = data.films.map((film) => ({
          ...film,
          id: film.film_id,
        }));
        onSearch(filmsWithId); // Update parent component with search results
        console.log(searchText);
      })
      .catch((error) => console.error("Error fetching films by actor:", error));
  };

  const fetchFilmsByTitle = (title) => {
    fetch(`${BASE_URL}/films_by_title?title=${encodeURIComponent(title)}`)
      .then((response) => response.json())
      .then((data) => {
        const filmsWithId = data.films.map((film) => ({
          ...film,
          id: film.film_id,
        }));
        onSearch(filmsWithId); // Update parent component with search results
        console.log(searchText);
      })
      .catch((error) => console.error("Error fetching films by title:", error));
  };

  const handleSearch = async (category) => {
    switch (category) {
      case "Genres":
        fetchFilmsByGenre(searchText);
        break;
      case "Actors":
        fetchFilmsByActor(searchText);
        break;
      case "Title":
        fetchFilmsByTitle(searchText);
        break;
      default:
        console.log("Invalid category");
    }
  };

  return (
    <div className="lg:flex lg:justify-between max-w-[1240px] lg:items-center mx-auto px-4">
      <header className="text-center font-bold lg:text-left lg:p-4 lg:px-8 text-6xl">
        Search Films
      </header>
      <Dropdown
        categories={["Title", "Actors", "Genres"]}
        placeholder="Search by category..."
        buttonText="Search"
        onSearch={handleSearch}
        onInputChange={(text) => setSearchText(text)}
        className="lg:p-4"
      />
    </div>
  );
}

export default FilmSearchbar;
