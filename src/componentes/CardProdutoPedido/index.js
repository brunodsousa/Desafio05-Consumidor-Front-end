import "./style.css";

export default function CardProdutoCarrinho({
  nome,
  quantidade,
  preco,
  imagem
}) {

  return (
    <div className="container-cardPedido">
      <div className="conteudo-cardPedido">
        {imagem && <img src={imagem} alt="imagem do produto" />}
        <div className="informacao-cardPedido">
          <h3>{nome}</h3>
            <p>
              {quantidade} {quantidade === 1 ? "unidade" : "unidades"}
            </p>
          <span>
            {Number((preco * quantidade) / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}