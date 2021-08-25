import Dialog from "@material-ui/core/Dialog";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import CardProdutoPedido from "../CardProdutoPedido";
import useAuth from "../../hooks/useAuth";
import {ReactComponent as Close} from "../../assets/close-red.svg";
import  logo from "../../assets/LogoRestaurante.png";
import "./style.css";

export default function AcompanharPedido() {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pedidos, setPedidos] = useState(["1", "2"]);
  const { token } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  function abrirModal() {
    setOpen(true);
  }

  function fecharModal() {
    setOpen(false);
  }

  return (
    <div className="containerAcompanhar">
      <button className="buttonAcompanhar" type="button" onClick={abrirModal}>
        Acompanhar pedido
      </button>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <div className="acompanharPedido">
          <div className="categoria-restaurante">
            <Close onClick={fecharModal}/>
            <img src={logo} alt="imagem restaurante"/>
          </div>
          <div className="informacoes-pedido">
            <h2>Restaurante</h2>
            <p>Status: <span style={{color: "red"}}>Sendo preparado</span></p>
            <div className="listaProdutosPedido">
              {pedidos.map(pedido => (
                <CardProdutoPedido key={pedido} nome={"Pizza"} quantidade={2} preco={4000} imagem={logo} />
              ))}
            </div>
            <div className="divider"></div>
            <div className="valores">
              <div className="totais">
                <p>Subtotal</p>
                <span className="subtotal">50,00</span>
              </div>
              <div className="totais">
                <p>Taxa de entrega</p>
                <span className="subtotal">10,00</span>
              </div>
              <div className="totais">
                <p>Total</p>
                <span className="total">60,00</span>
              </div>
            </div>
            <button type="button" className="button">
              Confirmar Entrega
            </button>
          </div>
        </div>
        <AlertaDeErro erro={erro} />
        <Carregando open={carregando} />
      </Dialog>
    </div>
  );
}
