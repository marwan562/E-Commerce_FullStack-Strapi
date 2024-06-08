import { ReactNode } from "react";
import CookieService from "../services/CookieService";
import { Navigate } from "react-router-dom";

type TProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProps) => {
  const token = CookieService.get("jwt");
  if (!token) {
    return <Navigate to={"/auth/login"} />
  }
  return children;
};

export default ProtectedRoute;
