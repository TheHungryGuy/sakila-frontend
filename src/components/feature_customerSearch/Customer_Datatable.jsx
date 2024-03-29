import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { BASE_URL } from "../../utilities/constants";

const customerColumns = [
  { field: "customer_id", headerName: "Cust. ID", width: 120 },
  { field: "first_name", headerName: "First Name", width: 200 },
  { field: "last_name", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
];

const rentalHistoryColumns = [
  { field: "rental_id", headerName: "Rental ID", width: 80 },
  { field: "title", headerName: "Movie Title", width: 200 },
  { field: "inventory_id", headerName: "Inv. ID", width: 80 },
  { field: "rental_date", headerName: "Rental Date", width: 300 },
  { field: "return_date", headerName: "Return Date", width: 300 },
];

const CustomerDatatable = ({ customersData }) => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [rentalId, setRentalId] = useState("");
  const [rentalHistory, setRentalHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    fetchCustomerData(setCustomers);
  }, []);

  // Update films state when search data changes
  useEffect(() => {
    setCustomers(customersData);
  }, [customersData]);

  const fetchCustomerData = async (setRentalHistory) => {
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

  const fetchCustomerRentals = async (customerId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/customer_rentals/${customerId}`
      );
      const data = await response.json();
      return data.rentals; // Return the fetched rental history
    } catch (error) {
      console.error("Error fetching customer rentals:", error);
      return []; // Return an empty array in case of error
    }
  };

  const handleCustomerCellClick = async (params) => {
    console.log(params.row);
    setSelectedRow(params.row);
    setOpenCustomerModal(true);
    setCustomerId(params.row.customer_id);
    const rentalHistory = await fetchCustomerRentals(params.row.customer_id);
    // Add a unique id property to each row based on rental_id
    const rentalHistoryWithId = rentalHistory.map((rental) => ({
      ...rental,
      id: rental.rental_id,
    }));
    setRentalHistory(rentalHistoryWithId);
  };

  const handleReturnMovie = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/update_return_date/${rentalId}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update return date");
      }
      setSuccessMessage("Return date updated successfully");
      setErrorMessage("");
      // Fetch the latest rental data
      const updatedRentalHistory = await fetchCustomerRentals(customerId);
      // Update the state with the new data
      // Add a unique id property to each row based on rental_id
      const rentalHistoryWithId = updatedRentalHistory.map((rental) => ({
        ...rental,
        id: rental.rental_id,
      }));
      setRentalHistory(rentalHistoryWithId);
    } catch (error) {
      console.error("Error updating return date:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/delete_customer/${customerId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete customer");
      }
      setSuccessMessage("Customer deleted successfully");
      setErrorMessage("");
      // Fetch the latest customer data after deletion
      fetchCustomerData(setCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  // Update this function to populate the fields with the current customer details
  const handleOpenEditModal = (customer) => {
    // Set the state variables with the current customer details
    setEditedFirstName(customer.first_name);
    setEditedLastName(customer.last_name);
    setEditedEmail(customer.email);
    // Open the edit modal
    setOpenEditModal(true);
  };
  const handleEditDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/update_customer/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: editedFirstName,
            last_name: editedLastName,
            email: editedEmail,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update customer details");
      }
      setSuccessMessage("Customer details updated successfully");
      setErrorMessage("");
      // Fetch the latest customer data after update
      fetchCustomerData(setCustomers);
      setOpenEditModal(false); // Close the modal after successful update
      // Reset edited fields after successful update
      setEditedFirstName("");
      setEditedLastName("");
      setEditedEmail("");
      // Update selectedRow with the edited customer details
      const updatedRow = {
        ...selectedRow,
        first_name: editedFirstName,
        last_name: editedLastName,
        email: editedEmail,
      };
      setSelectedRow(updatedRow);
      // // Fetch and update the rental history of the edited customer
      // const updatedRentalHistory = await fetchCustomerRentals(
      //   selectedRow.customer_id
      // );
      // setRentalHistory(updatedRentalHistory);
    } catch (error) {
      console.error("Error updating customer details:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setEditedFirstName(value);
        break;
      case "lastName":
        setEditedLastName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      default:
        break;
    }
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
        show={openCustomerModal}
        size={"7xl"}
        onClose={() => {
          setOpenCustomerModal(false);
          setErrorMessage("");
          setSuccessMessage("");
          setRentalId(""); // Reset the rentalId state
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
                rows={rentalHistory}
                columns={rentalHistoryColumns}
                pageSize={50}
                disableRowSelectionOnClick
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
                value={rentalId}
                onChange={(e) => setRentalId(e.target.value)}
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
          <div className="flex items-center justify-end space-x-4">
            <Button color="warning" onClick={handleReturnMovie}>
              Return Movie
            </Button>
            <Button
              color="dark"
              onClick={() => handleOpenEditModal(selectedRow)}
            >
              Edit Details
            </Button>
            <Modal
              show={openEditModal}
              size="md"
              onClose={() => setOpenEditModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                {" "}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Edit Customer Details
                  </h3>

                  <form
                    className="flex max-w-md flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleEditDetails();
                    }}
                  >
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="FirstName" value="First Name" />
                      </div>
                      <TextInput
                        id="FirstName"
                        type="text"
                        name="firstName"
                        required
                        shadow
                        value={editedFirstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="LastName" value="Last Name" />
                      </div>
                      <TextInput
                        id="LastName"
                        type="text"
                        name="lastName"
                        required
                        shadow
                        value={editedLastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="email2" value="Customer email" />
                      </div>
                      <TextInput
                        id="email2"
                        type="email"
                        name="email"
                        required
                        shadow
                        value={editedEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button type="submit" color="warning">
                      Update Customer Details
                    </Button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
            <Button color="failure" onClick={() => setOpenDeleteModal(true)}>
              Delete Customer
            </Button>
            <Modal
              show={openDeleteModal}
              size="md"
              onClose={() => setOpenDeleteModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this customer?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => {
                        handleDeleteCustomer();
                        setOpenDeleteModal(false);
                      }}
                    >
                      {"Yes, I'm sure"}
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setOpenDeleteModal(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerDatatable;
