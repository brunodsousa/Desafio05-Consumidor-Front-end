import "./style.css";
import { useEffect, useState } from "react";
import ModalAcompanharPedido from "../ModalAcompanharPedido";

export default function ListaPedidos({
  id,
  itensPedido,
  nome,
  total,
  imagemCategoria,
  imagemRestaurante,
  subtotalPedido,
  taxaDeEntrega,
  saiuParaEntrega,
  dadosPedido,
  setConfirmacao,
}) {
  const [verMais, setVerMais] = useState(false);

  return (
    <div className="conteudo-lista-pedidos">
      <div className="div-modal-pedido">
        <p className="bold">{id}</p>
        <div className="produtos-pedido">
          {itensPedido.length < 3
            ? itensPedido.map((produto) => (
                <p>
                  {produto.nomeProduto} - {produto.quantidade} uni
                </p>
              ))
            : itensPedido
                .filter((produto, indice) => {
                  if (verMais) {
                    return produto;
                  } else {
                    return indice < 2;
                  }
                })
                .map((produto) => (
                  <p>
                    {produto.nomeProduto} - {produto.quantidade} uni
                  </p>
                ))}
          {itensPedido.length > 2 && (
            <button onClick={() => setVerMais(!verMais)} className={"ver-mais"}>
              {verMais ? "ver menos" : "ver mais"}
            </button>
          )}
        </div>
        <p>
          {saiuParaEntrega ? "Pedido à caminho" : "Sendo preparado"}
        </p>
        <p>{nome}</p>
        <p className="bold">
          {Number(total / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <ModalAcompanharPedido
          id={id}
          itensPedido={itensPedido}
          nome={nome}
          total={total}
          saiuParaEntrega={saiuParaEntrega}
          taxaDeEntrega={taxaDeEntrega}
          subtotalPedido={subtotalPedido}
          imagemRestaurante={imagemRestaurante}
          imagemCategoria={imagemCategoria}
          dadosPedido={dadosPedido}
          setMensagemSucesso={setConfirmacao}
        />
      </div>
    </div>
  );
}
