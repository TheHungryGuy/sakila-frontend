import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";

const columns = [
  { field: "film_id", headerName: "ID", type: "number", width: 70 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "description", headerName: "Description", width: 400 },
  { field: "rating", headerName: "Rating", width: 70 },
  { field: "special_features", headerName: "Special Features", width: 200 },
  { field: "release_year", headerName: "Release Year", width: 120 },
];
//test data
// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const DataTable = () => {
  const [films, setFilms] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/all_films")
      .then((response) => response.json())
      .then((data) => {
        // Add a unique 'id' property to each row based on 'film_id'
        const filmsWithId = data.films.map((film) => ({
          ...film,
          id: film.film_id,
        }));
        setFilms(filmsWithId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCellClick = (params) => {
    // if (params.field === "title") {
    console.log("Selected Row:", params.row);
    setSelectedRow(params.row);
    setOpenModal(true);
    // }
  };

  return (
    <div className="" style={{ height: 800, width: "83%", margin: "auto" }}>
      <DataGrid
        rows={films}
        columns={columns}
        pageSize={100}
        onCellClick={handleCellClick}
      />

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedRow?.title}</Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release Year: {selectedRow?.release_year}
            </p> */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Description: {selectedRow?.description}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release: {selectedRow?.release_year}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rating: {selectedRow?.rating}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Special Features: {selectedRow?.special_features}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="username3"
                  color="success"
                  value="Customer Id"
                />
              </div>
              <TextInput
                id="username"
                placeholder="e.g 0123456789"
                required
                color="success"
                helperText={
                  <>
                    <span className="font-medium">Alright!</span> Movie
                    Succesfully Rented!
                  </>
                }
              />
            </div>
          </div>
          <Button color="warning" onClick={() => setOpenModal(false)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
