// Films.js
import React, { useState } from "react";
import DataTable from "../components/feature_filmSearch/Datatable";
import FilmSearchbar from "../components/feature_filmSearch/Searchbar";

const Films = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-white flex flex-col gap-12">
      <FilmSearchbar onSearch={handleSearch} />
      <DataTable searchData={searchResults} />
    </div>
  );
};

export default Films;
