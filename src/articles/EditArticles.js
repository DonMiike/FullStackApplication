import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditArticle() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [article, setArticle] = useState({
        codigo: "",
        nombre: "",
        precio: ""
    });

    const { codigo, nombre, precio } = article;

    const onInputChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadArticle();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/articulo/${id}`, article);
        navigate("/articleHome");
    };

    const loadArticle = async () => {
        const result = await axios.get(`http://localhost:8080/articulo/${id}`);
        setArticle(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Editar Artículo</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='Code' className='form-label'>
                                Código
                            </label>
                            <input type="text" className='form-control' placeholder='Ingresa el Código' name='codigo' value={codigo} onChange={onInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Nombre
                            </label>
                            <input type="text" className='form-control' placeholder='Ingresa el Nombre' name='nombre' value={nombre} onChange={onInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Price' className='form-label'>
                                Precio
                            </label>
                            <input type="number" className='form-control' placeholder='Ingresa el Precio' name='precio' value={precio} onChange={onInputChange} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Actualizar</button>
                        <Link className='btn btn-outline-danger mx-2' to="/articleHome">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
