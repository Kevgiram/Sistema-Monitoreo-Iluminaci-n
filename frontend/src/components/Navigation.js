import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        📡 Sistema IoT Monitor
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Sensores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/crear">Simular Dato</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}