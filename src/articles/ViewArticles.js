import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewArticle() {
    const [article, setArticle] = useState({
        codigo: "",
        nombre: "",
        precio: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadArticle();
    }, []);

    const loadArticle = async () => {
        const result = await axios.get(`http://localhost:8080/articulo/${id}`);
        setArticle(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles del Artículo</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles ID: {article.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Código: </b>{article.codigo}
                                </li>
                                <li className='list-group-item'>
                                    <b>Nombre: </b>{article.nombre}
                                </li>
                                <li className='list-group-item'>
                                    <b>Precio: </b>{article.precio} USD
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to="/articleHome">Regresar</Link>
                </div>
            </div>
        </div>
    );
}
