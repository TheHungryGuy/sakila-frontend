import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BASE_URL } from "../../utilities/constants";

const CustomerHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onCloseModal = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setErrorMessage("");
    setSuccessMessage("");
    setOpenModal(false);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/add_customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add customer");
      }
      setSuccessMessage("Customer successfully added");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding customer:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-between items-center  px-6 ">
      <header className="text-6xl font-bold">Customer Details</header>
      <Button onClick={() => setOpenModal(true)} color="warning">
        Add Customer
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Customer Sign up
            </h3>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleAddCustomer}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="FirstName" value="First Name" />
                </div>
                <TextInput
                  id="FirstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="LastName" value="Last Name" />
                </div>
                <TextInput
                  id="LastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" value="Your email" />
                </div>
                <TextInput
                  id="email2"
                  type="email"
                  placeholder="username@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  shadow
                />
              </div>
              <Button type="submit" color="warning">
                Register New Customer
              </Button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerHeader;
