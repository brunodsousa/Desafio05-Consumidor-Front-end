import "./style.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ilustracao from "../../assets/illustration-2.svg";
import BackgroundImg from "../../assets/bg-pizzaria.png";
import logo from "../../assets/LogomarcaBranca.svg";
import iconePedido from "../../assets/icone-pedido-minimo.svg";
import iconeTempo from "../../assets/icone-tempo-entrega.svg";
import iconeSemProdutos from "../../assets/icone-prato-vazio.svg";
import logoPadraoRestaurante from "../../assets/LogoRestaurante.png";
import useAuth from "../../hooks/useAuth";
import { get } from "../../servicos/requisicaoAPI";
import Card from "../../componentes/Card";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";


export default function Produtos() {
  const { setToken, token } = useAuth();
  const [cardapio, setCardapio] = useState([]);
  const [dadosRestaurante, setDadosRestaurante] = useState({});
  const [nomeRestaurante, setNomeRestaurante] = useState(dadosRestaurante.nome);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  async function detalharRestaurante() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get(`restaurantes/${id}`, token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }
   
      return setDadosRestaurante(dados);
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

  useEffect(() => {
    listarCardapio();
    detalharRestaurante();
  }, []);

  const produtosAtivos = cardapio.filter(produto => {
    return produto.ativo === true;
  })

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-restaurantes">
      <img className="avatar" src={dadosRestaurante.imagem ? dadosRestaurante.imagem : logoPadraoRestaurante} alt="imagem do usuário" />
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div
        className="header-restaurantes"
        style={{
          backgroundImage: `linear-gradient(
      205.02deg,
      rgba(18, 18, 18, 0.2) 36.52%,
      rgba(18, 18, 18, 0.8) 77.14%
      ), url(${BackgroundImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1>{nomeRestaurante}</h1>
        <img className="logomarca" src={logo} alt="logomarca" />
        <button onClick={logout}>Logout</button>
      </div>
        <button>Revisar Pedido</button>
      <div className="conteudo-pagina">
        <div className="detalhes-restaurante">
          <div className="informacoes">
            <img src={iconePedido} alt="icone de pedido mínimo" />
            <span className="titulo">Pedido Mínimo: </span><span> R$ {dadosRestaurante.valor_minimo_pedido / 100},00</span>
          </div>
          <div className="informacoes">
            <img src={iconeTempo} alt="icone tempo de entrega" />
            <span className="titulo">Tempo de Entrega: </span><span>{dadosRestaurante.tempo_entrega_minutos} min</span>
          </div>
        </div>
          <div className="informacoes descricao">
            <p>{dadosRestaurante.descricao}</p>
          </div>
        {produtosAtivos.length === 0 && (
          <div className="listaProdutosVazia">
            <img className="iconeSemProdutos" src={iconeSemProdutos} alt="icone sem produtos cadastrados" />
            <p>
              Desculpe, estamos sem produtos ativos!
            </p>
          </div> 
        )}  
        <div className="container-cards">
            {produtosAtivos.map((produto) => (
                <Card
                  key={produto.id}
                  preco={produto.preco}
                  nome={produto.nome}
                  descricao={produto.descricao}
                  imagem={produto.imagem}
                  precoProduto={produto.preco}
                />
            ))}
        </div>
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}