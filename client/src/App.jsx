import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Buy,
  Customer,
  CustomerCreate,
  CustomerEdit,
  HomePage,
  LoginPage,
  Product,
  ProductCreate,
  ProductEdit,
  Sell,
  Vendor,
  VendorCreate,
  VendorEdit,
} from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./pages/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { loadVendors } from "./redux/actions/vendor";
import { loadProducts } from "./redux/actions/product";
import { loadCustomers } from "./redux/actions/customer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadVendors());
    dispatch(loadProducts());
    dispatch(loadCustomers());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sale" element={<Sell />} />
          <Route path="/vendors" element={<Vendor />} />
          <Route path="/vendors/edit/:id" element={<VendorEdit />} />
          <Route path="/vendors/create" element={<VendorCreate />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/edit/:id" element={<CustomerEdit />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
