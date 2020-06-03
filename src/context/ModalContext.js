import React, { createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [detallereceta, guardarDetalleReceta] = useState({});

    useEffect(() => {
        if(!idreceta) return;
        
        const callAPI = async () => {            
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const detalleReceta = await axios.get(url);
            guardarDetalleReceta(detalleReceta.data.drinks[0]);
        }
        callAPI();
    }, [idreceta]);

    return (
        <ModalContext.Provider
            value={{
                detallereceta,
                guardarIdReceta,
                guardarDetalleReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;
