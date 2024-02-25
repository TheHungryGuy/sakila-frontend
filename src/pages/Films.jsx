// Films.js
import React from "react";
import DataTable from "../components/feature_filmSearch/Datatable";
import FilmSearchbar from "../components/feature_filmSearch/Searchbar";

const Films = () => {
  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-white flex flex-col gap-12">
      <FilmSearchbar />
      <DataTable />
    </div>
  );
};

export default Films;
