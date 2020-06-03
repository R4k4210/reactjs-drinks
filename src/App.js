import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';

//Una vez importado el context, wrapeamos los demas componentes, con este. De esta forma todos los componentes
//hijos, pueden acceder a lo que este en CategoriasProvider.
function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>

          <Header/>
          <div className='container mt-5'>
            <div className='row'>
              <Formulario/>
            </div>
            <ListaRecetas/>
          </div>
          
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
