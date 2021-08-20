import Dialog from "@material-ui/core/Dialog";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import close from "../../assets/close-red.svg";
import carrinho from "../../assets/carrinho.svg";
import useAuth from "../../hooks/useAuth";

export default function ModalEndereco({ setMensagemSucesso, getDadosConsumidor }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (cep.length < 9 && endereco.length > 0) {
      setEndereco("");
    }
    if (cep.indexOf("-") !== -1) {
      if (cep.length === 9) {
        getCep(cep);
      }
      return;
    }

    if (cep.length === 8) {
      getCep(cep);
    }
  }, [cep]);

  async function getCep(myCep) {
    setErro("");
    setCarregando(true);

    try{
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const {logradouro, erro} = await resposta.json();

      setCarregando(false);

      if (erro) {
        return setErro("Cep inválido.");
      }

      setEndereco(logradouro);

    }catch(error) {
      setCarregando(false);
      setErro("Cep inválido.");
    }
  }

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

  async function onSubmit(e) {
    e.preventDefault();
    let cepFormatado;

    if(cep.includes("-")) {
      cepFormatado = cep.replace("-", "");
    } else {
      cepFormatado = cep;
    }

    const data = {
      cep: cepFormatado,
      endereco,
      complemento
    };

    setErro("");
    setCarregando(true);
    try{
      const resposta = await fetch("http://localhost:8000/endereco", {
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

      await getDadosConsumidor();
      setMensagemSucesso("Endereço cadastrado com sucesso.");
      fecharModal();

    }catch(error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.container}>
      <button
        className={classes.adicionarEndereco}
        type="button"
        onClick={abrirModal}
      >
        Adicionar Endereço
      </button>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form onSubmit={(e) => onSubmit(e)} className={classes.formEndereco}>
          <img
            className={classes.close}
            src={close}
            alt="close"
            onClick={fecharModal}
          />
          <div className={classes.tituloCarrinho}>
            <img src={carrinho} alt="carrinho" />
            <h2 className={classes.nomeRestaurante}>Adicionar Endereço</h2>
          </div>
          <div className={classes.listaForm}>
            <div className="div-input">
              <label htmlFor="cep">Cep</label>
              <input value={cep} onChange={(e) => setCep(e.target.value)} type="text" id="cep" />
            </div>
            <div className="div-input">
              <label htmlFor="endereco">Endereço</label>
              <input value={endereco} onChange={(e) => setEndereco(e.target.value)} type="text" id="endereco" />
            </div>
            <div className="div-input">
              <label htmlFor="complemento">Complemento</label>
              <input value={complemento} onChange={(e) => setComplemento(e.target.value)} type="text" id="complemento" />
            </div>
          </div>
          <button type="submit" className="button bt-lg">
           Adicionar Endereço
          </button>
        </form>
        <AlertaDeErro erro={erro} />
        <Carregando open={carregando} />
      </Dialog>
    </div>
  );
}
