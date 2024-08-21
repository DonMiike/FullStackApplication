import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function OrderHome() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const result = await axios.get("http://localhost:8080/ordenes");
        setOrders(result.data);
    };

    const deleteOrder = async (id) => {
        await axios.delete(`http://localhost:8080/orden/${id}`);
        loadOrders();
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <Link className="btn btn-primary mb-2" to="/addOrden">Agregar Orden</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{order.codigo}</td>
                                <td>{order.fecha}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewOrden/${order.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editOrden/${order.id}`}>Editar</Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteOrder(order.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
