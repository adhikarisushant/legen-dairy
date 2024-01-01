import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const { customers } = useSelector((state) => state.customer);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "contact",
        header: "Contact",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "id",
        header: "Update",
        size: 150,
        Cell: ({ cell }) => (
          <Box sx={{ "& button": { m: 1 } }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/customers/edit/${cell.getValue()}`)}
            >
              Edit
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: customers || [],
  });

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] mx-8 my-6 rounded-2xl shadow-xl bg-[#f2f2f2]">
        <h4 className="pt-6 text-2xl font-semibold text-blue-700">Customers</h4>

        <div className="flex items-center justify-end self-end mr-8 mb-4">
          <button
            onClick={() => navigate("/customers/create")}
            className={`m-2 cursor-pointer appearance-none text-center block w-full px-6 h-[42px] border border-gray-300 rounded-3xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md font-medium text-white bg-green-600`}
          >
            Create New Customer
          </button>
        </div>

        <div className="pb-6">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
