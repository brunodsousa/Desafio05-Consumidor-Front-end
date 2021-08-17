import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  adicionarEndereco: {
    all: "unset",
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#AA320F",
    cursor: "pointer",
    padding: 10,
    width: "100%",
    background: "rgba(251, 59, 0, 0.2)",
    borderRadius: 5,
  },
  formEndereco: {
    padding: " 50px 57px 60px 70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    height: 820,
  },
  close: {
    alignSelf: "flex-end",
    cursor: "pointer",
  },
  tituloCarrinho: {
    display: "flex",
    gap: 14,
    width: 500,
  },
  nomeRestaurante: {
    fontFamily: "'Baloo 2', cursive",  
    lineHeight: "150%",
    fontSize: 40,
    color: "rgba(18, 18, 18, 0.8)",
  },
  listaForm: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    margin: "40px 0",
    
  }
}));

export default useStyles;
