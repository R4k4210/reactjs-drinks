import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Creamos el context, ahora las cosas fluyen por aca, siempre que creamos un context
//tenemos que crear un Provider, es de donde salen los datos y las funciones.
export const CategoriasContext = createContext();

//Creamos el Provider, donde estan las funciones y el State
const CategoriasProvider = (props) => {
    const [categorias, guardarCategorias] = useState([]);

    //Llamamos a la API, esto podria hacerse en un archivo aparte
    useEffect(() => {
        const obtenerCategorias = async () => {
            const categoriasURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categoriasList = await axios.get(categoriasURL);
            guardarCategorias(categoriasList.data.drinks);
        }
        obtenerCategorias();
    }, []);//Hacemos que ejecute una sola vez

    return (
        //Aca se debe retornar nuestra referencia al Context punto Provider, como si fuera un componente
        //Luego si queremos exponer los hooks, los pasamos como value de la referencia al context.
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

//Tenemos que poner un export default para poder importarlo en el componente padre o donde sea
export default CategoriasProvider;