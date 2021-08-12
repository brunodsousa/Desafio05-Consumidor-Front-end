import "./style.css";
import logo from "../../assets/LogoRestaurante.png";

export default function Card({
    nome,
    descricao,
    imagem
}) {

  return (
    <div className="container-card">
      <div className="conteudo-card">
        <div className="informacao-card">
          <h3>{nome}</h3>
          <p>{descricao}</p>
          <span>
            $$$
          </span>
        </div>
        <img src={imagem ? imagem : logo} />
      </div>
    </div>
  );
}
