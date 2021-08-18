import "./style.css";
import logo from "../../assets/LogoRestaurante.png";

export default function CardProdutoCarrinho({
    nome,
    quantidade,
    preco,
    imagem
}) {

  return (
    <div className="container-cardCarrinho">
      <div className="conteudo-cardCarrinho">
        <img src={imagem ? imagem : logo} alt="imagem do produto" />
        <div className="informacao-cardCarrinho">
          <h3>{nome}</h3>
          <p>{quantidade} unidades</p>
          <span>
            {Number((preco*quantidade) / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}