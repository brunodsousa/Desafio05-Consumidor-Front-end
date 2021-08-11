import "./style.css";
import ilustracaoLaranja from "../../assets/fundo-laranja-cadastro.svg";
import linhaLaranja from "../../assets/linha-laranja-cadastro.svg";
import logo from "../../assets/logo-cadastro.svg";
import imagem from "../../assets/imagem-cadastro.svg";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import { useState, useEffect } from "react";
import { post } from "../../servicos/requisicaoAPI";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import useAuth from "../../hooks/useAuth";

export default function Cadastro() {
  const { register, handleSubmit } = useForm();
  const { token } = useAuth();
  const [visivel, setVisivel] = useState(false);
  const [visivelRepetido, setVisivelRepetido] = useState(false);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (token) {
      history.push("/restaurantes");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  async function onSubmit(data) {
    setErro("");
    
    if(data.senha !== data.senhaRepetida) {
      return setErro("As senhas devem ser iguais.")
    }
    setCarregando(true);
    
    const dadosCadastro = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha: data.senha
    }
    try {
      const { dados, erro } = await post("consumidor", dadosCadastro);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      history.push("/");

    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className="container-cadastro">
      <div className="background-cadastro">
        <img src={logo} alt="logo" />
        <img
          className="ilustracao-laranja"
          src={ilustracaoLaranja}
          alt="fundo laranja"
        />
        <img
          className="ilustracao-laranja"
          src={linhaLaranja}
          alt="linha laranja"
        />
        <img className="imagem" src={imagem} alt="imagem de fundo" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-cadastro">
        <h1>Cadastro</h1>
        <div className="div-input">
          <label htmlFor="nome">Nome de usuário</label>
          <input {...register("nome")} type="text" id="nome" />
        </div>
        <div className="div-input">
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" id="email" />
        </div>
        <div className="div-input">
          <label htmlFor="telefone">Telefone</label>
          <input {...register("telefone")} placeholder="(ddd)número   Ex: 71912345678" type="number" id="telefone" />
        </div>
        <InputSenha
          {...register("senha")}
          visivel={visivel}
          setVisivel={setVisivel}
          nome="senha"
          label="Senha"
        />
        <InputSenha
          {...register("senhaRepetida")}
          visivel={visivelRepetido}
          setVisivel={setVisivelRepetido}
          nome="senhaRepetida"
          label="Repita a senha"
        />
        <button type="submit">
          Criar conta
        </button>
        <p>
          Já tem uma conta? <Link to="/">Login</Link>
        </p>
      </form>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
