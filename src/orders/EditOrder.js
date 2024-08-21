import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditOrder() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [order, setOrder] = useState({
        codigo: "",
        fecha: "",
    });

    const { codigo, fecha } = order;

    const onInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadOrder();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/orden/${id}`, order);
        navigate("/orderHome");
    };

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:8080/orden/${id}`);
        setOrder(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Editar Orden</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='Code' className='form-label'>
                                Código
                            </label>
                            <input type="text" className='form-control' placeholder='Ingresa el Código' name='codigo' value={codigo} onChange={onInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Date' className='form-label'>
                                Fecha
                            </label>
                            <input type="date" className='form-control' name='fecha' value={fecha} onChange={onInputChange} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Actualizar</button>
                        <Link className='btn btn-outline-danger mx-2' to="/orders">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
