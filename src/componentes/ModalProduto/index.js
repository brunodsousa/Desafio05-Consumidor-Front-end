import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import IconeValorPedido from "../../assets/icone-pedido-minimo.svg";
import IconeTempoEntrega from "../../assets/icone-tempo-entrega.svg";
import IconeCarrinho from "../../assets/carrinho-compras.svg";
import logoPadraoRestaurante from "../../assets/LogoRestaurante.png";
import "./style.css";

export default function ModalProduto({
  nome,
  descricao,
  preco,
  imagem,
  id,
}) {
  const [open, setOpen] = useState(false);
  const { carrinho, setCarrinho, restaurante, setRestaurante } = useAuth();
  const [quantidade, setQuantidade] = useState(1);
  const [produtoAdicionado, setProdutoAdicionado] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setProdutoAdicionado(false);
  }

  function adicionarAoCarrinho () {
    const carrinhoAtualizado = [...carrinho];

    const produtoNoCarrinho = carrinhoAtualizado.find(produto => produto.id === id)
    if(produtoNoCarrinho) {
      produtoNoCarrinho.quantidade += quantidade;
      setCarrinho(carrinhoAtualizado);
      return 
    }

    setCarrinho([...carrinho, { id, quantidade, idRestaurante: restaurante.id }]);
  }

  return (
    <div className="container-modalProduto">
      <div onClick={handleClickOpen} className="modal-produto"></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="body"
        maxWidth={false}
      >
        <div className="conteudo-modalProduto">
          <div
          className="header-produtos"
          style={{
            backgroundImage: `linear-gradient(
        205.02deg,
        rgba(18, 18, 18, 0.2) 36.52%,
        rgba(18, 18, 18, 0.8) 77.14%
        ), url(${imagem})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          >
            <button className="botao-fechar" onClick={handleClose}>x</button>
          </div>
          {produtoAdicionado ? ( 
            <div className="produtoAdicionado">
              <img src={IconeCarrinho} alt="icone de carrinho de compras" />
              <span>Pedido adicionado!</span>
            </div>
          ) : (
            <div>
              <div className="infos-modalProduto">
                <h3>{nome}</h3>
                <div className="detalhes-modal">
                  <div className="informacoes-modal">
                    <img src={IconeValorPedido} alt="icone valor do pedido mínimo" />
                    <span className="titulo">Pedido Mínimo: </span>
                    <span>
                      {Number(restaurante.valor_minimo_pedido / 100).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                  </div>
                  <div className="informacoes-modal">
                    <img src={IconeTempoEntrega} alt="icone valor do pedido mínimo" />
                    <span className="titulo">Tempo de Entrega: </span>
                    <span>{restaurante.tempo_entrega_minutos} min</span>
                  </div>
                </div>
                <img className="logomarcaRestaurante" src={restaurante.imagem ? restaurante.imagem : logoPadraoRestaurante} alt="logomarca do restaurante" />
              </div>
              <div className="descricao-produto">
                <p>{descricao}</p>
                <span>
                  {Number(preco / 100).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </span>
              </div>
              <div className="botoes-modalProduto">
                <div className="botoes-quantidade">
                  <button className={quantidade <= 1 ? "botao-inativo" : "subtracao"} onClick={() => quantidade > 1 ? setQuantidade(quantidade => quantidade - 1) : setQuantidade(1)}>-</button>
                  <div className="quantidade">{quantidade}</div>
                  <button className="soma" onClick={() => setQuantidade(quantidade => quantidade + 1)}>+</button>
                </div>
                <button className="button" onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
              </div>
            </div>
          )}
          <span className="link-revisaoProduto">Ir para revisão do produto</span>
        </div>
      </Dialog>
    </div>
  );
}

