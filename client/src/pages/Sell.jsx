import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { createCustomerTransaction } from "../redux/actions/customer";

const Sell = () => {
  const { customers, success, error, loading } = useSelector(
    (state) => state.customer
  );
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState("");
  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const cSelectData = customers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const pSelectData = products?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const calcAmount = () => {
    const found = products.find((p) => p.id === product.value);

    const Price = setPrice(found.price);

    const CAmount = setAmount((found.price * quantity).toFixed(2));

    return CAmount, Price;
  };

  useEffect(() => {
    if (product && quantity) {
      calcAmount();
    }
  }, [product, quantity]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clear();
    }
    if (success) {
      toast.success("Transaction created successfully!");
      clear();
    }
  }, [error, success]);

  const clear = () => {
    setQuantity("");
    setPrice("");
    setAmount("");
    setProduct(null);
    setCustomer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      customer_id: customer.value,
      quantity: quantity,
      product_id: product.value,
      price: price,
      amount: amount,
      payment_status: false,
    };

    dispatch(createCustomerTransaction(newForm));
  };

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] mx-8 my-6 rounded-2xl shadow-xl bg-[#f2f2f2]">
        <h4 className="pt-6 text-2xl font-semibold text-blue-700">Sale</h4>
        <h3>{customer?.value}</h3>
        <h3>{product?.value}</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-start justify-start gap-8 p-10">
            <div className="w-[30%]">
              <label className="pb-2">
                Customer <span className="text-red-500">*</span>
              </label>
              <Select
                className="mt-2"
                classNamePrefix="select"
                required
                name="customer"
                value={customer}
                options={cSelectData && cSelectData}
                placeholder="Customer"
                onChange={(customer) => setCustomer(customer)}
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
                value={product}
                options={pSelectData}
                onChange={(product) => setProduct(product)}
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

export default Sell;
