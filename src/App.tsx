import { BrowserRouter, Route, Routes } from 'react-router-dom';
import rutas from './helpers/route-config.tsx';
import MenuPrincipal from './modules/principal/menuPrincipal.tsx';
import Login from './modules/login/login.tsx';
import { useLocation } from 'react-router-dom';
import ContextAuthetication from './helpers/contextAuthetication.tsx';
import { claim } from './models/claim';
import React, { useState } from 'react';

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  function updateClaims (claims: claim[]) {
    setClaims(claims);
  }

  function isAutorized() {
    return claims.length > 0;
  }

  return (
    <ContextAuthetication.Provider value={{claims, update: updateClaims }}>
      <BrowserRouter>      
        <AppContent isAutorized={isAutorized()} />
      </BrowserRouter>
    </ContextAuthetication.Provider>    
  );
}

function AppContent(props: {isAutorized: boolean}) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  

  return (
    <>
      {!isLoginPage && <MenuPrincipal />} {/* Oculta el MenuPrincipal en la página de login */}
          <div className="content">
              <div className="row g-3 mb-3">
                  <div className="col-md-12 col-xxl-12">   
                    <Routes>
                    <Route path="/login" element={<Login />} />
                      {
                        rutas.map(ruta => {
                          return <Route key={ruta.path} path={ruta.path} element={ruta.authorized && !props.isAutorized ? <>
                            <div className='text-center'>
                              <h3 className='text-danger'>No estas autorizado para acceder a esta url</h3> 
                            </div>                            
                          </> : ruta.component} />
                        })
                      }
                    </Routes>
                  </div>
              </div>
          </div>  
    </> 
  );
}

export default App;
