import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { BASE_URL } from "../../utilities/constants";

const columns = [
  { field: "customer_id", headerName: "Customer ID", width: 200 },
  { field: "first_name", headerName: "First Name", width: 250 },
  { field: "last_name", headerName: "Last Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
];

const Customer_Datatable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/customers`)
      .then((response) => response.json())
      .then((data) => {
        // Add a unique 'id' property to each row based on 'customer_id'
        const customersWithId = data.map((customer) => ({
          ...customer,
          id: customer.customer_id,
        }));
        setCustomers(customersWithId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ height: 800, width: "83%", margin: "auto" }}>
      <DataGrid rows={customers} columns={columns} pageSize={10} />
    </div>
  );
};

export default Customer_Datatable;
