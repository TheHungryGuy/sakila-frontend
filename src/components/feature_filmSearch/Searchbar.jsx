// Searchbar.jsx
import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import { BASE_URL } from "../../utilities/constants";

function FilmSearchbar({ onSearch }) {
  const [films, setFilms] = useState([]);
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
    <div>
      <Dropdown
        categories={["Genres", "Actors", "Title"]}
        placeholder="Search by category..."
        buttonText="Search"
        onSearch={handleSearch}
        onInputChange={(text) => setSearchText(text)}
      />
    </div>
  );
}

export default FilmSearchbar;
