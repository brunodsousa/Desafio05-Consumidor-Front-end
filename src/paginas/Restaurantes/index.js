import "./style.css";
import ilustracao from "../../assets/illustration-2.svg";
import BackgroundImg from "../../assets/bg-pizzaria.png";
import logo from "../../assets/LogomarcaBranca.svg";
import avatar from "../../assets/avatar3.png";
import useAuth from "../../hooks/useAuth";
import { useHistory, useParams } from "react-router-dom";
import { get } from "../../servicos/requisicaoAPI";
import Card from "../../componentes/Card";
import { useState, useEffect } from "react";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";


export default function Produtos() {
  const { setToken, token } = useAuth();
  const [restaurantes, setRestaurantes] = useState([]);
  const [buscarRestaurante, setBuscarRestaurante] = useState("");
  const [resultadoRestaurante, setResultadoRestaurante] = useState([]);
  const [resultadoNaoEncontrado, setResultadoNaoEncontrado] = useState(false);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = e => {
    e.preventDefault()
    setBuscarRestaurante(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);


  async function listaDeRestaurantes() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get("restaurantes", token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      return setRestaurantes(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    listaDeRestaurantes();
  }, []);

  useEffect(() => {
    const resultados = restaurantes.filter(restaurante => restaurante.nome.toLowerCase().includes(buscarRestaurante.toLowerCase()));
    
    if(resultados.length > 0) {
      setResultadoNaoEncontrado(false);
    } else if (resultados.length === 0) {
      setResultadoNaoEncontrado(true);
    }
    setResultadoRestaurante(resultados);
  }, [buscarRestaurante])

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-restaurantes">
      <img className="avatar" src={avatar} alt="imagem do usuário" />
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
        <h1>Restaurantes</h1>
        <img className="logomarca" src={logo} alt="logomarca" />
        <button onClick={logout}>Logout</button>
      </div>
      <input className="input-busca"
        type="text"
        placeholder="Buscar"
        value={buscarRestaurante}
        onChange={handleChange}
      />
      <div className="conteudo-pagina">
        {restaurantes.length === 0 && (
          <p>
            Ainda não existe restaurante cadastrado.
            <br />
            Tente novamente mais tarde!
          </p>
        )}
          {buscarRestaurante === "" ? (
            <div className="container-cards">
              {restaurantes.map((restaurante) => (
                <Card
                  key={restaurante.id}
                  id={restaurante.id}
                  preco={restaurante.preco}
                  nome={restaurante.nome}
                  descricao={restaurante.descricao}
                  imagem={restaurante.imagem}
                  />
                  ))}
            </div>
            ) : (
            <div className="container-cards">
              {resultadoRestaurante.map((restaurante) => (
                <Card
                  key={restaurante.id}
                  preco={restaurante.preco}
                  nome={restaurante.nome}
                  descricao={restaurante.descricao}
                  imagem={restaurante.imagem}
                />
              ))}
              {resultadoNaoEncontrado === true ? (
                  <p>Nenhum restaurante encontrado!</p>
              ) : ""}
            </div>
            )}
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}