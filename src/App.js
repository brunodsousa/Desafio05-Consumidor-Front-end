import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./styles/global.css";

function App() {
  return (
        <Router>
          <Switch>
            <Route path="/" exact />
          </Switch>
        </Router>
  );
}

export default App;
