import Dialog from "@material-ui/core/Dialog";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import CardProdutoCarrinho from "../CardProdutoCarrinho";
import ModalEndereco from "../ModalEndereco";
import AlertaDeErro from "../AlertaDeErro";
import AlertaDeConfirmacao from "../AlertaDeConfirmacao";
import useAuth from "../../hooks/useAuth";
import close from "../../assets/close-red.svg";
import carrinho from "../../assets/carrinho.svg";
import checked from "../../assets/checked.svg";
import pedidoVazio from "../../assets/pedido-vazio.svg";

export default function Carrinho() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token } = useAuth();
  const [consumidor, setConsumidor] = useState({});
  const [produtos, setProdutos] = useState(["1", "2"]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMensagemSucesso("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [mensagemSucesso]);

  async function getDadosConsumidor() {
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:8000/consumidor", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await resposta.json();

      setCarregando(false);
      if (!resposta.ok) {
        return setErro(dados);
      }
      
      setConsumidor(dados.endereco);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    getDadosConsumidor();
  }, []);

  function abrirModal() {
    setOpen(true);
  }

  function fecharModal() {
    setOpen(false);
  }

  async function confirmarPedido() {
    console.log("aqui");
  }

  return (
    <div className={classes.container}>
      <button className={classes.revisao} type="button" onClick={abrirModal}>
        Ir para a revisão do pedido
      </button>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <div className={classes.carrinho}>
          <img
            className={classes.close}
            src={close}
            alt="close"
            onClick={fecharModal}
          />
          <div className={classes.tituloCarrinho}>
            <img src={carrinho} alt="carrinho" />
            <h2 className={classes.nomeRestaurante}>Restaurante</h2>
          </div>
          <div className={classes.conteudoCarrinho}>
            {consumidor.endereco ? (
              <p className={classes.endereco}>
                <span className={classes.enderecoTitulo}>
                  Endereço de Entrega:{" "}
                </span>
                {consumidor.endereco}{consumidor.complemento && <span>, {consumidor.complemento}</span>}, {consumidor.cep.slice(0, 5)}-{consumidor.cep.slice(5)}
              </p>
            ) : (
              <ModalEndereco setMensagemSucesso={setMensagemSucesso} getDadosConsumidor={getDadosConsumidor}/>
            )}
            {produtos.length > 0 ? (
              <div className={classes.pedido}>
                <p className={classes.tempoEntrega}>
                  Tempo de entrega:{" "}
                  <span className={classes.tempo}>45 min</span>
                </p>
                <div className={classes.listaProdutos}>
                  {produtos.map((produto) => (
                    <CardProdutoCarrinho
                      key={produto}
                      nome="Pizza"
                      quantidade={produto}
                      preco="9999"
                    />
                  ))}
                </div>
                <button
                  className={classes.revisao}
                  type="button"
                  onClick={fecharModal}
                >
                  Adicionar mais itens ao pedido
                </button>
                <div className={classes.divider}></div>
                <div className={classes.valores}>
                  <div className={classes.totais}>
                    <p>Subtotal</p>
                    <span className={classes.subtotal}>
                      {Number(29997 / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className={classes.totais}>
                    <p>Taxa de entrega</p>
                    <span className={classes.subtotal}>
                      {Number(890 / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className={classes.totais}>
                    <p>Total</p>
                    <span className={classes.total}>
                      {Number(30887 / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={confirmarPedido}
                  className="button"
                >
                  Confirmar Pedido
                </button>
              </div>
            ) : (
              <div className={classes.carrinhoVazio}>
                <img src={pedidoVazio} alt="carrinho vazio"/>
              </div>
            )}
            <AlertaDeErro erro={erro} />
            <Carregando open={carregando} />
            <AlertaDeConfirmacao mensagem={mensagemSucesso}/>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
