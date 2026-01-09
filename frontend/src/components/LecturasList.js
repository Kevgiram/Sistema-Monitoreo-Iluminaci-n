import React, { Component } from 'react';
import axios from 'axios';

export default class LecturasList extends Component {

    state = {
        lecturas: []
    }

    // Esta función se ejecuta apenas carga la página
    async componentDidMount() {
        this.getLecturas();
    }

    getLecturas = async () => {
        // Pedimos los datos a TU backend
        const res = await axios.get('http://localhost:8080/lecturas');
        
        // Firebase devuelve un objeto raro, hay que convertirlo a lista (array)
        const datos = res.data; 
        if(datos) {
            const lista = [];
            // Convertir objeto de objetos a arreglo
            for (let id in datos) {
                lista.push({ id, ...datos[id] });
            }
            // Los invertimos para ver el más reciente primero
            this.setState({ lecturas: lista.reverse() });
        }
    }

    render() {
        return (
            <div className="row">
                <h3>Historial de Sensores (ESP32)</h3>
                {
                    this.state.lecturas.map(lectura => (
                        <div className="col-md-4 p-2" key={lectura.id}>
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h5>{new Date(lectura.timestamp).toLocaleTimeString()}</h5>
                                </div>
                                <div className="card-body">
                                    <p>☀️ Luz: <b>{lectura.luz}</b></p>
                                    <p>🏃 Movimiento: <b>{lectura.movimiento === 1 ? 'DETECTADO' : 'NADA'}</b></p>
                                    <p>💡 Foco: <b>{lectura.foco ? 'ENCENDIDO' : 'APAGADO'}</b></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}