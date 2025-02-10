import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const { isCheckoutAllowed, isPaymentCompleted } = useSelector(
    (state) => state.checkout
  );
  const { cartTotalAmount } = useSelector((state) => state.cartItems);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }

  if (
    location.pathname === "/payment" &&
    !isCheckoutAllowed &&
    !isPaymentCompleted
  ) {
    return cartTotalAmount > 0 ? (
      <Navigate to="/cart" replace />
    ) : (
      <Navigate to="/products" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
