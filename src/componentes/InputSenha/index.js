import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./style.css";
import React from "react";

const InputSenha = React.forwardRef((props, ref) => {
  return (
    <div className="div-input">
          <label htmlFor={props.nome}>{props.label}</label>
          <input
            {...props}
            ref={ref}
            type={props.visivel ? "text" : "password"}
            id={props.nome}
          />
          <div className="icone" onClick={() => props.setVisivel(!props.visivel)}>
            {props.visivel ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
  );
});
export default InputSenha;