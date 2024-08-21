import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ArticleHome() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        const result = await axios.get("http://localhost:8080/articulos");
        setArticles(result.data);
    };

    const deleteArticle = async (id) => {
        await axios.delete(`http://localhost:8080/articulo/${id}`);
        loadArticles();
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <Link className="btn btn-primary mb-2" to="/addArticulo">Agregar Orden</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{article.codigo}</td>
                                <td>{article.nombre}</td>
                                <td>{article.precio} USD</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewArticulo/${article.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editArticulo/${article.id}`}>Editar</Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteArticle(article.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
