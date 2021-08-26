import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerImagem: {
    width: 384,
    maxHeight: 384,
    marginBottom: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background:
      "linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%)",
    border: "2px solid rgba(251, 59, 0, 0.2)",
    borderRadius: 16,
  },
  imagemProduto: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
  },
  imagemAtualizada: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
    zIndex: 4,
    position: "absolute",
  },
  labelImagem: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 14,
    position: "absolute",
  },
  inputImagem: {
    position: "absolute",
    top: 0,
    lefth: 0,
    rigth: 0,
    bottom: 0,
    opacity: 0,
    cursor: "pointer",
  },
  upload: {
    color: "white",
    fontSize: 30,
    marginTop: "250px",
  },
}));

export default useStyles;
