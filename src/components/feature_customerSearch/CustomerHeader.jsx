import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

const CustomerHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const onCloseModal = () => {
    setOpenModal(false);
    setEmail("");
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
          {" "}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Customer Sign up
            </h3>

            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="FirstName" value="First Name" />
                </div>
                <TextInput id="FirstName" type="text" required shadow />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="LastName" value="Last Name" />
                </div>
                <TextInput id="LastName" type="text" required shadow />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" value="Your email" />
                </div>
                <TextInput
                  id="email2"
                  type="email"
                  placeholder="username@email.com"
                  required
                  shadow
                />
              </div>

              <Button type="submit" color="warning">
                Register New Customer
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerHeader;
