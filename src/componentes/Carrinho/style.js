import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  revisao: {
    all: "unset",
    fontWeight: 600,
    fontSize: 13,
    textDecorationLine: "underline",
    color: "#525459",
    cursor: "pointer",
  },
  carrinho: {
    padding: " 50px 57px 60px 70px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  conteudoCarrinho: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  close: {
    alignSelf: "flex-end",
    cursor: "pointer",
  },
  tituloCarrinho: {
    display: "flex",
    gap: 14,
  },
  nomeRestaurante: {
    fontFamily: "'Baloo 2', cursive",  
    lineHeight: "150%",
    fontSize: 40,
    color: "rgba(18, 18, 18, 0.8)",
  },
  enderecoTitulo: {
    fontSize: 14,
    fontWeight: 700,
    color: "#d13201",
  },
  endereco: {
    fontSize: 14,
    color: "rgba(34, 34, 34, 0.87)",
    maxWidth: 486,
  },
  pedido: {
    display: "flex",
    width: 486,
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  },
  tempoEntrega: {
    alignSelf: "flex-start",
    fontWeight: 500,
    fontSize: 18,
    color: "#525459",
  },
  tempo: {
    fontWeight: "bold",
    fontSize: 20,
  },
  listaProdutos: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D5D5D5",
  },
  valores: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },
  totais: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    color: "#525459",
  },
  subtotal: {
    fontWeight: 600,
  },
  total: {
    fontWeight: 600,
    fontSize: 24,
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
  carrinhoVazio: {
    display: "flex",
    height: 400,
    width: 486,
    justifyContent: "center",
  },
}));

export default useStyles;
