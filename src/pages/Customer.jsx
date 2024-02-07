import React from "react";
import Customer_Datatable from "../components/feature_customerSearch/Customer_Datatable";

const Customer = () => {
  return (
    <div className="w-full pt-[4rem] py-[10rem] px-4 bg-white flex flex-col gap-24">
      <Customer_Datatable />
    </div>
  );
};

export default Customer;
