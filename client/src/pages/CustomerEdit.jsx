import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editCustomer } from "../redux/actions/customer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { server } from "../server";
import axios from "axios";

const CustomerEdit = () => {
  const { error, loading, success, customers } = useSelector(
    (state) => state.customer
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = {
      name: name,
      contact: contact,
      address: address,
      status: status,
      id: id,
    };
    dispatch(editCustomer(newForm));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${server}/customer/delete/${id}`,
        { id },
        {
          withCredentials: true,
        }
      );
      toast.success("Delete Success!");
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Customer Updated");
      navigate("/");
      window.location.reload(true);
    }
  }, [error, success]);

  useEffect(() => {
    const found = customers?.find((v) => v.id == id);
    if (found) {
      setName(found.name);
      setContact(found.contact);
      setAddress(found.address);
      setStatus(found.status);
    }
  }, [customers]);

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] mx-8 my-6 rounded-2xl shadow-xl bg-[#f2f2f2]">
        <h4 className="pt-6 text-2xl font-semibold text-blue-700">
          Edit Vendor Data
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-start justify-start gap-8 p-10">
            <div className="w-[30%]">
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div className="w-[30%]">
              <label className="pb-2">
                Contact No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                value={contact}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact Number"
              />
            </div>

            <div className="w-[30%]">
              <label className="pb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={address}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <input
              type="submit"
              value="Submit"
              disabled={loading}
              className={`max-w-[150px] m-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md font-medium text-white ${
                !loading ? "bg-green-600" : "bg-red-600"
              }`}
            />
          </div>
        </form>

        <div className="self-start pl-6 pb-6">
          <Button
            onClick={handleClickOpen}
            disabled={loading}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          {/* dialog start */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to delete the vendor?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The vendor's status will be changed to inactive.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ ml: "6rem" }}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={handleDelete}
                  autoFocus
                >
                  Delete
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
          {/* dialog end */}
        </div>
      </div>
    </div>
  );
};

export default CustomerEdit;
