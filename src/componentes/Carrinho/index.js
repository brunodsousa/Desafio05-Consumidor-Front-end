import Dialog from "@material-ui/core/Dialog";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import CardProdutoCarrinho from "../CardProdutoCarrinho";
import ModalEndereco from "../ModalEndereco";
import AlertaDeErro from "../AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import close from "../../assets/close-red.svg";
import imagemCarrinho from "../../assets/carrinho.svg";
import pedidoVazio from "../../assets/pedido-vazio.svg";

export default function Carrinho({ setMensagemSucesso }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token, carrinho, setCarrinho, restaurante } = useAuth();
  const [consumidor, setConsumidor] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubTotal(0);
    for(const produto of carrinho) {
      const valorProduto = produto.quantidade * produto.preco;
      setSubTotal(subtotal => subtotal += valorProduto);
    }
  }, [carrinho]);

  useEffect(() => {
    setTotal(subTotal+restaurante.taxa_entrega);
  }, [subTotal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

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
    setErro("");

    const data = {
      subtotal: subTotal, 
      taxa_de_entrega: restaurante.taxa_entrega,
      valor_total: total || subTotal + restaurante.taxa_entrega,
      produtos: carrinho
    }
    
    setCarregando(true);
    try {
      const resposta = await fetch("http://localhost:8000/pedidos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setCarregando(false);

      if(!resposta.ok) {
        const dados = await resposta.json();
        return setErro(dados);
      }

      setCarrinho([]);
      setMensagemSucesso("Pedido confirmado! Agora é só aguardar o seu pedido.");
      fecharModal();

    }catch(error) {
      setCarregando(false);
      setErro(error.message);
    }
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
            <img src={imagemCarrinho} alt="carrinho" />
            <h2 className={classes.nomeRestaurante}>{carrinho.length > 0 ? carrinho[0].nomeRestaurante : restaurante.nome}</h2>
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
            {carrinho.length > 0 ? (
              <div className={classes.pedido}>
                <p className={classes.tempoEntrega}>
                  Tempo de entrega:{" "}
                  <span className={classes.tempo}>{restaurante.tempo_entrega_minutos} min</span>
                </p>
                <div className={classes.listaProdutos}>
                  {carrinho.map((produto) => (
                    <CardProdutoCarrinho
                      key={produto.id}
                      nome={produto.nome}
                      quantidade={produto.quantidade}
                      preco={produto.preco}
                      imagem={produto.imagem}
                      id={produto.id}
                      carrinho={carrinho}
                      setCarrinho={setCarrinho}
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
                      {Number(subTotal / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className={classes.totais}>
                    <p>Taxa de entrega</p>
                    <span className={classes.subtotal}>
                      {Number(restaurante.taxa_entrega / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className={classes.totais}>
                    <p>Total</p>
                    <span className={classes.total}>
                      {Number(total / 100 || ((subTotal + restaurante.taxa_entrega) / 100)).toLocaleString("pt-BR", {
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
          </div>
        </div>
      </Dialog>
    </div>
  );
}
