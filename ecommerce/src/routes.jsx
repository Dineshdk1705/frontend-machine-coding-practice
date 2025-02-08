import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import MainLayout from "./layouts/MainLayout";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import Wishlist from "./pages/wishlist/Wishlist";
import OnBoarding from "./components/custom/OnBoarding/OnBoarding";
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<OnBoarding />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
