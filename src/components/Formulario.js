import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    //Aca usamos el hook useContext. debemos importar el context que tenemos en CategoriasContext.
    //Se lo pasamos a el useContext y con eso tenemos disponible lo que este en CategoriasContext.js
    const {categorias} = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    const [error, guardarError] = useState(false);

    //Obtenemos los datos y los guardamos en el context
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }


    const {nombre, categoria} = busqueda;

    const buscarRecetasDeTragos = e => {
        e.preventDefault();
        
        if(nombre.trim() === '' || categoria.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarConsultar(true);
        //Aca enviamos los datos al Context
        buscarRecetas(busqueda);
    }

    return ( 
        <form
            className='col-12'
            onSubmit={buscarRecetasDeTragos}
        >
            <fieldset className='text-center'>
                <legend>Buscar bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className='row mt-4'>
                <div className='col-md-4'>
                    <input 
                        type="text"
                        name='nombre'
                        className='form-control'
                        placeholder='Buscar por Ingrediente'
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className='col-md-4'>
                    <select 
                        name="categoria"
                        className='form-control'
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory} 
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className='col-md-4'>
                    <input 
                        type="submit"
                        className='btn btn-block btn-primary'
                        value='Buscar Bebida'
                    />
                </div>
                <div className='col-md-12'>
                    {error ? <p className="alert alert-danger text-center p-3 mt-3">Todos los campos son obligatorios</p> : null}
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;