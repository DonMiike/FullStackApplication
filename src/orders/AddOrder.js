import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddOrder() {
    let navigate = useNavigate();

    const [order, setOrder] = useState({
        codigo: "",
        fecha: "",
        orderArticles: [],
        cliente: {},
    });
    const [clientes, setClientes] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        loadArticles();
        loadClientes();
    }, []);

    const loadArticles = async () => {
        try {
            const result = await axios.get("http://localhost:8080/articulos");
            setArticles(result.data);
        } catch (error) {
            console.error("Error loading articles", error);
        }
    };

    const loadClientes = async () => {
        const result = await axios.get("http://localhost:8080/clientes");
        setClientes(result.data);
    };


    const { codigo, fecha, orderArticles } = order;

    const onInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => {
            const selectedArticle = articles.find(article => article.codigo === option.value);
            return selectedArticle;
        });
        setOrder({ ...order, orderArticles: selectedOptions });
    };
    const onSelectClient = (e) => {
        console.log(e.target.value)
        const selectedClient = clientes.find(cliente => cliente.id == e.target.value);
        console.log(selectedClient)
        console.log(clientes)
        setOrder({ ...order, cliente: selectedClient });
    };
    const onSubmit = async (e) => {
        console.log(order)
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/orden", order);
            navigate("/orderHome");
        } catch (error) {
            console.error("Error submitting order", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Agregar Orden</h2>
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
                        <label>Seleccione Artículos</label>
                        <div className='mb-3'>
                            <select className='form-multi-select' multiple onChange={onSelectChange}>
                                {articles && articles.map((article) => (
                                    <option key={article.codigo} value={article.codigo}>
                                        {article.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select className='form-select' onChange={onSelectClient}>
                                {clientes && clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Ingresar</button>
                        <Link className='btn btn-outline-danger mx-2' to="/orderHome">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
