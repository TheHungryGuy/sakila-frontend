import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";

const columns = [
  { field: "film_id", headerName: "ID", type: "number", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "rating", headerName: "Rating", width: 200 },
  { field: "special_features", headerName: "special_features", width: 200 },
  {
    field: "release_year",
    headerName: "Release Year",
    type: "number",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCellClick = (params) => {
    // You can customize this condition based on your needs
    if (params.field === "fullName") {
      console.log("Selected Row:", params.row);
      setSelectedRow(params.row);
      setOpenModal(true);
    }
  };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onCellClick={handleCellClick}
      />

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {selectedRow?.firstName} {selectedRow?.lastName}
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {/* Rental Count: {selectedMovie.rentalCount} */}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Description: ipsum Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Omnis accusamus ad, qui ipsam nesciunt nam
              minima modi voluptates debitis quam, iste fugit sed eligendi
              laboriosam, voluptate perferendis accusantium quia soluta. Year
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Release: 20XX
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Rating: PG-13
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Special Features: Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Ipsam quos voluptates quod quas dicta omnis
              eligendi sit commodi non quisquam nisi, harum inventore cumque
              ipsum architecto tempora nihil. Officia, explicabo.
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
