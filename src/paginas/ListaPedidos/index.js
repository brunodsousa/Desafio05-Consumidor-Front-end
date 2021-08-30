import "./style.css";
import ilustracao from "../../assets/illustration-2.svg";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { get } from "../../servicos/requisicaoAPI";
import { useState, useEffect } from "react";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import ModalEditarConsumidor from "../../componentes/ModalEditarConsumidor";
import ListaPedidos from "../../componentes/ListaPedidos";
import BackgroundImg from "../../assets/bg-pizzaria.png";
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";

export default function ListaDePedidos() {
  const { setToken, token } = useAuth();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [confirmacao, setConfirmacao] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [consumidor, setConsumidor] = useState({});
  const [endereco, setEndereco] = useState({});

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
      setConfirmacao("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmacao]);

  async function dadosPedido() {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await get("pedidos", token);

      setCarregando(false);
      if (erro) {
        return;
      }

      setPedidos(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  async function dadosConsumidor() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get("consumidor", token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      setEndereco(dados.endereco);
      return setConsumidor(dados.consumidor);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    dadosConsumidor();
    dadosPedido();
  }, []);

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-pedidos">
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div
        className="header-pedidos"
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
        <ModalEditarConsumidor
          consumidor={consumidor}
          endereco={endereco}
          dadosConsumidor={dadosConsumidor}
          setMensagemSucesso={setConfirmacao}
        />
        <div className="titulo-restaurante">
          <ArrowLeft onClick={() => history.push("/restaurantes")} />
          <h1>Pedidos</h1>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="conteudo-pedidos">
        <div className="pedidos">
          <div className="titulo-pedidos">
            <h5>Pedido</h5>
            <h5>Itens</h5>
            <h5>Status</h5>
            <h5>Restaurante</h5>
            <h5>Total</h5>
          </div>
          {pedidos.map((pedido) => (
            <ListaPedidos
              key={pedido.idPedido}
              id={pedido.idPedido}
              itensPedido={pedido.itensPedido}
              nome={pedido.nomeRestaurante}
              total={pedido.valorTotalPedido}
              saiuParaEntrega={pedido.saiuParaEntrega}
              taxaDeEntrega={pedido.taxaDeEntrega}
              subtotalPedido={pedido.subtotalPedido}
              imagemRestaurante={pedido.imagemRestaurante}
              imagemCategoria={pedido.imagemCategoria}
              dadosPedido={dadosPedido}
              setConfirmacao={setConfirmacao}
            />
          ))}
        </div>
      </div>
      <AlertaDeErro erro={erro} />
      <AlertaDeConfirmacao mensagem={confirmacao} />
      <Carregando open={carregando} />
    </div>
  );
}
