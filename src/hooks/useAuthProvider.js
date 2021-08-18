import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage("TOKEN-CONSUMIDOR", "");
  const [token, setToken] = useState(value);

  useEffect(() => {
    setValue(token);
  }, [token]);

  return {
    token,
    setToken
  };
}
