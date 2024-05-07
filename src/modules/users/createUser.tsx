
// Importar las dependencias necesarias
import React, { useState } from "react";
import { urlUsers } from "../../utils/endpoints.tsx";
import { user } from "../../models/user";
import ShowAlert from "../../utils/showAlert.tsx";
import { useNavigate } from "react-router-dom";
import FrmUser from "./frmUser.tsx";
import axios from "axios";

// Definir el componente CreateUser
const CreateUser = () => {
  let navigate = useNavigate();
  const [errores, setErrores] = useState<string[]>([]);

  // Función para crear un usuario
  const create = async (user: user) => {
    try {
      // Realizar solicitud HTTP aquí
      const response = await axios.post(urlUsers, user);
      ShowAlert({title: 'Atención', text: 'Usuario creado correctamente', icon: 'success'} );
      navigate('/users');
    } catch (error) {
      // Manejar errores, si los hay
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <div className="card bg-100 shadow-none border">
        <div className="row gx-0 flex-between-center">
          <div className="col-sm-auto d-flex align-items-center">
            <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
            <div>
              <h4 className="text-primary fw-bold mb-0">CREAR USUARIO</h4>
            </div>
            <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
          </div>
        </div>
      </div>
      <div className="card overflow-hidden mt-3">
        <div className="card-body">
          <FrmUser modelo={
            {
              id: 0, 
              email: '',
              username: '',
              password: '',
              name: {
                firstname: '',
                lastname: ''
              },
              phone: '',
              address: {
                geolocation: {
                  lat: '',
                  long: ''
                },
                city: '',
                street: '',
                number: 0,
                zipcode: ''
              }
            }
          } onSubmit={async valores => { await create(valores); }} />
        </div>
      </div>        
    </>
  );
}

export default CreateUser;