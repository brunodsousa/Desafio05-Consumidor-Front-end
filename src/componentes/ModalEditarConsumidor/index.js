import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import InputImagem from "../InputImagem";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/avatar3.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { putConsumidor } from "../../servicos/requisicaoAPI";

export default function ModalEditarUsuario({ consumidor, endereco, dadosConsumidor, setMensagemSucesso }) {
  const classes = useStyles();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecoConsumidor, setEnderecoConsumidor] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [imagem, setImagem] = useState("");
  const [base64Imagem, setBase64Imagem] = useState("");

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
    setNome(consumidor.nome);
    setEmail(consumidor.email);
    setTelefone(consumidor.telefone);
    setImagem(consumidor.imagem);
    setCep(endereco.cep);
    setEnderecoConsumidor(endereco.endereco);
    setComplemento(endereco.complemento);
    setBase64Imagem("");
    setSenha("");
    setConfirmarSenha("");
    setMostrarSenha(false);
    setMostrarConfirmarSenha(false);
  }

  function fecharModal() {
    setOpen(false);
    setNome(consumidor.nome);
    setEmail(consumidor.email);
    setTelefone(consumidor.telefone);
    setImagem(consumidor.imagem);
    setCep(endereco.cep);
    setEnderecoConsumidor(endereco.endereco);
    setComplemento(endereco.complemento);
    setBase64Imagem("");
    setSenha("");
    setConfirmarSenha("");
    setMostrarSenha(false);
    setMostrarConfirmarSenha(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    if (senha) {
      if (senha !== confirmarSenha) {
        setCarregando(false);
        setErro("Senha e Repita a senha devem ser iguais!");
        return;
      }
    }

    const dadosCadastro = {
      nome,
      email,
      telefone,
      senha,
      endereco: enderecoConsumidor,
      cep,
      complemento,
      imagem: base64Imagem,
    };

    try {
      const { dados, erro } = await putConsumidor(
        'consumidor',
        dadosCadastro,
        token
      );

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      await dadosConsumidor();

      setMensagemSucesso("Consumidor atualizado com sucesso.");
      setOpen(false);
      setSenha("");
      setConfirmarSenha("");
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.container}>
      <img
        className={classes.logo}
        src={consumidor.imagem ? consumidor.imagem : avatar}
        alt="logo usuário"
        onClick={abrirModal}
      />
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Typography variant="h1" className={classes.tituloUsuario}>
            Editar perfil
          </Typography>
          <DialogContent className={classes.conteudoFormUsuario}>
            <div className={classes.listaInputs}>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="nome">
                  Nome de usuário
                </label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="nome"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="email">
                  E-mail
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="email"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="telefone">
                  Telefone
                </label>
                <input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className={classes.input}
                  type="number"
                  id="telefone"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="cep">
                  Cep
                </label>
                <input
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className={classes.input}
                  type="number"
                  id="cep"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="endereco">
                  Endereço
                </label>
                <input
                  value={enderecoConsumidor}
                  onChange={(e) => setEnderecoConsumidor(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="endereco"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="complemento">
                  Complemento
                </label>
                <input
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="complemento"
                />
              </div>
              <div className={classes.divInput}>
                <label htmlFor="senha" className={classes.label}>Senha</label>
                <input
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  className={classes.input}
                />
                <div
                  className={classes.icone}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
              <div className={classes.divInput}>
                <label htmlFor="senhaConfirmada" className={classes.label}>Confirmar senha</label>
                <input
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  id="senhaConfirmada"
                  className={classes.input}
                />
                <div
                  className={classes.icone}
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                >
                  {mostrarConfirmarSenha ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </div>
            <div className={classes.imagemPerfil}>
              <InputImagem
                imagem={imagem}
                setBase64Imagem={setBase64Imagem}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.botoes}>
            <button
              className={classes.botaoCancelar}
              type="button"
              onClick={fecharModal}
            >
              Cancelar
            </button>
            <button type="submit" className="button bt-md">
              Salvar alterações
            </button>
          </DialogActions>
          <AlertaDeErro erro={erro} />
          <Carregando open={carregando} />
        </form>
      </Dialog>
    </div>
  );
}
