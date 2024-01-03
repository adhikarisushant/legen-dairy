import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createVendor } from "../redux/actions/vendor";

const VendorCreate = () => {
  const { loading } = useSelector((state) => state.vendor);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cow, setCow] = useState("");
  const [buff, setBuff] = useState("");

  const dispatch = useDispatch();

  const clear = () => {
    setName("");
    setContact("");
    setAddress("");
    setCow("");
    setBuff("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      name: name,
      contact: contact,
      address: address,
      cow_price: cow || "0",
      buff_price: buff || "0",
    };
    dispatch(createVendor(newForm));
    clear();
  };

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] mx-8 my-6 rounded-2xl shadow-xl bg-[#f2f2f2]">
        <h4 className="pt-6 text-2xl font-semibold text-blue-700">
          Create a New Vendor
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

            <div className="w-[30%]">
              <label className="pb-2">
                Cow milk<span className="text-red-500"> price / liter</span>
              </label>
              <input
                type="number"
                name="cow"
                value={cow}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setCow(e.target.value)}
                placeholder="Cow milk price"
              />
            </div>

            <div className="w-[30%]">
              <label className="pb-2">
                Buffalo milk{" "}
                <span className="text-red-500"> price / liter</span>
              </label>
              <input
                type="number"
                name="buff"
                value={buff}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setBuff(e.target.value)}
                placeholder="Buffalo milk price"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <input
              type="submit"
              value="Create"
              disabled={loading}
              className={`max-w-[150px] m-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md font-medium text-white ${
                !loading ? "bg-green-600" : "bg-red-600"
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorCreate;
