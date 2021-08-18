import "./style.css";
import logo from "../../assets/LogoRestaurante.png";
import { useHistory } from 'react-router-dom';
import ModalInserirProduto from '../ModalProduto';

export default function Card({
    id,
    nome,
    descricao,
    imagem,
    precoProduto
}) {
  const history = useHistory();

  return (
    <div className="container-card" onClick={() => history.push(`restaurantes/${id}`)}>
      <div className="conteudo-card">
        <div className="informacao-card">
          <h3>{nome}</h3>
          <p>{descricao}</p>
          <span>
            {precoProduto ? `R$ ${precoProduto / 100}` : "$$$"}
          </span>
        </div>
        <img src={imagem ? imagem : logo} />
      </div>
      <ModalInserirProduto
          id={id}
          nomeProduto={nome}
          descricaoProduto={descricao}
          precoProduto={preco}
          imagem={imagem}
        />
    </div>
  );
}
