import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./styles/global.css";
import { AuthContextProvider } from "./contexto/AuthContext";
import useAuth from "./hooks/useAuth";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Restaurantes from "./paginas/Restaurantes";
import Cardapio from "./paginas/Cardápio";
import ListaDePedidos from "./paginas/ListaPedidos";

function RotasProtegidas(props) {
  const { token } = useAuth();
  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Cadastro} />
          <RotasProtegidas>
            <Route path="/restaurantes" exact component={Restaurantes}  />
            <Route path="/restaurantes/:id" exact component={Cardapio} />
            <Route path="/pedidos" component={ListaDePedidos} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
