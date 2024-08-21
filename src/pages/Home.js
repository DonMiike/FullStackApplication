import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [clientes, setClientes] = useState([]);
    const [ordenes, setOrdenes] = useState([]);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        loadClientes();

    }, []);

    const loadClientes = async () => {
        const result = await axios.get("http://localhost:8080/clientes");
        setClientes(result.data);
    };



    const deleteCliente = async (id) => {
        await axios.delete(`http://localhost:8080/cliente/${id}`);
        loadClientes();
    };



    return (
        <div className='container'>
            <div className='py-4'>
                <h2>Clientes</h2>
                <Link className="btn btn-primary mb-2" to="/addUser">Agregar Cliente</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={cliente.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{cliente.name}</td>
                                <td>{cliente.lastname}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewUser/${cliente.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editUser/${cliente.id}`}>Editar</Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteCliente(cliente.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>
    );
}
