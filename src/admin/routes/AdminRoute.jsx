import { Navigate } from "react-router-dom";
import { selectAdminAuth } from "../store/adminSlice";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const isAuth = useSelector(selectAdminAuth);

  if (!isAuth) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
