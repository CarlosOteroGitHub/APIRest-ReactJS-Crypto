import React from "react";

class Listar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            datosCargados:false,
            criptomonedas:[],
            search: ''
        }
	}

    //Función encargada de actualizar el evento del input cada vez que recibe una nueva entrada de datos.
    updateSearch(event){
        this.setState({search: event.target.value.substr(0, 20)});
    }

    //Función que consulta los registros de la API web de Coingecko.
    cargarDatos(){
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            this.setState({datosCargados:true, criptomonedas:datosRespuesta})
        })
        .catch(console.log)
    }

    //Función que se invoca inmediatamente, la cual ejecuta el método "cargarDatos"
    componentDidMount(){
        this.cargarDatos();
    }

    //Proceso que muestra código en formato JSX para la visualización gráfica de todos los registros del modelo Empleados en el navegador web.
    render(){
        const{datosCargados, criptomonedas} = this.state;

        if(!datosCargados){
            return(
                <div>Cargando...</div>
            );
        } else {
            return(
                <div className="card">
                    <div className="card-header">
                        <h4>Lista de Criptomonedas</h4>
                    </div>
                    <input type="text" placeholder="Buscar criptomoneda..." className="form-control mt-4 text-center" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Rango en Market Cap</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Market Cap</th>
                                    <th>Cambio Precio 24H</th>
                                    <th>Alto 24H</th>
                                    <th>Bajo 24H</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criptomonedas
                                .filter(
                                    (crypto) => {
                                        return crypto.name.toLowerCase().includes(this.state.search) | crypto.symbol.toLowerCase().includes(this.state.search);        
                                    }
                                )
                                .map(
                                    (crypto) => (
                                        <tr>
                                            <td>{crypto.market_cap_rank}</td>
                                            <td>
                                                <img src={crypto.image} alt={crypto.name} style={{width: '4%'}} className='img-fluid me-4'></img>
                                                <span>{crypto.name}</span>
                                                <span className="ms-3 text-muted text-uppercase">{crypto.symbol}</span>
                                            </td>
                                            <td>{crypto.current_price}</td>
                                            <td>{crypto.market_cap}</td>
                                            <td className={crypto.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                                                {crypto.price_change_percentage_24h}
                                            </td>
                                            <td>{crypto.high_24h}</td>
                                            <td>{crypto.low_24h}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default Listar;