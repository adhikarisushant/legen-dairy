import React from "react";
import { useParams } from "react-router-dom";

const VendorEdit = () => {
  const { id } = useParams();
  return <div>VendorEdit {id}</div>;
};

export default VendorEdit;
