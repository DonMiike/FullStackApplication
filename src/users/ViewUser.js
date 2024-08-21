import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {

    const [cliente,setCliente]=useState({
        name:"",
        lastname:""
    })

    const {id}=useParams();

    useEffect(()=>{
        loadClientes()

    },[])

    const loadClientes=async()=>{
        const result=await axios.get(`http://localhost:8080/cliente/${id}`)
        setCliente(result.data)
    }

    return (
        <div className='container'>       
         <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Detalles Usuario</h2>
            <div className='card'>
                <div className='card-header'>
                    Dellates ID :{cliente.id}
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Nombre : </b>
                            {cliente.name}
                        </li>
                        <li className='list-group-item'>
                            <b>Apellido : </b>
                            {cliente.lastname}
                        </li>

                    </ul>
                </div>
            </div>

            <Link className='btn btn-primary my-2 'to={"/"}>Regresar</Link>
            </div>
        </div>
        </div>

    )
}
