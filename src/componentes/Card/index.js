import "./style.css";
import logo from "../../assets/LogoRestaurante.png";
import { useHistory } from 'react-router-dom';

export default function Card({
    id,
    nome,
    descricao,
    imagem,
}) {
  const history = useHistory();

  return (
    <div className="container-card" onClick={() => history.push(`restaurantes/${id}`)}>
      <div className="conteudo-card">
        <div className="informacao-card">
          <h3>{nome}</h3>
          <p>{descricao}</p>
          <span>
            "$$$"
          </span>
        </div>
        <img src={imagem ? imagem : logo} />
      </div>
    </div>
  );
}
