import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddArticle() {
    let navigate = useNavigate();

    const [article, setArticle] = useState({
        codigo: "",
        nombre: "",
        precio: ""
    });

    const { codigo, nombre, precio } = article;

    const onInputChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/articulo", article);
        navigate("/articleHome");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Agregar Artículo</h2>
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
                        <button type='submit' className='btn btn-outline-primary'>Ingresar</button>
                        <Link className='btn btn-outline-danger mx-2' to="/articleHome">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
