import AuthContext from "../contexto/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
