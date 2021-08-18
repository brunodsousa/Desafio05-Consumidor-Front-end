import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage("TOKEN-CONSUMIDOR", "");
  const [token, setToken] = useState(value);
  const [valorCarrinho, setValorCarrinho] = useLocalStorage("CARRINHO", []);
  const [carrinho, setCarrinho] = useState(valorCarrinho);
  const [restaurante, setRestaurante] = useState({});

  useEffect(() => {
    setValue(token);
    setValorCarrinho(carrinho);
  }, [token, carrinho]);

  return {
    token,
    setToken,
    carrinho,
    setCarrinho,
    restaurante,
    setRestaurante
  };
}
