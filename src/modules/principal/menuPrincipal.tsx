import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Authorized from "../../helpers/authorized.tsx";
import ContextAuthetication from "../../helpers/contextAuthetication.tsx";

export default function MenuPrincipal() {
  let navigate = useNavigate();
  const {update} = useContext(ContextAuthetication);
  
  const logout = () => {
    localStorage.removeItem('token');
    update([]);
    navigate('/login');
  }

      return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand-lg">
          <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle Navigation">
            <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
            </span>
          </button>
          <button className="btn btn-link navbar-brand me-1 me-sm-3" >
            <div className="d-flex align-items-center">
              <img className="me-2" src="/assets/img/icons/spot-illustrations/falcon.png" alt="" width="40" />
              <span className="font-sans-serif text-primary">SuperMarket</span>
            </div>
          </button>
          <div className="collapse navbar-collapse scrollbar" id="navbarStandard">
            <ul className="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
              <li className="nav-item"><NavLink className={navData => (navData.isActive ? "nav-link fs-7 active" : "nav-link fs-7")}  to="/">Dashboard</NavLink></li>
              <Authorized
                autorized={<>
                  <li className="nav-item"><NavLink className={navData => (navData.isActive ? "nav-link fs-7 active" : "nav-link fs-7")} to="/products">Productos</NavLink></li>
                  <li className="nav-item"><NavLink className={navData => (navData.isActive ? "nav-link fs-7 active" : "nav-link fs-7")} to="/users">Usuarios</NavLink></li>                
                </>}
              />              
            </ul>
          </div>
          <Authorized 
            autorized={<>
              <ul className="navbar-nav navbar-nav-icons flex-row align-items-center" style={{ marginLeft: 'auto' }}>
                <li className="nav-item pe-3">
                  <span className="d-inline-block fs-7" style={{ color: 'grey' }}>Bienvenido!</span>
                </li>
                <li className="nav-item dropdown">
                  <button className="btn btn-link nav-link pe-0 ps-1" id="navbarDropdownUser" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-xl">
                      <img className="rounded-circle" src="/assets/img/team/avatar.png" alt="" />
                    </div>
                  </button>
                  <div className="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                    <div className="bg-white dark__bg-1000 rounded-2 py-2">
                      <button className="btn btn-link dropdown-item fs-9" onClick={() => logout()} >Logout</button>
                    </div>
                  </div>
                </li>
              </ul>
            </>}
            unauthorized={<>
              <ul className="navbar-nav navbar-nav-icons flex-row align-items-center" style={{ marginLeft: 'auto' }}>
                <li className="nav-item"><NavLink className="nav-link fs-7" to="/login">Iniciar Sesión</NavLink></li> 
              </ul>
            </>}
          />
          
        </nav>
      )
}