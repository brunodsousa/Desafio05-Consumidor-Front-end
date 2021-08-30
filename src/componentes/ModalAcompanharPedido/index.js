import Dialog from "@material-ui/core/Dialog";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import CardProdutoPedido from "../CardProdutoPedido";
import useAuth from "../../hooks/useAuth";
import { ReactComponent as Close } from "../../assets/close-red.svg";
import { postConfirmarEntrega } from "../../servicos/requisicaoAPI";
import LogoRestaurante from "../../assets/LogoRestaurante.png";
import "./style.css";

export default function AcompanharPedido({
  itensPedido,
  dadosPedido,
  setMensagemSucesso,
  id,
  nome,
  saiuParaEntrega,
  total,
  imagemCategoria,
  imagemRestaurante,
  subtotalPedido,
  taxaDeEntrega,
}) {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pedidos, setPedidos] = useState({});
  const [produtos, setProdutos] = useState([]);
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
    setPedidos({id, nome, saiuParaEntrega, total, imagemCategoria, imagemRestaurante, subtotalPedido, taxaDeEntrega});
    setProdutos(itensPedido);
  }

  function fecharModal() {
    setOpen(false);
  }

  async function confirmarEntrega() {
    setErro("");
    setCarregando(true);

    try {
      const { dados, erro } = await postConfirmarEntrega(
        `entregas/${id}/ativar`,
        token
      );

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      await dadosPedido();
      setMensagemSucesso("Entrega confirmada.");
      fecharModal();
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className="containerAcompanhar">
      <div onClick={abrirModal} className="modalPedido"></div>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <div className="acompanharPedido">
          <div
            className="categoria-restaurante"
            style={{
              backgroundImage: `url(${pedidos.imagemCategoria})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Close onClick={fecharModal} />
            <img src={pedidos.imagemRestaurante || LogoRestaurante} alt="imagem restaurante" />
          </div>
          <div className="informacoes-pedido">
            <h2>{pedidos.nomeRestaurante}</h2>
            <p>
              Status:{" "}
              <span
                style={{
                  color: `${pedidos.saiuParaEntrega ? "green" : "red"}`,
                }}
              >
                {pedidos.saiuParaEntrega
                  ? "Enviado para entrega"
                  : "Sendo preparado"}
              </span>
            </p>
            <div className="listaProdutosPedido">
              {produtos.map((produto) => (
                <CardProdutoPedido
                  key={produto.nomeProduto}
                  nome={produto.nomeProduto}
                  quantidade={produto.quantidade}
                  preco={produto.subtotalProduto}
                  imagem={produto.imagemProduto}
                />
              ))}
            </div>
            <div className="divider"></div>
            <div className="valores">
              <div className="totais">
                <p>Subtotal</p>
                <span className="subtotal">
                  {Number(pedidos.subtotalPedido / 100).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </span>
              </div>
              <div className="totais">
                <p>Taxa de entrega</p>
                <span className="subtotal">
                  {Number(pedidos.taxaDeEntrega / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="totais">
                <p>Total</p>
                <span className="total">
                  {Number(pedidos.total / 100).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </span>
              </div>
            </div>
            {pedidos.saiuParaEntrega && (
              <button
                onClick={() => confirmarEntrega()}
                type="button"
                className="button"
              >
                Confirmar Entrega
              </button>
            )}
          </div>
        </div>
        <AlertaDeErro erro={erro} />
        <Carregando open={carregando} />
      </Dialog>
    </div>
  );
}
