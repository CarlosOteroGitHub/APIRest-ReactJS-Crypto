import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

//Declaración de los documentos del componente Empleado.
import Inicio from './componentes/Inicio.js';
import Listar from './componentes/Listar.js';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>React</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-item nav-link active" to={"/"}>Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-item nav-link active" to={"/criptomonedas"}>Criptomonedas</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Ruta de direccionamiento al documento "Inicio" del componente */}
        <Route exact path="/" component={Inicio} />

        {/* Ruta de direccionamiento al documento "Listar" del componente */}
        <Route path="/criptomonedas" component={Listar} />
      </div>
    </Router>
  );
}

export default App;