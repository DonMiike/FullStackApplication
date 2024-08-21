import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {

    let navigate=useNavigate()

    const{id}=useParams();

    const[cliente,setCliente]=useState({
        name:"",
        lastname:"",
    })

    const{name,lastname}=cliente

    const onInputChange=(e)=>{
        setCliente({...cliente,[e.target.name]:e.target.value})

    };

    useEffect(()=>{
        loadUser()
    },[]);

    const onSubmit= async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/cliente/${id}`,cliente)
        navigate("/")

    }


    const loadUser = async()=> {
        const result=await axios.get(`http://localhost:8080/cliente/${id}`)
        setCliente(result.data)
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Editar Usuario</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>
                        Nombre
                    </label>
                    <input type={"text"} className='form-control'
                        placeholder='Ingresa el Nombre'
                        name='name' 
                        value={name}
                        onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='LastName' className='form-label'>
                        Apellido
                    </label>
                    <input type={"text"} className='form-control'
                        placeholder='Ingresa el Apellido'
                        name='lastname'
                        value={lastname}
                        onChange={(e)=>onInputChange(e)}/>
                </div>
                <button type='submit' className='btn btn-outline-primary'>Ingresar</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to={"/"}>Cancelar</Link>
                </form>

            </div>
        </div>
    </div>
}
