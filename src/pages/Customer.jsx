import React from "react";
import CustomerDatatable from "../components/feature_customerSearch/Customer_Datatable";
import CustomerHeader from "../components/feature_customerSearch/CustomerHeader";

const Customer = () => {
  return (
    <div className="w-full pt-[2rem] py-[10rem] px-4 bg-white flex flex-col gap-10">
      <CustomerHeader />
      <CustomerDatatable />
    </div>
  );
};

export default Customer;
