import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";

import { BASE_URL } from "../../utilities/constants";

const customerColumns = [
  { field: "customer_id", headerName: "Cust. ID", width: 80 },
  { field: "first_name", headerName: "First Name", width: 200 },
  { field: "last_name", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
];

const rentalHistoryColumns = [
  { field: "rental_id", headerName: "Rental ID", width: 80 },
  { field: "title", headerName: "Movie Title", width: 250 },
  { field: "inventory_id", headerName: "Inv. ID", width: 250 },
  { field: "rental_date", headerName: "Rental Date", width: 300 },
  { field: "return_date", headerName: "Return Date", width: 300 },
];

const Customer_Datatable = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async (setCustomers) => {
    try {
      const response = await fetch(`${BASE_URL}/customers`);
      const data = await response.json();
      // Add a unique 'id' property to each row based on 'customer_id'
      const customersWithId = data.map((customer) => ({
        ...customer,
        id: customer.customer_id,
      }));
      setCustomers(customersWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(setCustomers);
  }, []);

  const handleCustomerCellClick = (params) => {
    console.log(params.row);
    setSelectedRow(params.row);
    setOpenModal(true);
  };

  return (
    <div style={{ height: 800, width: "83%", margin: "auto" }}>
      <DataGrid
        rows={customers}
        columns={customerColumns}
        pageSize={10}
        onCellClick={handleCustomerCellClick}
      />
      <Modal
        dismissible
        show={openModal}
        size={"7xl"}
        onClose={() => {
          setOpenModal(false);
          setErrorMessage("");
          setSuccessMessage("");
          setCustomerId("");
        }}
      >
        <Modal.Header>
          <header>Customer Details and History</header>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            {/* Display Customer Details */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <strong>Customer First Name:</strong> {selectedRow?.first_name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <strong>Customer Last Name:</strong> {selectedRow?.last_name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <strong>Email:</strong> {selectedRow?.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <strong>Member Since:</strong> {selectedRow?.registration_date}
            </p>
            <div className="h-96">
              {/* Data Grid */}
              <DataGrid
                rows={customers}
                columns={customerColumns}
                pageSize={50}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex max-w-md flex-col gap-2">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="rentalId"
                  color={
                    errorMessage ? "failure" : successMessage ? "success" : ""
                  }
                  value="Enter Rental ID"
                />
              </div>
              <TextInput
                type="text"
                color={
                  errorMessage ? "failure" : successMessage ? "success" : ""
                }
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
          <Button color="warning" onClick={console.log(`click`)}>
            Return Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customer_Datatable;
