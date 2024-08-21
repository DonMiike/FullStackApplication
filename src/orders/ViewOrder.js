import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewOrder() {
    const [order, setOrder] = useState({
        codigo: "",
        fecha: "",
        orderArticles: [],
    });

    const { id } = useParams();

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:8080/orden/${id}`);
        setOrder(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles de la Orden</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles ID: {order.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Código: </b>{order.codigo}
                                </li>
                                <li className='list-group-item'>
                                    <b>Fecha: </b>{order.fecha}
                                </li>
                                {order.orderArticles && (
                                    <li className='list-group-item'>
                                        <b>Artículos: </b>
                                        <ul>
                                            {order.orderArticles.map((article, index) => (
                                                <li key={index}>
                                                    {article.articulo.nombre} - {article.articulo.precio} USD
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to="/orderHome">Regresar</Link>
                </div>
            </div>
        </div>
    );
}
