import "./style.css";


export default function CardProdutoCarrinho({
  id,
  nome,
  quantidade,
  preco,
  imagem,
  carrinho, 
  setCarrinho
}) {


  function diminuirQuantidade() {
    const carrinhoAtualizado = [...carrinho];
    const produtoCarrinho = carrinhoAtualizado.find(produto => produto.id === id);

    produtoCarrinho.quantidade--;
    if (produtoCarrinho.quantidade === 0) {
      setCarrinho(
        carrinhoAtualizado.filter((produto) => produto.id !== id),
      );
      return;
  }
    setCarrinho(carrinhoAtualizado);
  }

  function aumentarQuantidade() {
    const carrinhoAtualizado = [...carrinho];
    const produtoCarrinho = carrinhoAtualizado.find(produto => produto.id === id);

    produtoCarrinho.quantidade++;

    setCarrinho(carrinhoAtualizado);
  }

  return (
    <div className="container-cardCarrinho">
      <div className="conteudo-cardCarrinho">
        {imagem && <img src={imagem} alt="imagem do produto" />}
        <div className="informacao-cardCarrinho">
          <h3>{nome}</h3>
          <div className="quantidadeProdutos">
            <button className="subtracaoProduto" onClick={diminuirQuantidade}>
              -
            </button>
            <p>
              {quantidade} {quantidade === 1 ? "unidade" : "unidades"}
            </p>
            <button className="somaProduto" onClick={aumentarQuantidade}>
              +
            </button>
          </div>
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
