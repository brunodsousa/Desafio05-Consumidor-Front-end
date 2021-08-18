<<<<<<< HEAD

=======
import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./style.css";

export default function ModalProduto({
  nome,
  descricao,
  preco,
  imagem,
}) {
  const [open, setOpen] = useState(false);
  const { carrinho, setCarrinho, restaurante, setRestaurante } = useAuth();
  const [quantidade, setQuantidade] = useState(1);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function adicionarAoCarrinho () {
    const carrinhoAtualizado = carrinho;

    const produtoNoCarrinho = carrinhoAtualizado.find(produto => produto.nome === nome)
    if(produtoNoCarrinho) {
      produtoNoCarrinho.quantidade += quantidade;
      setCarrinho(carrinhoAtualizado);
      return 
    }

    setCarrinho([...carrinho, { nome, quantidade, imagem, preco }]);
  }

  return (
    <div className="container-modalProduto">
      <div onClick={handleClickOpen} className="modal-produto"></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="conteudo-modalProduto">
          <h3>{nome}</h3>
          <div className="botoes-quantidade">
            <button className="subtracao" onClick={() => quantidade > 1 ? setQuantidade(quantidade => quantidade - 1) : handleClose()}>-</button>
            <div>{quantidade}</div>
            <button className="soma" onClick={() => setQuantidade(quantidade => quantidade + 1)}>+</button>
          </div>
          <button className="button" onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
        </div>
      </Dialog>
    </div>
  );
}
>>>>>>> 459f96e47806347b6d388770bbdd717f552294bb
