import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { createVendorTransaction } from "../redux/actions/vendor";

const Buy = () => {
  const { vendors, success, error, loading } = useSelector(
    (state) => state.vendor
  );
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [lactometer, setLactometer] = useState(0);
  const [product, setProduct] = useState("");
  const [vendor, setVendor] = useState("");

  const dispatch = useDispatch();

  const transformedArray = vendors?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const productType = [
    {
      label: "cow",
      value: "cow",
    },
    {
      label: "buffalo",
      value: "buff",
    },
  ];

  const clear = () => {
    setQuantity("");
    setPrice("");
    setAmount("");
    setLactometer(0);
  };

  const calcAmount = () => {
    //vendor, price, quantity
    const found = vendors.find((v) => v.id === vendor);

    let ProductPrice;

    if (product === "cow") {
      ProductPrice = found.cow_price;
      if (ProductPrice > 0) {
        setPrice(ProductPrice);
      } else {
        toast.error("Seller does not have price for cow milk");
      }
    } else {
      ProductPrice = found.buff_price;
      if (ProductPrice > 0) {
        setPrice(ProductPrice);
      } else {
        toast.error("Seller does not have price for buffalo milk");
      }
    }

    const CAmount = setAmount((ProductPrice * quantity).toFixed(2));

    return CAmount;
  };

  useEffect(() => {
    if (vendor && product && quantity) {
      calcAmount();
    }
  }, [vendor, product, quantity]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clear();
    }
    if (success) {
      toast.success("Transaction created successfully!");
      clear();
    }
  }, [dispatch, error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      vendor_id: vendor,
      quantity: quantity,
      product_type: product,
      price: price,
      amount: amount,
      payment_status: false,
      lactometer: lactometer,
    };

    dispatch(createVendorTransaction(newForm));
  };

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] mx-8 my-6 rounded-2xl shadow-xl bg-[#f2f2f2]">
        <h4 className="pt-6 text-2xl font-semibold text-blue-700">BUY</h4>
        {/* <pre>{JSON.stringify(vendors, undefined, 2)}</pre> */}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-start justify-start gap-8 p-10">
            <div className="w-[30%]">
              <label className="pb-2">
                Seller <span className="text-red-500">*</span>
              </label>
              <Select
                className="mt-2"
                classNamePrefix="select"
                required
                name="vendor"
                options={transformedArray && transformedArray}
                placeholder="Seller"
                onChange={(vendor) => setVendor(vendor.value)}
              />
            </div>

            <div className="w-[30%]">
              <label className="pb-2">
                Product <span className="text-red-500">*</span>
              </label>
              <Select
                className="mt-2"
                classNamePrefix="select"
                required
                name="product"
                options={productType}
                onChange={(product) => setProduct(product.value)}
                placeholder="Product"
              />
            </div>

            <div className="w-[30%]">
              <label className="pb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>

            <div>
              <label className="pb-2">Lactometer</label>
              <input
                type="number"
                name="lactometer"
                value={lactometer}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setLactometer(e.target.value)}
                placeholder="Lactometer"
              />
            </div>

            <div>
              <label className="pb-2">Price</label>
              <input
                type="text"
                name="price"
                disabled
                required
                value={price}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Price per Litre"
              />
            </div>

            <div>
              <label className="pb-2">Total Amount</label>
              <input
                type="text"
                name="amount"
                disabled
                required
                value={amount}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Total"
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

export default Buy;
