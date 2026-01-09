import React, { Component } from 'react';
import axios from 'axios';

export default class CreateLectura extends Component {

    state = {
        luz: 0,
        movimiento: 0,
        foco: false
    }

    // Capturar lo que escribes en los inputs
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Enviar al Backend cuando das click
    onSubmit = async (e) => {
        e.preventDefault();
        const nuevaLectura = {
            luz: this.state.luz,
            movimiento: this.state.movimiento,
            foco: this.state.foco
        };
        // Enviamos a tu backend local
        await axios.post('http://localhost:8080/lecturas', nuevaLectura);
        window.location.href = '/'; // Regresar al inicio
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Simular Dato de Sensor</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Input Luz */}
                        <div className="mb-3">
                            <label>Nivel de Luz (0-4095)</label>
                            <input type="number" className="form-control" name="luz" onChange={this.onInputChange} required/>
                        </div>
                        {/* Input Movimiento */}
                        <div className="mb-3">
                            <label>Movimiento (1 o 0)</label>
                            <input type="number" className="form-control" name="movimiento" onChange={this.onInputChange} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        )
    }
}