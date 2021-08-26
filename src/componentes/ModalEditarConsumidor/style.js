import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "min-content",
  },
  form: {
    padding: "64px",
  },
  conteudoFormUsuario: {
    display: "flex",
    gap: 48,
    maxWidth: 872,
    Height: 780,
    padding: 0,
    marginBottom: 50,
  },
  tituloUsuario: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: "32px",
    lineHeight: "100%",
    color: "#D13201",
    fontWeight: 700,
    marginTop: -10,
    marginBottom: 20,
  },
  listaInputs: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  divInput: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    position: "relative",
  },
  label: {
    color: "#393C40",
    fontWeight: 600,
    fontSize: 16,
    marginLeft: 16,
  },
  input: {
    border: "1px solid #BEBEBE",
    borderRadius: "7px",
    height: "47px",
    fontSize: "18px",
    padding: "3px 0 3px 10px",
    width: 408,
  },
  icone: {
    position: "absolute",
    top: 40,
    right: 35,
    color: "#bebebe",
    cursor: "pointer",
  },
  selectCategoria: {
    border: "1px solid #BEBEBE",
    borderRadius: "7px",
    height: "47px",
    fontSize: "18px",
    padding: "3px 0 3px 10px",
    width: 408,
    marginBottom: -0,

  },
  inputNumber: {
    border: "1px solid #BEBEBE",
    borderRadius: "7px",
    height: "47px",
    fontSize: "18px",
    padding: "3px 0 3px 10px",
    maxWidth: 176,
  },
  span: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#6F7377",
    marginLeft: 24,
    marginTop: -47,
  },
  botoes: {
    display: "flex",
    gap: 16,
  },
  botaoCancelar: {
    all: "unset",
    color: "#D13201",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  logo: {
    width: "176px",
    height: "176px",
    borderRadius: "50%",
    position: "absolute",
    top: 157,
    left: 112,
    border: "1px solid #ffffff",
    zIndex: 3,
    cursor: "pointer",
    backgroundColor: "#ffffff",
  },
  iconSenha: {
    position: "absolute",
    left: 350,
    top: 40,
    color: "#bebebe",
    cursor: "pointer",
  },
  iconConfirmaSenha: {
    position: "absolute",
    left: 350,
    top: 40,
    color: "#bebebe",
    cursor: "pointer",
  },
  imagemPerfil: {
    display: "flex",
  }
}));

export default useStyles;