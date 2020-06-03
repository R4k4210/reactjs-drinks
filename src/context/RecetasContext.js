import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    const [recetas, guardarRecetas] = useState([]);

    const [consultar, guardarConsultar] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {

        if(consultar){
            const callAPI = async () => {     
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const listaRecetas = await axios.get(url);
                guardarRecetas(listaRecetas.data.drinks);
            }
            callAPI();
        }

    }, [busqueda]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;