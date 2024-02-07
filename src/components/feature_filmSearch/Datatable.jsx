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
  const [movieInfo, setMovieInfo] = useState({});
  const [remainingInventory, setRemainingInventory] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedInventoryId, setSelectedInventoryId] = useState(null); // Track the selected inventory ID

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
    const filmId = params.row.film_id;

    // Fetch movie info
    fetch(`http://127.0.0.1:5000/movie_info?movie_id=${filmId}`)
      .then((response) => response.json())
      .then((movieData) => {
        setMovieInfo(movieData);

        // Fetch remaining inventory
        fetch(`http://127.0.0.1:5000/remaining_inventory/${filmId}`)
          .then((response) => response.json())
          .then((inventoryData) => {
            setRemainingInventory(inventoryData);

            // Find the lowest inventory ID
            const lowestInventoryId = Math.min(
              ...inventoryData.map((inventory) => inventory.inventory_id)
            );
            setSelectedInventoryId(lowestInventoryId);

            setSelectedRow(params.row);
            setOpenModal(true);
          })
          .catch((error) =>
            console.error("Error fetching remaining inventory:", error)
          );
      })
      .catch((error) => console.error("Error fetching movie info:", error));
  };

  const handleRentMovie = () => {
    console.log("Selected Row:", movieInfo);
    // Check if the number of copies is greater than 0
    if (movieInfo.number_of_copies <= 0) {
      setErrorMessage("No copies available for rent.");
      return;
    }

    // Check if the customer ID exists in the database
    fetch(`http://127.0.0.1:5000/check_customer/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.customer_exists) {
          setErrorMessage("Customer does not exist.");
          return;
        }

        // If all checks pass, rent out the movie using the selected inventory ID
        fetch(
          `http://127.0.0.1:5000/rent_movie/${selectedInventoryId}/${customerId}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message); // Success message
            if (data.message) {
              setErrorMessage(""); // Clear error message
              setSuccessMessage(data.message); // Set success message
              setCustomerId(""); // Clear customer ID field
            }
          })
          .catch((error) => {
            console.error("Error renting movie:", error);
            setSuccessMessage(""); // Clear success message
            setErrorMessage("Error renting movie. Please try again."); // Set error message
          });
      })
      .catch((error) => {
        console.error("Error checking customer:", error);
        setSuccessMessage(""); // Clear success message
        setErrorMessage("Error checking customer. Please try again."); // Set error message
      });
  };

  return (
    <div className="" style={{ height: 800, width: "83%", margin: "auto" }}>
      <DataGrid
        rows={films}
        columns={columns}
        pageSize={100}
        onCellClick={handleCellClick}
      />

      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setErrorMessage("");
          setSuccessMessage("");
        }}
      >
        <Modal.Header>{selectedRow?.title}</Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Description: {selectedRow?.description}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release Year: {selectedRow?.release_year}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rating: {selectedRow?.rating}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Special Features: {selectedRow?.special_features}
            </p>
            {/* Display movie info */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Number of Copies: {movieInfo?.number_of_copies}
            </p>
            {/* Display remaining inventory */}
            {remainingInventory?.length > 0 && (
              <div>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Available Inventory ID's:{" "}
                  {remainingInventory
                    .map((inventory) => inventory.inventory_id)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex max-w-md flex-col gap-2">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="customerID"
                  // color="success"
                  value="Enter Customer ID"
                />
              </div>
              <TextInput
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                helperText={
                  errorMessage
                    ? errorMessage
                    : successMessage
                    ? successMessage
                    : " ㅤ"
                } //change this when success or error
              />
            </div>
          </div>
          <Button color="warning" onClick={handleRentMovie}>
            Rent Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
