import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Buy, HomePage, LoginPage, Sell } from "./routes/Routes";
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
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer
        position="bottom-center"
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
