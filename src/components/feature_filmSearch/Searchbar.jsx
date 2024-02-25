// FilmSearchbar.js
import React from "react";
import Dropdown from "../common/Dropdown";

function FilmSearchbar() {
  const handleSearch = (category) => {
    switch (category) {
      case "Movies":
        console.log("Searching for movies...");
        break;
      case "Actors":
        console.log("Searching for actors...");
        break;
      case "Customers":
        console.log("Searching for customers...");
        break;
      default:
        console.log("Invalid category");
    }
  };

  return (
    <div>
      <Dropdown
        categories={["Movies", "Actors", "Customers"]}
        placeholder="Search by category..."
        onSearch={handleSearch}
      />
    </div>
  );
}

export default FilmSearchbar;
