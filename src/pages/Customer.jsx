import React, { useState, useEffect } from "react";
import CustomerDatatable from "../components/feature_customerSearch/Customer_Datatable";
import CustomerHeader from "../components/feature_customerSearch/CustomerHeader";
import { BASE_URL } from "../utilities/constants";
const Customer = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers`);
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
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

  const handleAddCustomerSuccess = () => {
    fetchCustomerData();
  };

  return (
    <div className="w-full pt-[2rem] py-[10rem] px-4 bg-white flex flex-col gap-10">
      <CustomerHeader onAddCustomerSuccess={handleAddCustomerSuccess} />
      <CustomerDatatable customersData={customers} />
    </div>
  );
};

export default Customer;
