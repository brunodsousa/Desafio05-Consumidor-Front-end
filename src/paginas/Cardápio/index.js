import "./style.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ilustracao from "../../assets/illustration-2.svg";
import logo from "../../assets/LogomarcaBranca.svg";
import iconePedido from "../../assets/icone-pedido-minimo.svg";
import iconeTempo from "../../assets/icone-tempo-entrega.svg";
import iconeSemProdutos from "../../assets/icone-prato-vazio.svg";
import logoPadraoRestaurante from "../../assets/LogoRestaurante.png";
import useAuth from "../../hooks/useAuth";
import { get } from "../../servicos/requisicaoAPI";
import CardProduto from "../../componentes/CardProduto";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import Carrinho from "../../componentes/Carrinho";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import ModalAcompanharPedido from "../../componentes/ModalAcompanharPedido";

export default function Produtos() {
  const { setToken, token, restaurante, setRestaurante, carrinho } = useAuth();
  const [cardapio, setCardapio] = useState([]);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [verMais, setVerMais] = useState(false);
  const [detalhePedido, setDetalhePedido] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 4000);
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

  async function detalharRestaurante() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get(`restaurantes/${id}`, token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      return setRestaurante(dados.restaurante);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  async function listarCardapio() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get(`restaurantes/${id}/produtos`, token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      return setCardapio(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  async function detalhamentoPedido() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get("pedidos", token);

      setCarregando(false);

      if (dados === "Não foi encontrado nenhum pedido.") {
        return setDetalhePedido("");
      }

      if (erro) {
        return setErro(dados);
      }

      setDetalhePedido(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    listarCardapio();
    detalharRestaurante();
    detalhamentoPedido();
  }, []);

  const produtosAtivos = cardapio.filter((produto) => {
    return produto.ativo === true;
  });

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-restaurantes">
      <img
        className="avatar-restaurante"
        src={restaurante.imagem ? restaurante.imagem : logoPadraoRestaurante}
        alt="imagem do restaurante"
      />
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div
        className="header-restaurantes"
        style={{
          backgroundImage: `linear-gradient(
      205.02deg,
      rgba(18, 18, 18, 0.2) 36.52%,
      rgba(18, 18, 18, 0.8) 77.14%
      ), url(${restaurante.categoria_imagem})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="nome-restaurante">
          <ArrowLeft onClick={() => history.push("/restaurantes")} />
          <div className="div-titulo">
            <h1>{restaurante.nome}</h1>
            {detalhePedido && (
              <button  className="botao-link" onClick={() => history.push("/pedidos")}>Pedidos</button>
            )}
          </div>
        </div>
        <img className="logomarca" src={logo} alt="logomarca" />
        <button onClick={logout}>Logout</button>
      </div>
      <div
        className={
          carrinho.length > 0 ? "revisar-pedido" : "revisar-pedido-escondido"
        }
      >
        <Carrinho setMensagemSucesso={setMensagemSucesso} />
      </div>
      <div className="conteudo-pagina">
        <div className="detalhes-restaurante">
          <div className="informacoes">
            <img src={iconePedido} alt="icone de pedido mínimo" />
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
          <div className="informacoes">
            <img src={iconeTempo} alt="icone tempo de entrega" />
            <span className="titulo">Tempo de Entrega: </span>
            <span>{restaurante.tempo_entrega_minutos} min</span>
          </div>
        </div>
        <div className="informacoes descricao">
          {restaurante.descricao && (
            <p>
              {!verMais && restaurante.descricao.length > 40
                ? restaurante.descricao.slice(0, 40) + "..."
                : restaurante.descricao}{" "}
              <button
                onClick={() => setVerMais(!verMais)}
                className={
                  restaurante.descricao.length < 40
                    ? "ver-mair-desativado"
                    : "ver-mais"
                }
              >
                {verMais ? "ver menos" : "ver mais"}
              </button>
            </p>
          )}
        </div>
        {produtosAtivos.length === 0 && (
          <div className="listaProdutosVazia">
            <img
              className="iconeSemProdutos"
              src={iconeSemProdutos}
              alt="icone sem produtos cadastrados"
            />
            <p>Desculpe, estamos sem produtos ativos!</p>
          </div>
        )}
        <div className="container-cards">
          {produtosAtivos.map((produto) => (
            <CardProduto
              key={produto.id}
              nome={produto.nome}
              descricao={produto.descricao}
              imagem={produto.imagem}
              precoProduto={produto.preco}
              id={produto.id}
              setMensagemSucesso={setMensagemSucesso}
              setErro={setErro}
            />
          ))}
        </div>
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
      <AlertaDeConfirmacao mensagem={mensagemSucesso} />
    </div>
  );
}
